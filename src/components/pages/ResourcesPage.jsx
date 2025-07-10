import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { Input } from '@/components/atoms/Input'

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const resourceCategories = [
    { id: "all", name: "All Resources", icon: "Grid3x3" },
    { id: "guides", name: "Study Guides", icon: "BookOpen" },
    { id: "tools", name: "Learning Tools", icon: "Wrench" },
    { id: "templates", name: "Templates", icon: "FileText" },
    { id: "checklists", name: "Checklists", icon: "CheckSquare" },
    { id: "videos", name: "Video Tutorials", icon: "Play" },
    { id: "articles", name: "Articles", icon: "Newspaper" },
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Web Development Roadmap",
      description: "A comprehensive guide to becoming a full-stack web developer in 2024",
      category: "guides",
      type: "PDF Guide",
      downloads: 15420,
      rating: 4.9,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: 2,
      title: "React Interview Questions",
      description: "50+ common React interview questions with detailed answers",
      category: "guides",
      type: "PDF Guide",
      downloads: 8750,
      rating: 4.8,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: 3,
      title: "Code Editor Setup Checklist",
      description: "Essential extensions and settings for VS Code productivity",
      category: "checklists",
      type: "Checklist",
      downloads: 12300,
      rating: 4.7,
      image: "/api/placeholder/300/200",
      featured: false,
    },
    {
      id: 4,
      title: "UI/UX Design System Template",
      description: "Figma template for creating consistent design systems",
      category: "templates",
      type: "Figma Template",
      downloads: 9890,
      rating: 4.9,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: 5,
      title: "Python Data Science Toolkit",
      description: "Essential libraries and tools for data science projects",
      category: "tools",
      type: "Tool Collection",
      downloads: 7650,
      rating: 4.6,
      image: "/api/placeholder/300/200",
      featured: false,
    },
    {
      id: 6,
      title: "Project Management Template",
      description: "Notion template for managing learning projects and goals",
      category: "templates",
      type: "Notion Template",
      downloads: 5430,
      rating: 4.8,
      image: "/api/placeholder/300/200",
      featured: false,
    },
    {
      id: 7,
      title: "Git Commands Cheat Sheet",
      description: "Quick reference for essential Git commands and workflows",
      category: "guides",
      type: "Cheat Sheet",
      downloads: 18950,
      rating: 4.9,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: 8,
      title: "Learning Progress Tracker",
      description: "Spreadsheet template to track your learning goals and progress",
      category: "templates",
      type: "Excel Template",
      downloads: 6780,
      rating: 4.5,
      image: "/api/placeholder/300/200",
      featured: false,
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const learningTips = [
    {
      title: "Set Clear Goals",
      description: "Define specific, measurable learning objectives before starting any course.",
      icon: "Target",
    },
    {
      title: "Practice Regularly",
      description: "Consistent practice is key to mastering new skills and retaining knowledge.",
      icon: "Calendar",
    },
    {
      title: "Join Communities",
      description: "Connect with other learners and experts in your field for support and networking.",
      icon: "Users",
    },
    {
      title: "Apply Knowledge",
      description: "Work on real projects to apply what you've learned and build your portfolio.",
      icon: "Zap",
    },
  ];

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
              Student Resources
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Free resources, guides, and tools to accelerate your learning journey and help you succeed.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search resources..."
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

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Featured Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and highly-rated resources chosen by thousands of students.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  <div className="relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent-500 text-white rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-primary-600 font-medium text-sm">
                        {resource.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Star" size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        {resource.downloads.toLocaleString()} downloads
                      </span>
                      <Button size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find exactly what you need with our organized resource categories.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ApperIcon name={category.icon} size={16} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    {resource.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent-500 text-white rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-primary-600 font-medium text-sm">
                        {resource.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <ApperIcon name="Star" size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        {resource.downloads.toLocaleString()} downloads
                      </span>
                      <Button size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="Search" size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Learning Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven strategies to maximize your learning potential and achieve your goals.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name={tip.icon} size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600">{tip.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Explore our comprehensive course library and find the perfect learning path for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Browse Courses
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Create Account
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;