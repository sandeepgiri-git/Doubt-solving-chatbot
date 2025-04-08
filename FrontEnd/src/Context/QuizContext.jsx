import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timerActive, setTimerActive] = useState(true);

  // Current question
  const currentQuestion = questions[currentQuestionIndex] || null;
  const totalQuestions = questions.length;

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
      const data = await response.json();

      if (data.response_code !== 0 || !data.results?.length) {
        throw new Error('Could not load questions. Please try again.');
      }

      const formattedQuestions = data.results.map((q, index) => {
        // Combine and shuffle options
        const options = [...q.incorrect_answers, q.correct_answer]
          .map(opt => decodeHTML(opt))
          .sort(() => Math.random() - 0.5);

        return {
          id: index,
          question: decodeHTML(q.question),
          options,
          correctAnswer: options.indexOf(decodeHTML(q.correct_answer)),
          category: decodeHTML(q.category),
          difficulty: q.difficulty
        };
      });

      setQuestions(formattedQuestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // HTML entity decoder
  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Initialize quiz
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!timerActive) return;
    
    const timer = timeLeft > 0 && setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      handleNextQuestion();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  // Quiz actions
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Check if answer was correct
    if (selectedOption === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question or end quiz
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimeLeft(15);
    } else {
      setQuizCompleted(true);
      setTimerActive(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(15);
    setTimerActive(true);
    fetchQuestions();
  };

  // Context value
  const value = {
    questions,
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    score,
    quizCompleted,
    timeLeft,
    loading,
    error,
    totalQuestions,
    handleOptionSelect,
    handleNextQuestion,
    resetQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};