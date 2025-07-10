import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import FormField from "@/components/molecules/FormField";
import CourseGrid from "@/components/organisms/CourseGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import AnalyticsChart from "@/components/molecules/AnalyticsChart";
import { coursesService } from "@/services/api/coursesService";
import { enrollmentsService } from "@/services/api/enrollmentsService";
const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [allEnrollments, setAllEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    price: 0,
    duration: "",
  });

  // Mock current user
  const currentUser = {
    Id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "instructor"
  };

  useEffect(() => {
    loadInstructorData();
  }, []);

const loadInstructorData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [allCourses, enrollments] = await Promise.all([
        coursesService.getAll(),
        enrollmentsService.getAll()
      ]);

      // Filter courses by instructor
      const instructorCourses = allCourses.filter(course => 
        course.instructorId === currentUser.Id
      );

      // Add enrollment stats to courses
      const coursesWithStats = instructorCourses.map(course => {
        const courseEnrollments = enrollments.filter(e => e.courseId === course.Id);
        const completedEnrollments = courseEnrollments.filter(e => e.isCompleted);
        const averageProgress = courseEnrollments.length > 0 
          ? courseEnrollments.reduce((sum, e) => sum + e.progress, 0) / courseEnrollments.length 
          : 0;

        return {
          ...course,
          studentsCount: courseEnrollments.length,
          totalRevenue: courseEnrollments.length * course.price,
          completionRate: courseEnrollments.length > 0 ? (completedEnrollments.length / courseEnrollments.length) * 100 : 0,
          averageProgress: Math.round(averageProgress),
          enrollments: courseEnrollments
        };
      });

      setCourses(coursesWithStats);
      setAllEnrollments(enrollments);
    } catch (err) {
      setError("Failed to load instructor data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    
    try {
      setCreating(true);
      
      const courseData = {
        ...formData,
        instructorId: currentUser.Id,
        instructorName: currentUser.name,
        instructorAvatar: "",
        studentsCount: 0,
        totalRevenue: 0,
        createdAt: new Date().toISOString()
      };

      const newCourse = await coursesService.create(courseData);
      setCourses(prev => [newCourse, ...prev]);
      
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "beginner",
        price: 0,
        duration: "",
      });
      
      setShowCreateForm(false);
      toast.success("Course created successfully!");
    } catch (err) {
      toast.error("Failed to create course. Please try again.");
    } finally {
      setCreating(false);
    }
  };

