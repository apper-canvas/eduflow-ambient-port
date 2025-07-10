import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ProgressBar from "@/components/atoms/ProgressBar";
import QuizOption from "@/components/molecules/QuizOption";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { coursesService } from "@/services/api/coursesService";
import { lessonsService } from "@/services/api/lessonsService";
import { enrollmentsService } from "@/services/api/enrollmentsService";

const QuizPage = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  // Mock current user
  const currentUser = {
    Id: 1,
    name: "John Doe",
    role: "student"
  };

  useEffect(() => {
    loadQuizData();
  }, [courseId, quizId]);

  useEffect(() => {
    if (quiz && quiz.timeLimit && !showResults) {
      setTimeLeft(quiz.timeLimit * 60); // Convert minutes to seconds
    }
  }, [quiz, showResults]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz();
    }
  }, [timeLeft, showResults]);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [courseData, quizData, enrollmentsData] = await Promise.all([
        coursesService.getById(parseInt(courseId)),
        lessonsService.getById(parseInt(quizId)),
        enrollmentsService.getByUserId(currentUser.Id)
      ]);

      setCourse(courseData);
      setQuiz(quizData);

      // Check if user is enrolled
      const userEnrollment = enrollmentsData.find(e => e.courseId === parseInt(courseId));
      setEnrollment(userEnrollment);

      if (!userEnrollment) {
        toast.error("You need to enroll in this course to take quizzes.");
        navigate(`/courses/${courseId}`);
        return;
      }
    } catch (err) {
      setError("Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (showResults) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / quiz.questions.length) * 100;
  };

  const handleSubmitQuiz = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);

    try {
      // Mark quiz as completed if passed
      const passed = finalScore >= (quiz.passingScore || 70);
      
      if (passed && !enrollment.completedLessons.includes(parseInt(quizId))) {
        const updatedCompletedLessons = [...enrollment.completedLessons, parseInt(quizId)];
        const updatedEnrollment = {
          ...enrollment,
          completedLessons: updatedCompletedLessons,
        };

        await enrollmentsService.update(enrollment.Id, updatedEnrollment);
        setEnrollment(updatedEnrollment);
      }

      toast.success(passed ? "Quiz passed!" : "Quiz completed. You can retake it to improve your score.");
    } catch (err) {
      toast.error("Failed to save quiz results.");
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    if (quiz.timeLimit) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="skeleton" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error
            title="Failed to load quiz"
            message={error}
            onRetry={loadQuizData}
          />
        </div>
      </div>
    );
  }

  if (!quiz || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error
            title="Quiz not found"
            message="The quiz you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate(`/courses/${courseId}`)}
              className="flex items-center gap-2"
            >
              <ApperIcon name="ArrowLeft" size={16} />
              Back to Course
            </Button>
            
            {timeLeft !== null && !showResults && (
              <div className="flex items-center gap-2 text-lg font-semibold">
                <ApperIcon name="Clock" size={20} className="text-warning" />
                <span className={cn(
                  timeLeft < 60 && "text-error",
                  timeLeft < 300 && timeLeft >= 60 && "text-warning"
                )}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>
          
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            {quiz.title}
          </h1>
          <p className="text-gray-600">
            {course.title} • {quiz.questions.length} questions
          </p>
        </div>

        {showResults ? (
          /* Results View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 text-center mb-8">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
                score >= (quiz.passingScore || 70) ? "bg-success/20" : "bg-error/20"
              )}>
                <ApperIcon 
                  name={score >= (quiz.passingScore || 70) ? "CheckCircle" : "XCircle"} 
                  size={40} 
                  className={score >= (quiz.passingScore || 70) ? "text-success" : "text-error"}
                />
              </div>
              
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">
                {score >= (quiz.passingScore || 70) ? "Congratulations!" : "Keep Learning"}
              </h2>
              
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {Math.round(score)}%
              </div>
              
              <p className="text-gray-600 mb-6">
                You scored {Math.round(score)}% on this quiz.
                {quiz.passingScore && (
                  <span className="block text-sm mt-1">
                    Passing score: {quiz.passingScore}%
                  </span>
                )}
              </p>
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleRetakeQuiz}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="RotateCcw" size={16} />
                  Retake Quiz
                </Button>
                
                <Button
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="ArrowRight" size={16} />
                  Continue Course
                </Button>
              </div>
            </Card>

            {/* Answer Review */}
            <Card className="p-8">
              <h3 className="font-display font-semibold text-xl text-gray-900 mb-6">
                Review Your Answers
              </h3>
              
              <div className="space-y-8">
                {quiz.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        selectedAnswers[questionIndex] === question.correctAnswer 
                          ? "bg-success text-white" 
                          : "bg-error text-white"
                      )}>
                        {questionIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-4">
                          {question.question}
                        </h4>
                        
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={cn(
                                "p-3 rounded-lg border-2 transition-colors",
                                optionIndex === question.correctAnswer && "border-success bg-green-50",
                                optionIndex === selectedAnswers[questionIndex] && 
                                optionIndex !== question.correctAnswer && "border-error bg-red-50",
                                optionIndex !== question.correctAnswer && 
                                optionIndex !== selectedAnswers[questionIndex] && "border-gray-200"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                {optionIndex === question.correctAnswer && (
                                  <ApperIcon name="Check" size={16} className="text-success" />
                                )}
                                {optionIndex === selectedAnswers[questionIndex] && 
                                 optionIndex !== question.correctAnswer && (
                                  <ApperIcon name="X" size={16} className="text-error" />
                                )}
                                <span>{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ) : (
          /* Quiz Taking View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress */}
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <ProgressBar value={progress} />
            </Card>

            {/* Question */}
            <Card className="p-8 mb-6">
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                {currentQuestionData.question}
              </h2>
              
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <QuizOption
                    key={index}
                    option={{ text: option }}
                    isSelected={selectedAnswers[currentQuestion] === index}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                  />
                ))}
              </div>
            </Card>

            {/* Navigation */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="ChevronLeft" size={16} />
                  Previous
                </Button>
                
                <div className="flex items-center gap-4">
                  {Object.keys(selectedAnswers).length === quiz.questions.length && (
                    <Button
                      onClick={handleSubmitQuiz}
                      variant="success"
                      className="flex items-center gap-2"
                    >
                      <ApperIcon name="Check" size={16} />
                      Submit Quiz
                    </Button>
                  )}
                  
                  {!isLastQuestion && (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!hasAnswered}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ApperIcon name="ChevronRight" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;