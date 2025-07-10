import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ProgressBar from "@/components/atoms/ProgressBar";
import CourseGrid from "@/components/organisms/CourseGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { coursesService } from "@/services/api/coursesService";
import { enrollmentsService } from "@/services/api/enrollmentsService";

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock current user
  const currentUser = {
    Id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "student"
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [enrollmentsData, allCourses] = await Promise.all([
        enrollmentsService.getByUserId(currentUser.Id),
        coursesService.getAll()
      ]);

      setEnrollments(enrollmentsData);
      
      // Get enrolled courses with progress
      const enrolledCourses = enrollmentsData.map(enrollment => {
        const course = allCourses.find(c => c.Id === enrollment.courseId);
        return {
          ...course,
          progress: enrollment.progress || 0,
          completedLessons: enrollment.completedLessons || [],
          enrolledAt: enrollment.enrolledAt
        };
      }).filter(Boolean);

      setCourses(enrolledCourses);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const totalCourses = courses.length;
    const completedCourses = courses.filter(c => c.progress >= 100).length;
    const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length;
    const totalHours = courses.reduce((sum, course) => {
      const hours = parseInt(course.duration) || 0;
      return sum + hours;
    }, 0);

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalHours
    };
  };

  const getRecentCourses = () => {
    return courses
      .filter(c => c.progress > 0)
      .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
      .slice(0, 3);
  };

  const getUpcomingDeadlines = () => {
    // Mock upcoming deadlines
    return [
      {
        Id: 1,
        title: "JavaScript Fundamentals Assignment",
        courseTitle: "Complete JavaScript Course",
        dueDate: "2024-02-15",
        type: "assignment"
      },
      {
        Id: 2,
        title: "React Component Quiz",
        courseTitle: "React Mastery Course",
        dueDate: "2024-02-18",
        type: "quiz"
      },
      {
        Id: 3,
        title: "Final Project Submission",
        courseTitle: "Web Development Bootcamp",
        dueDate: "2024-02-22",
        type: "project"
      }
    ];
  };

  const stats = getStats();
  const recentCourses = getRecentCourses();
  const upcomingDeadlines = getUpcomingDeadlines();

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
            title="Failed to load dashboard"
            message={error}
            onRetry={loadDashboardData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-gray-600">
            Continue your learning journey and track your progress.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="BookOpen" size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckCircle" size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedCourses}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Clock" size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgressCourses}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Award" size={20} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-xl text-gray-900">
                  Continue Learning
                </h2>
                <Button
                  as={Link}
                  to="/courses"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="Plus" size={16} />
                  Browse More
                </Button>
              </div>

              {recentCourses.length > 0 ? (
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <Card key={course.Id} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ApperIcon name="Play" size={24} className="text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            by {course.instructorName}
                          </p>
                          <ProgressBar
                            value={course.progress}
                            showLabel
                            className="mb-2"
                          />
                        </div>
                        
                        <div className="flex-shrink-0">
                          <Button
                            as={Link}
                            to={`/courses/${course.Id}`}
                            className="flex items-center gap-2"
                          >
                            <ApperIcon name="Play" size={16} />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty
                  title="No courses in progress"
                  message="Start learning by enrolling in a course!"
                  icon="BookOpen"
                  action={{
                    label: "Browse Courses",
                    onClick: () => {},
                    icon: "Search"
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Upcoming Deadlines
                </h3>
                
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.Id} className="flex items-start gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        deadline.type === "assignment" && "bg-primary-100 text-primary-600",
                        deadline.type === "quiz" && "bg-warning/20 text-warning",
                        deadline.type === "project" && "bg-secondary-100 text-secondary-600"
                      )}>
                        <ApperIcon
                          name={
                            deadline.type === "assignment" ? "FileText" :
                            deadline.type === "quiz" ? "HelpCircle" :
                            "Briefcase"
                          }
                          size={16}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {deadline.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {deadline.courseTitle}
                        </p>
                        <p className="text-xs text-gray-400">
                          Due: {new Date(deadline.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Button
                    as={Link}
                    to="/courses"
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ApperIcon name="Search" size={16} />
                    Browse Courses
                  </Button>
                  
                  <Button
                    as={Link}
                    to="/profile"
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ApperIcon name="User" size={16} />
                    Update Profile
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ApperIcon name="Download" size={16} />
                    Download Certificates
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* All Enrolled Courses */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
              All Enrolled Courses
            </h2>
            <CourseGrid courses={courses} showProgress={true} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;