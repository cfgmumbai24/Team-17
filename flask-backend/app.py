from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import openai
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set the OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    text = ''
    reader = PyPDF2.PdfReader(pdf_file)
    num_pages = len(reader.pages)
    for page_num in range(num_pages):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text

# Route to handle PDF parsing
@app.route('/parse-pdf', methods=['POST'])
def parse_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    pdf_file = request.files['file']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if pdf_file and pdf_file.filename.endswith('.pdf'):
        try:
            extracted_text = extract_text_from_pdf(pdf_file)
            return jsonify({'text': extracted_text}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid file format. Please upload a PDF file'}), 400

# Route to handle quiz generation
@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()
    content = data.get('content')
    difficulty_level = data.get('difficultyLevel')
    print(data, content, difficulty_level)

    format = {
        "questions": [
            {
                "question": "requested question",
                "options": ["array of options"],
                "answer": "index of correct answer in options array"
            }
        ]
    }
    format_string = json.dumps(format)
    
    prompt = f"""Create a 10-question multiple-choice quiz based on the following text passage, if difficulty level of question is measured from 1-5 then target difficulty level of question is {difficulty_level}:\n\n{content}\n\nPlease provide the questions in JSON format with each question having the following fields: question, options, and answer. The options should be an array of four choices, and the answer should be the index of the correct answer within the options array.\n\nFormat of json object should be\n\n{format_string}"""

    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": prompt}],
        )
        print("responseeeeeeeeeeeeeeee: ", response.choices[0].message.content)
		
        quiz = response.choices[0].message.content
        print("quiz: ", quiz)
        quiz_json = json.loads(quiz)
        return jsonify(quiz_json), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)