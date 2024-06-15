import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { useAuth } from '@clerk/clerk-react';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields as needed
}

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [difficultyLevel, setDifficultyLevel] = useState<number>(3);
  const [quiz, setQuiz] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [youtubeRecommendations, setYoutubeRecommendations] = useState<any[]>([]);

  const { getToken } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken({ template: 'default' });
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch user data: ${errorText}`);
        }
      } catch (error) {
        setError(`Error fetching user data: ${(error as Error).message}`);
      }
    };

    fetchUserData();
  }, [getToken]);

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
    }
  };

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    let newScore = 0;
    quiz.questions.forEach((question: any, index: number) => {
      if (answers[index] === parseInt(question.answer, 10)) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);

    // Calculate points (assuming 1 point per correct answer)
    const points = newScore;

    // Send request to update rewards points
    // try {
    //   const response = await fetch('http://localhost:3001/rewards/update-rewards', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ points }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Error updating rewards');
    //   }
    // } catch (error) {
    //   setError('Error updating rewards');
    // }

    // Fetch YouTube recommendations
    handleFetchYouTubeRecommendations();
  };

  const handleFetchYouTubeRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5000/evaluate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: text,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching YouTube recommendations');
      }

      const data = await response.json();
      setYoutubeRecommendations(data.recommendations);
      setError(null);
    } catch (error) {
      setError('Error fetching YouTube recommendations');
    }
  };

  return (
    <div className="App">
      <h1>PDF to Quiz Generator</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      <button onClick={handleGenerateQuiz}>Generate Quiz</button>

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
              {youtubeRecommendations.length > 0 && (
                <div>
                  <h3>YouTube Recommendations</h3>
                  <ul>
                    {youtubeRecommendations.map((video, index) => (
                      <li key={index}>
                        <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
                          {video.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
