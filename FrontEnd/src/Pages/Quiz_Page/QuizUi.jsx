import { useQuiz } from '../../Context/QuizContext';

const QuizUI = () => {
  const {
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
  } = useQuiz();

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading Quiz Questions...</h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-yellow-500 text-5xl mb-4">❓</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Questions Available</h2>
          <p className="text-gray-600 mb-6">We couldn't find any questions for your quiz.</p>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Completed state
  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-green-500 text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
          <p className="text-lg text-gray-700 mb-1">
            Your score: <span className="font-bold">{score}/{totalQuestions}</span>
          </p>
          <p className="text-gray-600 mb-6">
            ({Math.round((score / totalQuestions) * 100)}% correct)
          </p>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  // Active quiz state
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Quiz header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className={`text-sm font-bold ${timeLeft < 6 ? 'text-red-500' : 'text-blue-500'}`}>
            ⏱ {timeLeft}s
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedOption === index
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-800'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            selectedOption === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizUI;