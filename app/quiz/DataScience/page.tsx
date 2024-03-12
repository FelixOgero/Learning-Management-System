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
    question: 'Which of the following is a supervised learning algorithm?',
    options: ['K-Means', 'Decision Tree', 'Principal Component Analysis', 'Apriori'],
    correctAnswer: 'Decision Tree',
    },
    
    {
    id: 2,
    question: 'What is the primary goal of exploratory data analysis (EDA)?',
    options: ['Predict future outcomes', 'Summarize and visualize data', 'Train machine learning models', 'Optimize algorithms'],
    correctAnswer: 'Summarize and visualize data',
    },
    
    {
    id: 3,
    question: 'In machine learning, what is the purpose of the training set?',
    options: ['To evaluate model performance', 'To test the model', 'To train the model', 'To validate the model'],
    correctAnswer: 'To train the model',
    },
    
    {
    id: 4,
    question: 'What is the term for the process of converting categorical data into numerical form for machine learning models?',
    options: ['Normalization', 'Standardization', 'Encoding', 'Imputation'],
    correctAnswer: 'Encoding',
    },
    
    {
    id: 5,
    question: 'Which algorithm is commonly used for anomaly detection in data science?',
    options: ['K-Means', 'Naive Bayes', 'Isolation Forest', 'Random Forest'],
    correctAnswer: 'Isolation Forest',
    },
    
    {
    id: 6,
    question: 'What is the purpose of cross-validation in machine learning?',
    options: ['Hyperparameter tuning', 'Model evaluation', 'Feature selection', 'Data preprocessing'],
    correctAnswer: 'Model evaluation',
    },
    
    {
    id: 7,
    question: 'Which statistical test is used to determine if there is a significant difference between the means of two groups?',
    options: ['ANOVA (Analysis of Variance)', 'Chi-Square Test', 'T-Test', 'Mann-Whitney U Test'],
    correctAnswer: 'T-Test',
    },
    
    {
    id: 8,
    question: 'What is the term for the phenomenon where a model performs well on the training data but poorly on new, unseen data?',
    options: ['Overfitting', 'Underfitting', 'Bias', 'Variance'],
    correctAnswer: 'Overfitting',
    },
    
    {
    id: 9,
    question: 'In natural language processing, what does NLP stand for?',
    options: ['Neural Language Processing', 'Natural Learning Process', 'Numeric Language Parsing', 'Natural Language Processing'],
    correctAnswer: 'Natural Language Processing',
    },
    
    {
    id: 10,
    question: 'Which data visualization tool is commonly used for creating interactive and web-based visualizations?',
    options: ['Matplotlib', 'Seaborn', 'Plotly', 'Bokeh'],
    correctAnswer: 'Plotly',
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
