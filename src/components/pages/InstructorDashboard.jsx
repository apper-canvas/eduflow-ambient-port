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
import { coursesService } from "@/services/api/coursesService";
import { enrollmentsService } from "@/services/api/enrollmentsService";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
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

      const [allCourses, allEnrollments] = await Promise.all([
        coursesService.getAll(),
        enrollmentsService.getAll()
      ]);

      // Filter courses by instructor
      const instructorCourses = allCourses.filter(course => 
        course.instructorId === currentUser.Id
      );

      // Add enrollment stats to courses
      const coursesWithStats = instructorCourses.map(course => {
        const enrollments = allEnrollments.filter(e => e.courseId === course.Id);
        return {
          ...course,
          studentsCount: enrollments.length,
          totalRevenue: enrollments.length * course.price
        };
      });

      setCourses(coursesWithStats);
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

    return {
      totalCourses,
      totalStudents,
      totalRevenue,
      averageRating
    };
  };

  const stats = getStats();

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