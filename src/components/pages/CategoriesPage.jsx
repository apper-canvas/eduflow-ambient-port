import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Card } from "@/atoms/Card";
import { Input } from "@/atoms/Input";

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: 1,
      name: "Web Development",
      description: "Build modern websites and applications",
      icon: "Code",
      courseCount: 1247,
      color: "from-blue-500 to-cyan-500",
      subcategories: ["React", "Vue.js", "Node.js", "PHP", "Python"],
    },
    {
      id: 2,
      name: "Data Science",
      description: "Analyze data and build predictive models",
      icon: "BarChart3",
      courseCount: 892,
      color: "from-purple-500 to-pink-500",
      subcategories: ["Python", "R", "Machine Learning", "SQL", "Statistics"],
    },
    {
      id: 3,
      name: "Digital Marketing",
      description: "Grow your business online",
      icon: "TrendingUp",
      courseCount: 735,
      color: "from-green-500 to-teal-500",
      subcategories: ["SEO", "Social Media", "Email Marketing", "PPC", "Analytics"],
    },
    {
      id: 4,
      name: "Design",
      description: "Create beautiful and functional designs",
      icon: "Palette",
      courseCount: 654,
      color: "from-orange-500 to-red-500",
      subcategories: ["UI/UX", "Graphic Design", "Web Design", "Figma", "Adobe Creative"],
    },
    {
      id: 5,
      name: "Business",
      description: "Develop your entrepreneurial skills",
      icon: "Briefcase",
      courseCount: 589,
      color: "from-indigo-500 to-purple-500",
      subcategories: ["Entrepreneurship", "Management", "Finance", "Strategy", "Operations"],
    },
    {
      id: 6,
      name: "Photography",
      description: "Capture and edit stunning images",
      icon: "Camera",
      courseCount: 412,
      color: "from-yellow-500 to-orange-500",
      subcategories: ["Portrait", "Landscape", "Street", "Wedding", "Photo Editing"],
    },
    {
      id: 7,
      name: "Music",
      description: "Learn instruments and music production",
      icon: "Music",
      courseCount: 356,
      color: "from-pink-500 to-rose-500",
      subcategories: ["Guitar", "Piano", "Singing", "Music Production", "Music Theory"],
    },
    {
      id: 8,
      name: "Languages",
      description: "Master new languages and cultures",
      icon: "Globe",
      courseCount: 298,
      color: "from-cyan-500 to-blue-500",
      subcategories: ["Spanish", "French", "German", "Mandarin", "Japanese"],
    },
    {
      id: 9,
      name: "Health & Fitness",
      description: "Improve your physical and mental wellbeing",
      icon: "Heart",
      courseCount: 267,
      color: "from-emerald-500 to-green-500",
      subcategories: ["Yoga", "Meditation", "Nutrition", "Fitness", "Mental Health"],
    },
    {
      id: 10,
      name: "Personal Development",
      description: "Grow personally and professionally",
      icon: "User",
      courseCount: 234,
      color: "from-violet-500 to-purple-500",
      subcategories: ["Leadership", "Communication", "Productivity", "Goal Setting", "Mindfulness"],
    },
    {
      id: 11,
      name: "Culinary Arts",
      description: "Master cooking and baking techniques",
      icon: "ChefHat",
      courseCount: 198,
      color: "from-amber-500 to-orange-500",
      subcategories: ["Cooking Basics", "Baking", "International Cuisine", "Pastry", "Wine"],
    },
    {
      id: 12,
      name: "Technology",
      description: "Stay current with latest tech trends",
      icon: "Smartphone",
      courseCount: 445,
      color: "from-slate-500 to-gray-500",
      subcategories: ["AI/ML", "Cloud Computing", "Cybersecurity", "Blockchain", "IoT"],
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const popularCategories = categories.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Explore Course Categories
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover your passion and start learning something new today from our diverse range of subjects.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-500"
                />
                <ApperIcon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most in-demand skills and subjects chosen by thousands of learners.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/courses?category=${category.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                    <div className={`h-32 bg-gradient-to-br ${category.color} p-6 flex items-center justify-center`}>
                      <ApperIcon name={category.icon} size={48} className="text-white" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-medium text-sm">
                          {category.courseCount} courses
                        </span>
                        <ApperIcon name="ArrowRight" size={16} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              All Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through all available course categories to find your perfect learning path.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/courses?category=${category.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                          <ApperIcon name={category.icon} size={32} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-primary-600 font-medium text-sm">
                              {category.courseCount} courses
                            </span>
                            <ApperIcon name="ArrowRight" size={16} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                          </div>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                            <span
                              key={subIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {sub}
                            </span>
                          ))}
                          {category.subcategories.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              +{category.subcategories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="Search" size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                No categories found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse all categories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold mb-2">12</div>
              <div className="text-blue-100">Main Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold mb-2">80+</div>
              <div className="text-blue-100">Subcategories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold mb-2">5K+</div>
              <div className="text-blue-100">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold mb-2">500K+</div>
              <div className="text-blue-100">Students Learning</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;