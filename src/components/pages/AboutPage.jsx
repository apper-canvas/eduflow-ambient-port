import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/atoms/Button";
import { Card } from "@/atoms/Card";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/400/400",
      bio: "Former education technology executive with 15+ years experience building learning platforms.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/api/placeholder/400/400",
      bio: "Full-stack engineer passionate about scalable educational technology solutions.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image: "/api/placeholder/400/400",
      bio: "Curriculum designer with expertise in adult learning and professional development.",
    },
    {
      name: "David Kim",
      role: "Head of Design",
      image: "/api/placeholder/400/400",
      bio: "UX designer focused on creating intuitive and accessible learning experiences.",
    },
  ];

  const stats = [
    { number: "500K+", label: "Active Students" },
    { number: "15K+", label: "Expert Instructors" },
    { number: "10K+", label: "Courses Available" },
    { number: "150+", label: "Countries Served" },
  ];

  const values = [
    {
      icon: "Target",
      title: "Quality First",
      description: "We maintain the highest standards in course content and instructor expertise.",
    },
    {
      icon: "Users",
      title: "Accessibility",
      description: "Education should be accessible to everyone, regardless of background or location.",
    },
    {
      icon: "Zap",
      title: "Innovation",
      description: "We continuously evolve our platform using the latest educational technology.",
    },
    {
      icon: "Heart",
      title: "Community",
      description: "Building a supportive learning community where students and instructors thrive.",
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
              Empowering Learning for Everyone
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              EduFlow was founded on the belief that quality education should be accessible to learners everywhere.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                Join Our Mission
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                View Open Positions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  EduFlow was born from a simple observation: the best learning happens when students are engaged, 
                  motivated, and supported by expert instructors. In 2020, our founders set out to create a platform 
                  that would bridge the gap between traditional education and modern learning needs.
                </p>
                <p>
                  What started as a small team of educators and technologists has grown into a global platform 
                  serving over 500,000 students worldwide. Our mission remains the same: to make quality education 
                  accessible, engaging, and effective for learners everywhere.
                </p>
                <p>
                  Today, EduFlow hosts thousands of courses across dozens of categories, from technical skills 
                  to creative arts, taught by industry experts who are passionate about sharing their knowledge.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/api/placeholder/600/400"
                alt="EduFlow team working together"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do, from product development to customer support.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name={value.icon} size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind EduFlow's mission to transform education.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
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
              Join thousands of students already learning with EduFlow's expert instructors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Browse Courses
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Become an Instructor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;