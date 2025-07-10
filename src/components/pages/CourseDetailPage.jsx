import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import ProgressBar from "@/components/atoms/ProgressBar";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import LessonItem from "@/components/molecules/LessonItem";
import { lessonsService } from "@/services/api/lessonsService";
import { enrollmentsService } from "@/services/api/enrollmentsService";
import { coursesService } from "@/services/api/coursesService";

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  // Mock current user
  const currentUser = {
    Id: 1,
    name: "John Doe",
    role: "student"
  };

  useEffect(() => {
    loadCourseData();
  }, [id]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [courseData, lessonsData, enrollmentsData] = await Promise.all([
        coursesService.getById(parseInt(id)),
        lessonsService.getByCourseId(parseInt(id)),
        enrollmentsService.getByUserId(currentUser.Id)
      ]);

      setCourse(courseData);
      setLessons(lessonsData);
      
      // Check if user is enrolled
      const userEnrollment = enrollmentsData.find(e => e.courseId === parseInt(id));
      setEnrollment(userEnrollment);
    } catch (err) {
      setError("Failed to load course details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      
      const enrollmentData = {
        userId: currentUser.Id,
        courseId: parseInt(id),
        progress: 0,
        completedLessons: []
      };

      await enrollmentsService.create(enrollmentData);
      
      // Update local state
      setEnrollment(enrollmentData);
      
      toast.success("Successfully enrolled in the course!");
      
      // Navigate to first lesson
      if (lessons.length > 0) {
        navigate(`/courses/${id}/lessons/${lessons[0].Id}`);
      }
    } catch (err) {
      toast.error("Failed to enroll in course. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const handleStartLearning = () => {
    if (lessons.length > 0) {
      navigate(`/courses/${id}/lessons/${lessons[0].Id}`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "success";
      case "intermediate": return "warning";
      case "advanced": return "error";
      default: return "default";
    }
  };

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `$${price}`;
  };

  const getProgress = () => {
    if (!enrollment || !lessons.length) return 0;
    return (enrollment.completedLessons.length / lessons.length) * 100;
  };

  const isEnrolled = !!enrollment;
  const progress = getProgress();

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
            title="Failed to load course"
            message={error}
            onRetry={loadCourseData}
          />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error
            title="Course not found"
            message="The course you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Course Header */}
              <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="primary" className="capitalize">
                        {course.category}
                      </Badge>
                      <Badge 
                        variant={getDifficultyColor(course.difficulty)}
                        className="capitalize"
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                    
                    <h1 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                      {course.title}
                    </h1>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Clock" size={16} />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Users" size={16} />
                        {course.studentsCount || 0} students
                      </div>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="BarChart" size={16} />
                        {lessons.length} lessons
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {formatPrice(course.price)}
                    </div>
                    {course.originalPrice && course.originalPrice > course.price && (
                      <div className="text-sm text-gray-500 line-through">
                        ${course.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar (for enrolled students) */}
                {isEnrolled && (
                  <div className="mb-6">
                    <ProgressBar
                      value={progress}
                      showLabel
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-600">
                      {enrollment.completedLessons.length} of {lessons.length} lessons completed
                    </p>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-4">
                  {isEnrolled ? (
                    <Button
                      onClick={handleStartLearning}
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <ApperIcon name="Play" size={20} />
                      {progress > 0 ? "Continue Learning" : "Start Learning"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEnroll}
                      size="lg"
                      isLoading={enrolling}
                      className="flex items-center gap-2"
                    >
                      <ApperIcon name="BookOpen" size={20} />
                      {course.price === 0 ? "Enroll for Free" : `Enroll for ${formatPrice(course.price)}`}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <ApperIcon name="Heart" size={20} />
                    Save
                  </Button>
                </div>
              </div>

              {/* Course Content */}
              <div className="bg-white rounded-xl shadow-soft p-8">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
                  Course Content
                </h2>
                
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <LessonItem
                      key={lesson.Id}
                      lesson={lesson}
                      courseId={course.Id}
                      isCompleted={enrollment?.completedLessons.includes(lesson.Id)}
                    />
                  ))}
                </div>
                
                {lessons.length === 0 && (
                  <div className="text-center py-12">
                    <ApperIcon name="BookOpen" size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No lessons available yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {/* Instructor Info */}
              <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Instructor
                </h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar
                    src={course.instructorAvatar}
                    alt={course.instructorName}
                    size="lg"
                    fallback={course.instructorName?.charAt(0)}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{course.instructorName}</h4>
                    <p className="text-sm text-gray-500">{course.instructorTitle}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  {course.instructorBio}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Users" size={16} />
                    {course.instructorStudents || 0} students
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="BookOpen" size={16} />
                    {course.instructorCourses || 0} courses
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Star" size={16} />
                    {course.instructorRating || 0} rating
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Course Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <Badge variant={getDifficultyColor(course.difficulty)} className="capitalize">
                      {course.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lessons</span>
                    <span className="font-medium">{lessons.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-medium">{course.language || "English"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
<span className="text-gray-600">Certificate</span>
                    <span className="font-medium">
                      {course.certificate ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
</motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;