const getStats = () => {
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((sum, course) => sum + course.studentsCount, 0);
    const totalRevenue = courses.reduce((sum, course) => sum + course.totalRevenue, 0);
    const averageRating = courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length || 0;
    const averageCompletion = courses.reduce((sum, course) => sum + (course.completionRate || 0), 0) / courses.length || 0;

    return {
      totalCourses,
      totalStudents,
      totalRevenue,
      averageRating,
      averageCompletion
    };
  };

  const getAnalyticsData = () => {
    if (courses.length === 0) return {};

    // Course performance data
    const courseNames = courses.map(course => course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title);
    const studentCounts = courses.map(course => course.studentsCount);
    const completionRates = courses.map(course => course.completionRate);
    const revenues = courses.map(course => course.totalRevenue);

    // Progress distribution
    const progressRanges = ['0-25%', '26-50%', '51-75%', '76-100%'];
    const progressDistribution = progressRanges.map(range => {
      const [min, max] = range.split('-').map(r => parseInt(r.replace('%', '')));
      return allEnrollments.filter(e => {
        const courseExists = courses.some(c => c.Id === e.courseId);
        return courseExists && e.progress >= min && e.progress <= max;
      }).length;
    });

    // Monthly enrollment trend (last 6 months)
    const months = [];
    const monthlyEnrollments = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short' });
      months.push(monthName);
      
      const enrollmentsInMonth = allEnrollments.filter(e => {
        const courseExists = courses.some(c => c.Id === e.courseId);
        const enrollmentDate = new Date(e.enrollmentDate);
        return courseExists && 
               enrollmentDate.getMonth() === date.getMonth() && 
               enrollmentDate.getFullYear() === date.getFullYear();
      }).length;
      monthlyEnrollments.push(enrollmentsInMonth);
    }

    return {
      courseNames,
      studentCounts,
      completionRates,
      revenues,
      progressRanges,
      progressDistribution,
      months,
      monthlyEnrollments
    };
  };

  const getCourseAnalytics = (courseId) => {
    const course = courses.find(c => c.Id === courseId);
    if (!course) return null;

    const enrollments = course.enrollments || [];
    
    // Weekly progress for the course
    const weeks = [];
    const weeklyProgress = [];
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      weeks.push(`Week ${8 - i}`);
      
      const avgProgress = enrollments.length > 0 
        ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length 
        : 0;
      weeklyProgress.push(Math.round(avgProgress));
    }

    // Student engagement levels
    const engagementLevels = ['Low', 'Medium', 'High'];
    const engagementData = engagementLevels.map(level => {
      switch (level) {
        case 'Low':
          return enrollments.filter(e => e.progress < 30).length;
        case 'Medium':
          return enrollments.filter(e => e.progress >= 30 && e.progress < 70).length;
        case 'High':
          return enrollments.filter(e => e.progress >= 70).length;
        default:
          return 0;
      }
    });

    return {
      course,
      weeks,
      weeklyProgress,
      engagementLevels,
      engagementData
    };
  };

  const stats = getStats();
  const analyticsData = getAnalyticsData();

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
            onRetry={loadInstructorData}
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
                Instructor Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your courses and track your teaching progress.
              </p>
            </div>
            
            <Button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" size={20} />
              Create Course
            </Button>
          </div>
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
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Users" size={20} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="DollarSign" size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Star" size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </Card>
</motion.div>

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-semibold text-xl text-gray-900 mb-2">
                  Analytics Dashboard
                </h2>
                <p className="text-gray-600">
                  Track your courses performance and student engagement metrics.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="flex items-center gap-2"
              >
                <ApperIcon 
                  name={showAnalytics ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
                {showAnalytics ? "Hide" : "Show"} Analytics
              </Button>
            </div>

            {showAnalytics && courses.length > 0 && (
              <div className="space-y-8">
                {/* Overview Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <AnalyticsChart
                      type="bar"
                      data={analyticsData.studentCounts}
                      categories={analyticsData.courseNames}
                      title="Students per Course"
                      height={300}
                      color="#4f46e5"
                      formatter={(value) => `${value} students`}
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <AnalyticsChart
                      type="line"
                      data={analyticsData.completionRates}
                      categories={analyticsData.courseNames}
                      title="Completion Rate by Course"
                      height={300}
                      color="#10b981"
                      formatter={(value) => `${value.toFixed(1)}%`}
                    />
                  </div>
                </div>

                {/* Progress Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <AnalyticsChart
                      type="pie"
                      data={analyticsData.progressDistribution}
                      categories={analyticsData.progressRanges}
                      title="Student Progress Distribution"
                      height={300}
                      colors={['#ef4444', '#f59e0b', '#3b82f6', '#10b981']}
                      formatter={(value) => `${value} students`}
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <AnalyticsChart
                      type="area"
                      data={analyticsData.monthlyEnrollments}
                      categories={analyticsData.months}
                      title="Monthly Enrollment Trend"
                      height={300}
                      color="#06b6d4"
                      formatter={(value) => `${value} enrollments`}
                    />
                  </div>
                </div>

                {/* Revenue Analysis */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <AnalyticsChart
                    type="bar"
                    data={analyticsData.revenues}
                    categories={analyticsData.courseNames}
                    title="Revenue by Course"
                    height={300}
                    color="#059669"
                    formatter={(value) => `$${value}`}
                  />
                </div>

                {/* Course-specific Analytics */}
                <div className="border-t pt-6">
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                    Course-specific Analytics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <Card 
                        key={course.Id} 
                        className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedCourse(course.Id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 truncate">
                            {course.title}
                          </h4>
                          <Badge variant="secondary" className="ml-2">
                            {course.studentsCount} students
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Completion Rate</span>
                            <span className="font-medium text-success">
                              {course.completionRate.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Avg. Progress</span>
                            <span className="font-medium text-primary-600">
                              {course.averageProgress}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Revenue</span>
                            <span className="font-medium text-gray-900">
                              ${course.totalRevenue}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showAnalytics && courses.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="BarChart3" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No Analytics Data</h3>
                <p className="text-gray-600">Create some courses to see analytics and performance metrics.</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Course-specific Analytics Modal */}
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const courseAnalytics = getCourseAnalytics(selectedCourse);
                if (!courseAnalytics) return null;

                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-display font-semibold text-xl text-gray-900">
                          {courseAnalytics.course.title}
                        </h3>
                        <p className="text-gray-600">Detailed course analytics</p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedCourse(null)}
                      >
                        <ApperIcon name="X" size={20} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <AnalyticsChart
                          type="line"
                          data={courseAnalytics.weeklyProgress}
                          categories={courseAnalytics.weeks}
                          title="Weekly Progress Trend"
                          height={300}
                          color="#4f46e5"
                          formatter={(value) => `${value}%`}
                        />
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <AnalyticsChart
                          type="pie"
                          data={courseAnalytics.engagementData}
                          categories={courseAnalytics.engagementLevels}
                          title="Student Engagement Levels"
                          height={300}
                          colors={['#ef4444', '#f59e0b', '#10b981']}
                          formatter={(value) => `${value} students`}
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-primary-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">
                          {courseAnalytics.course.studentsCount}
                        </div>
                        <div className="text-sm text-gray-600">Total Students</div>
                      </div>
                      <div className="bg-success/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-success">
                          {courseAnalytics.course.completionRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                      </div>
                      <div className="bg-secondary-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-secondary-600">
                          {courseAnalytics.course.averageProgress}%
                        </div>
                        <div className="text-sm text-gray-600">Avg. Progress</div>
                      </div>
                      <div className="bg-accent-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-accent-600">
                          ${courseAnalytics.course.totalRevenue}
                        </div>
                        <div className="text-sm text-gray-600">Total Revenue</div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}

        {/* Create Course Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-xl text-gray-900">
                  Create New Course
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowCreateForm(false)}
                >
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>

              <form onSubmit={handleCreateCourse} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Course Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter course title"
                  />
                  
                  <FormField
                    label="Category"
                    name="category"
                    type="select"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                  </FormField>
                </div>

                <FormField
                  label="Description"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter course description"
                  rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Difficulty Level"
                    name="difficulty"
                    type="select"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </FormField>
                  
                  <FormField
                    label="Price ($)"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                  
                  <FormField
                    label="Duration (hours)"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 10 hours"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    isLoading={creating}
                    className="flex items-center gap-2"
                  >
                    <ApperIcon name="Plus" size={16} />
                    Create Course
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl text-gray-900">
              Your Courses
            </h2>
            
            {courses.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{courses.length} courses</span>
                <span>•</span>
                <span>{stats.totalStudents} students</span>
              </div>
            )}
          </div>

          {courses.length > 0 ? (
            <CourseGrid courses={courses} />
          ) : (
            <Empty
              title="No courses yet"
              message="Create your first course to start teaching and sharing your knowledge with students."
              icon="BookOpen"
              action={{
                label: "Create Your First Course",
                onClick: () => setShowCreateForm(true),
                icon: "Plus"
              }}
            />
          )}
        </motion.div>

        {/* Recent Activity */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mt-12"
          >
            <Card className="p-8">
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-6">
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {courses.slice(0, 5).map((course) => (
                  <div key={course.Id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <ApperIcon name="BookOpen" size={20} className="text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <p className="text-sm text-gray-600">
                        {course.studentsCount} students enrolled
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${course.totalRevenue}</p>
                      <p className="text-sm text-gray-500">Revenue</p>
                    </div>
                    
                    <Button
                      as={Link}
                      to={`/courses/${course.Id}`}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <ApperIcon name="Eye" size={16} />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;