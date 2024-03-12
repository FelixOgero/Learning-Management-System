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
    question: 'Which financial statement provides a snapshot of a company financial position at a specific point in time?',
    options: ['Income Statement', 'Balance Sheet', 'Statement of Cash Flows', 'Statement of Retained Earnings'],
    correctAnswer: 'Balance Sheet',
    },
    
    {
    id: 2,
    question: 'What is the accounting term for the excess of revenues over expenses?',
    options: ['Profit', 'Revenue', 'Loss', 'Net Income'],
    correctAnswer: 'Net Income',
    },
    
    {
    id: 3,
    question: 'Which accounting principle states that expenses should be recorded in the same period as the revenues they help to generate?',
    options: ['Matching Principle', 'Revenue Recognition Principle', 'Conservatism Principle', 'Materiality Principle'],
    correctAnswer: 'Matching Principle',
    },
    
    {
    id: 4,
    question: 'In double-entry accounting, which accounts increase with a credit entry?',
    options: ['Assets', 'Liabilities', 'Equity', 'Expenses'],
    correctAnswer: 'Liabilities',
    },
    
    {
    id: 5,
    question: 'What is the term for the systematic allocation of the cost of an intangible asset over its useful life?',
    options: ['Depreciation', 'Amortization', 'Impairment', 'Depletion'],
    correctAnswer: 'Amortization',
    },
    
    {
    id: 6,
    question: 'Which of the following is a contra account?',
    options: ['Accumulated Depreciation', 'Accounts Receivable', 'Inventory', 'Prepaid Expenses'],
    correctAnswer: 'Accumulated Depreciation',
    },
    
    {
    id: 7,
    question: 'What does the term "EBITDA" stand for in accounting?',
    options: ['Earnings Before Interest, Taxes, Depreciation, and Amortization', 'Earnings Before Income and Tax Deductions Adjustment', 'Estimated Business Income Tax Deduction Amount', 'Expenditure Balance in Total Assets'],
    correctAnswer: 'Earnings Before Interest, Taxes, Depreciation, and Amortization',
    },
    
    {
    id: 8,
    question: 'Which inventory costing method assumes that the oldest inventory items are the first to be sold?',
    options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'Weighted Average', 'Specific Identification'],
    correctAnswer: 'FIFO (First-In, First-Out)',
    },
    
    {
    id: 9,
    question: 'What is the formula for calculating Return on Assets (ROA)?',
    options: ['Net Income / Average Total Assets', 'Net Sales / Average Total Assets', 'Net Income / Ending Total Assets', 'Net Sales / Ending Total Assets'],
    correctAnswer: 'Net Income / Average Total Assets',
    },
    
    {
    id: 10,
    question: 'Which financial ratio measures a company ability to cover its short-term obligations with its short-term assets?',
    options: ['Current Ratio', 'Quick Ratio', 'Debt-to-Equity Ratio', 'Return on Equity'],
    correctAnswer: 'Quick Ratio',
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
