import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/atoms/ProgressBar";
import VideoPlayer from "@/components/organisms/VideoPlayer";
import LessonItem from "@/components/molecules/LessonItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { coursesService } from "@/services/api/coursesService";
import { lessonsService } from "@/services/api/lessonsService";
import { enrollmentsService } from "@/services/api/enrollmentsService";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock current user
  const currentUser = {
    Id: 1,
    name: "John Doe",
    role: "student"
  };

  useEffect(() => {
    loadLessonData();
  }, [courseId, lessonId]);

  const loadLessonData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [courseData, lessonData, lessonsData, enrollmentsData] = await Promise.all([
        coursesService.getById(parseInt(courseId)),
        lessonsService.getById(parseInt(lessonId)),
        lessonsService.getByCourseId(parseInt(courseId)),
        enrollmentsService.getByUserId(currentUser.Id)
      ]);

      setCourse(courseData);
      setLesson(lessonData);
      setLessons(lessonsData);

      // Check if user is enrolled
      const userEnrollment = enrollmentsData.find(e => e.courseId === parseInt(courseId));
      setEnrollment(userEnrollment);

      // Check if user has access to this lesson
      if (!userEnrollment) {
        toast.error("You need to enroll in this course to access lessons.");
        navigate(`/courses/${courseId}`);
        return;
      }
    } catch (err) {
      setError("Failed to load lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = async () => {
    if (!enrollment || enrollment.completedLessons.includes(parseInt(lessonId))) {
      return;
    }

    try {
      const updatedCompletedLessons = [...enrollment.completedLessons, parseInt(lessonId)];
      const progress = (updatedCompletedLessons.length / lessons.length) * 100;

      const updatedEnrollment = {
        ...enrollment,
        completedLessons: updatedCompletedLessons,
        progress: progress
      };

      await enrollmentsService.update(enrollment.Id, updatedEnrollment);
      setEnrollment(updatedEnrollment);
      
      toast.success("Lesson completed!");
      
      // Auto-navigate to next lesson
      const currentIndex = lessons.findIndex(l => l.Id === parseInt(lessonId));
      if (currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        navigate(`/courses/${courseId}/lessons/${nextLesson.Id}`);
      }
    } catch (err) {
      toast.error("Failed to mark lesson as complete.");
    }
  };

  const handleVideoProgress = (currentTime, duration) => {
    // Mark lesson as complete when 80% watched
    if (currentTime / duration >= 0.8) {
      handleLessonComplete();
    }
  };

  const navigateToLesson = (targetLessonId) => {
    navigate(`/courses/${courseId}/lessons/${targetLessonId}`);
    setSidebarOpen(false);
  };

  const getProgress = () => {
    if (!enrollment || !lessons.length) return 0;
    return (enrollment.completedLessons.length / lessons.length) * 100;
  };

  const getCurrentLessonIndex = () => {
    return lessons.findIndex(l => l.Id === parseInt(lessonId));
  };

  const getNextLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  };

  const getPreviousLesson = () => {
    const currentIndex = getCurrentLessonIndex();
    return currentIndex > 0 ? lessons[currentIndex - 1] : null;
  };

  const renderLessonContent = () => {
    if (!lesson) return null;

    switch (lesson.type) {
      case "video":
        return (
          <VideoPlayer
            src={lesson.content.videoUrl}
            poster={lesson.content.poster}
            title={lesson.title}
            onProgress={handleVideoProgress}
            onComplete={handleLessonComplete}
            className="aspect-video"
          />
        );
      
      case "pdf":
        return (
          <div className="bg-white rounded-lg p-8 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-xl">PDF Document</h3>
              <Button
                as="a"
                href={lesson.content.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ApperIcon name="Download" size={16} />
                Download
              </Button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 mb-4">
                Click the button above to download and view the PDF document.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  <strong>File:</strong> {lesson.content.fileName || "document.pdf"}
                </p>
              </div>
            </div>
          </div>
        );
      
      case "text":
        return (
          <div className="bg-white rounded-lg p-8 shadow-soft">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lesson.content.html }} />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-lg p-8 shadow-soft text-center">
            <ApperIcon name="FileText" size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Content type not supported</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="skeleton" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error
            title="Failed to load lesson"
            message={error}
            onRetry={loadLessonData}
          />
        </div>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error
            title="Lesson not found"
            message="The lesson you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  const progress = getProgress();
  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();
  const isCompleted = enrollment?.completedLessons.includes(parseInt(lessonId));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 bg-white shadow-sm h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-display font-semibold text-lg text-gray-900 mb-2">
              {course.title}
            </h2>
            <ProgressBar
              value={progress}
              showLabel
              className="mb-4"
            />
            <p className="text-sm text-gray-600">
              {enrollment?.completedLessons.length || 0} of {lessons.length} lessons completed
            </p>
          </div>
          
          <div className="p-6 space-y-2">
            {lessons.map((lessonItem) => (
              <div
                key={lessonItem.Id}
                onClick={() => navigateToLesson(lessonItem.Id)}
                className={cn(
                  "cursor-pointer rounded-lg transition-colors",
                  lessonItem.Id === parseInt(lessonId) && "bg-primary-50"
                )}
              >
                <LessonItem
                  lesson={lessonItem}
                  courseId={course.Id}
                  isActive={lessonItem.Id === parseInt(lessonId)}
                  isCompleted={enrollment?.completedLessons.includes(lessonItem.Id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg text-gray-900">
                  {course.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>
              
              <div className="p-6 space-y-2">
                {lessons.map((lessonItem) => (
                  <div
                    key={lessonItem.Id}
                    onClick={() => navigateToLesson(lessonItem.Id)}
                    className={cn(
                      "cursor-pointer rounded-lg transition-colors",
                      lessonItem.Id === parseInt(lessonId) && "bg-primary-50"
                    )}
                  >
                    <LessonItem
                      lesson={lessonItem}
                      courseId={course.Id}
                      isActive={lessonItem.Id === parseInt(lessonId)}
                      isCompleted={enrollment?.completedLessons.includes(lessonItem.Id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <ApperIcon name="Menu" size={20} />
                </Button>
                
                <div>
                  <h1 className="font-display font-semibold text-xl text-gray-900">
                    {lesson.title}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Lesson {getCurrentLessonIndex() + 1} of {lessons.length}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isCompleted && (
                  <div className="flex items-center gap-1 text-success">
                    <ApperIcon name="CheckCircle" size={16} />
                    <span className="text-sm">Completed</span>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="ArrowLeft" size={16} />
                  Back to Course
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderLessonContent()}
            </motion.div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                {previousLesson && (
                  <Button
                    variant="outline"
                    onClick={() => navigateToLesson(previousLesson.Id)}
                    className="flex items-center gap-2"
                  >
                    <ApperIcon name="ChevronLeft" size={16} />
                    Previous: {previousLesson.title}
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {!isCompleted && (
                  <Button
                    onClick={handleLessonComplete}
                    variant="success"
                    className="flex items-center gap-2"
                  >
                    <ApperIcon name="Check" size={16} />
                    Mark as Complete
                  </Button>
                )}
                
                {nextLesson && (
                  <Button
                    onClick={() => navigateToLesson(nextLesson.Id)}
                    className="flex items-center gap-2"
                  >
                    Next: {nextLesson.title}
                    <ApperIcon name="ChevronRight" size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;