"use client"
import Link from "next/link";
import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
{
  id: 1,
  question: 'Which programming language is primarily used for front-end web development?',
  options: ['Python', 'Java', 'JavaScript', 'Ruby'],
  correctAnswer: 'JavaScript',
  },
  
  {
  id: 2,
  question: 'What does CSS stand for in the context of web development?',
  options: ['Cascading Style Sheet', 'Computer Style Sheet', 'Creative Style Sheet', 'Colorful Style Sheet'],
  correctAnswer: 'Cascading Style Sheet',
  },
  
  {
  id: 3,
  question: 'Which of the following tags is used to define the structure of an HTML document?',
  options: ['<body>', '<head>', '<html>', '<title>'],
  correctAnswer: '<html>',
  },
  
  {
  id: 4,
  question: 'In web development, what is the purpose of AJAX?',
  options: ['Asynchronous JavaScript and XML', 'Automated JavaScript and XHTML', 'Advanced JavaScript and XML', 'Absolute JavaScript and XHTML'],
  correctAnswer: 'Asynchronous JavaScript and XML',
  },
  
  {
  id: 5,
  question: 'What is the role of a CSS framework like Bootstrap?',
  options: ['Database management', 'Front-end styling and layout', 'Server-side scripting', 'Version control'],
  correctAnswer: 'Front-end styling and layout',
  },
  
  {
  id: 6,
  question: 'Which of the following is a server-side scripting language?',
  options: ['JavaScript', 'HTML', 'CSS', 'PHP'],
  correctAnswer: 'PHP',
  },
  
  {
  id: 7,
  question: 'What does the acronym API stand for in web development?',
  options: ['Advanced Programming Interface', 'Application Programming Interface', 'Automated Protocol Interaction', 'Absolute Programming Integration'],
  correctAnswer: 'Application Programming Interface',
  },
  
  {
  id: 8,
  question: 'Which version control system is widely used in collaborative web development projects?',
  options: ['Subversion (SVN)', 'Git', 'Mercurial', 'CVS'],
  correctAnswer: 'Git',
  },
  
  {
  id: 9,
  question: 'What is the purpose of the HTML <meta> tag?',
  options: ['Define metadata about the document', 'Create hyperlinks', 'Embed external content', 'Specify image dimensions'],
  correctAnswer: 'Define metadata about the document',
  },
  
  {
  id: 10,
  question: 'Which of the following is not a valid HTTP status code?',
  options: ['200 OK', '404 Not Found', '500 Internal Server Error', '302 Page Moved'],
  correctAnswer: '302 Page Moved',
  }
];

const QuizPage: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [score, setScore] = useState<number | null>(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const handleOptionSelect = (questionIndex: number, selectedOption: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const newScore = answers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
    setShowCorrectAnswers(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <div className="font-semibold mb-2">{`Question ${index + 1}: ${q.question}`}</div>
            <div className="flex flex-col">
              {q.options.map((option) => (
                <label
                  key={option}
                  className={`mb-2 ${
                    showCorrectAnswers && option === q.correctAnswer
                      ? 'text-green-500 font-semibold'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleOptionSelect(index, option)}
                    disabled={showCorrectAnswers}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
          Submit
        </button>
        {showCorrectAnswers && (
          <div className="mt-4">
            <p>{`Your score: ${score} out of ${questions.length}`}</p>
          </div>
        )}
        <br />
        <br />
        <Link href="/"><button className="bg-blue-500 text-white py-2 px-4 rounded" style={{width: "82px"}} onClick={handleSubmit}>
          Back
        </button></Link>
      </div>
    </div>
  );
};

export default QuizPage;
