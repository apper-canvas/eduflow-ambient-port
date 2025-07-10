import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import CourseGrid from "@/components/organisms/CourseGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { coursesService } from "@/services/api/coursesService";
import { certificateService } from "@/services/api/certificateService";

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificateLoading, setCertificateLoading] = useState(false);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const courses = await coursesService.getAll();
      setFeaturedCourses(courses.slice(0, 6));
    } catch (err) {
      setError("Failed to load featured courses. Please try again.");
    } finally {
      setLoading(false);
    }
};

  const handleDownloadCertificates = async () => {
    try {
      setCertificateLoading(true);
      // Mock user ID - in real app, this would come from auth context
      const userId = 1;
      const certificates = await certificateService.getByUserId(userId);
      
      if (certificates.length === 0) {
        toast.info("No certificates available for download yet. Complete some courses to earn certificates!");
        return;
      }
      
      // In a real app, this would trigger actual downloads
      // For now, we'll show a success message
      toast.success(`Found ${certificates.length} certificate(s) ready for download!`);
      
      // Navigate to profile page where certificates can be managed
      navigate("/profile");
    } catch (err) {
      toast.error("Failed to load certificates. Please try again.");
    } finally {
      setCertificateLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Browse Courses",
      description: "Explore our extensive course catalog",
      icon: "BookOpen",
      action: () => navigate("/courses"),
      color: "primary"
    },
    {
      title: "Update Profile",
      description: "Manage your account settings",
      icon: "User",
      action: () => navigate("/profile"),
      color: "secondary"
    },
    {
      title: "Download Certificates",
      description: "Get your earned certificates",
      icon: "Download",
      action: handleDownloadCertificates,
      color: "accent",
      loading: certificateLoading
    }
  ];

  const categories = [
    { name: "Programming", icon: "Code", color: "primary", count: 45 },
    { name: "Design", icon: "Palette", color: "secondary", count: 32 },
    { name: "Business", icon: "Briefcase", color: "accent", count: 28 },
    { name: "Marketing", icon: "TrendingUp", color: "success", count: 24 },
    { name: "Photography", icon: "Camera", color: "warning", count: 18 },
    { name: "Music", icon: "Music", color: "error", count: 15 },
  ];

  const stats = [
    { value: "50,000+", label: "Students", icon: "Users" },
    { value: "2,500+", label: "Courses", icon: "BookOpen" },
    { value: "500+", label: "Instructors", icon: "GraduationCap" },
    { value: "95%", label: "Satisfaction", icon: "Star" },
  ];

  const testimonials = [
    {
      Id: 1,
      name: "Sarah Johnson",
      role: "Software Developer",
      avatar: "",
      content: "EduFlow has completely transformed my career. The quality of courses and instructors is exceptional.",
      rating: 5,
    },
    {
      Id: 2,
      name: "Mike Chen",
      role: "UX Designer",
      avatar: "",
      content: "The interactive learning experience and practical projects helped me land my dream job.",
      rating: 5,
    },
    {
      Id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      avatar: "",
      content: "I love how flexible the platform is. I can learn at my own pace while working full-time.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6">
                Learn Without
                <span className="block text-accent-300">Limits</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-md">
                Join millions of learners and unlock your potential with our expert-led courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  as={Link}
                  to="/courses"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold"
                >
                  Explore Courses
                </Button>
                <Button
                  as={Link}
                  to="/teaching"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Become an Instructor
</Button>
              </div>
              
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12"
              >
                <h3 className="text-lg font-semibold text-white/90 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      onClick={action.action}
                      disabled={action.loading}
                      className={cn(
                        "p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20",
                        "hover:bg-white/20 transition-all duration-200 transform hover:scale-105",
                        "text-left group disabled:opacity-50 disabled:cursor-not-allowed",
                        "disabled:hover:scale-100 disabled:hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          action.color === "primary" && "bg-primary-500/20 text-primary-200",
                          action.color === "secondary" && "bg-secondary-500/20 text-secondary-200",
                          action.color === "accent" && "bg-accent-500/20 text-accent-200"
                        )}>
                          {action.loading ? (
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <ApperIcon name={action.icon} size={20} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white group-hover:text-white/90 transition-colors">
                            {action.title}
                          </div>
                          <div className="text-sm text-white/70 group-hover:text-white/60 transition-colors">
                            {action.description}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <ApperIcon name={stat.icon} size={24} className="text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover a wide range of subjects and find the perfect course for your interests.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={`/courses?category=${category.name}`}
                  className="block p-6 bg-white rounded-xl shadow-soft hover:shadow-hover transition-all duration-200 transform hover:scale-105 group"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform",
                    category.color === "primary" && "bg-primary-100 text-primary-600",
                    category.color === "secondary" && "bg-secondary-100 text-secondary-600",
                    category.color === "accent" && "bg-accent-100 text-accent-600",
                    category.color === "success" && "bg-green-100 text-green-600",
                    category.color === "warning" && "bg-yellow-100 text-yellow-600",
                    category.color === "error" && "bg-red-100 text-red-600"
                  )}>
                    <ApperIcon name={category.icon} size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} courses</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses, handpicked by our experts.
            </p>
          </div>
          
          {loading ? (
            <Loading type="skeleton" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" />
          ) : error ? (
            <Error
              title="Failed to load courses"
              message={error}
              onRetry={loadFeaturedCourses}
            />
          ) : (
            <CourseGrid courses={featuredCourses} />
          )}
          
          <div className="text-center mt-12">
            <Button
              as={Link}
              to="/courses"
              size="lg"
              className="flex items-center gap-2"
            >
              View All Courses
              <ApperIcon name="ArrowRight" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful learners who have transformed their careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-soft p-8 hover:shadow-hover transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <ApperIcon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community of learners and start your journey to success today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/courses"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold"
              >
                Browse Courses
              </Button>
              <Button
                as={Link}
                to="/teaching"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Start Teaching
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;