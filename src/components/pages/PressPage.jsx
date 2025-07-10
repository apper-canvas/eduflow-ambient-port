import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
const PressPage = () => {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "EduFlow Reaches 500,000 Students Worldwide",
      excerpt: "Platform celebrates major milestone with expansion into new markets and enhanced AI-powered learning features.",
      category: "Company News",
    },
    {
      date: "February 28, 2024",
      title: "EduFlow Launches AI-Powered Course Recommendations",
      excerpt: "New personalization engine helps students discover relevant courses based on their learning goals and preferences.",
      category: "Product Update",
    },
    {
      date: "January 18, 2024",
      title: "EduFlow Partners with Leading Universities",
      excerpt: "Strategic partnerships bring accredited programs and expert instructors to the platform.",
      category: "Partnership",
    },
    {
      date: "December 5, 2023",
      title: "EduFlow Raises $50M in Series B Funding",
      excerpt: "Investment will accelerate global expansion and development of next-generation learning technologies.",
      category: "Funding",
    },
  ];

  const mediaKit = [
    {
      name: "Company Logo Package",
      description: "High-resolution logos in various formats",
      type: "ZIP",
      size: "2.5 MB",
    },
    {
      name: "Executive Photos",
      description: "Professional headshots of leadership team",
      type: "ZIP",
      size: "8.2 MB",
    },
    {
      name: "Company Fact Sheet",
      description: "Key statistics and company information",
      type: "PDF",
      size: "1.1 MB",
    },
    {
      name: "Product Screenshots",
      description: "Platform interface and feature highlights",
      type: "ZIP",
      size: "15.3 MB",
    },
  ];

  const awards = [
    {
      year: "2024",
      award: "Best EdTech Platform",
      organization: "TechCrunch Awards",
      description: "Recognized for innovation in online learning technology",
    },
    {
      year: "2023",
      award: "Top 50 EdTech Companies",
      organization: "Education Week",
      description: "Listed among the most influential education technology companies",
    },
    {
      year: "2023",
      award: "User Experience Excellence",
      organization: "UX Design Awards",
      description: "Honored for outstanding user interface and experience design",
    },
    {
      year: "2022",
      award: "Startup of the Year",
      organization: "EdTech Hub",
      description: "Recognized as the most promising education technology startup",
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
              Press & Media
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Latest news, press releases, and media resources from EduFlow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Download Media Kit
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Contact Press Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Latest News
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest developments and announcements from EduFlow.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-gray-500">{release.date}</span>
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {release.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
                        {release.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{release.excerpt}</p>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-8">
                      <Button variant="outline" className="w-full lg:w-auto">
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Media Kit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download logos, photos, and other media assets for your articles and coverage.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Download" size={32} className="text-primary-600" />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {item.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {item.size}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Download
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're honored to be recognized by industry leaders and publications.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.award}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="Award" size={24} className="text-accent-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-display font-bold text-gray-900">
                          {award.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                        {award.award}
                      </h3>
                      <p className="text-primary-600 font-medium mb-3">{award.organization}</p>
                      <p className="text-gray-600">{award.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              By the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key statistics and milestones that define our impact.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500K+", label: "Active Students" },
              { number: "15K+", label: "Expert Instructors" },
              { number: "10K+", label: "Courses Available" },
              { number: "150+", label: "Countries Served" },
              { number: "95%", label: "Course Completion Rate" },
              { number: "4.8/5", label: "Average Rating" },
              { number: "50M+", label: "Learning Hours" },
              { number: "99.9%", label: "Platform Uptime" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Press Team */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Media Inquiries
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              For press inquiries, interview requests, or additional information, contact our press team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                press@eduflow.com
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                +1 (555) 123-4567
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PressPage;