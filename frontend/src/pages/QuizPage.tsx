import React, { useState } from 'react';
import './Quiz.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [difficultyLevel, setDifficultyLevel] = useState<number>(3);
  const [quiz, setQuiz] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/parse-pdf', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error uploading the file');
        }

        const data = await response.json();
        setText(data.text);
        setError(null);
      } catch (error) {
        setError('Error uploading the file');
        console.error('Error uploading the file', error);
      }
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: text,
          difficultyLevel: difficultyLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Error generating quiz');
      }

      const data = await response.json();
      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(-1)); // Initialize answers array
      setSubmitted(false);
      setScore(0);
      setError(null);
    } catch (error) {
      setError('Error generating quiz');
      console.error('Error generating quiz', error);
    }
  };

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let newScore = 0;
    quiz.questions.forEach((question: any, index: number) => {
      if (answers[index] === parseInt(question.answer, 10)) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="App">
      <h1>PDF to Quiz Generator</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      {error && <p className="error">{error}</p>}
      {quiz && (
        <div>
          <h2>Generated Quiz</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz(); }}>
            {quiz.questions.map((question: any, index: number) => (
              <div key={index} className="question">
                <p>{question.question}</p>
                {question.options.map((option: string, optionIndex: number) => (
                  <div key={optionIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        checked={answers[index] === optionIndex}
                        onChange={() => handleAnswerChange(index, optionIndex)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit">Submit Quiz</button>
          </form>
          {submitted && (
            <div>
              <h3>Your Score: {score} / {quiz.questions.length}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
