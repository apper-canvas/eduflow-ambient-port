import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/atoms/Button";
import { Card } from "@/atoms/Card";

const CareersPage = () => {
  const openPositions = [
    {
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Join our frontend team to build the next generation of learning experiences.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Experience with modern tooling"],
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      description: "Lead product strategy and roadmap for our core learning platform.",
      requirements: ["3+ years product management", "EdTech experience preferred", "Data-driven mindset"],
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive and accessible learning experiences for millions of users.",
      requirements: ["4+ years UX design", "Figma expertise", "User research experience"],
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Austin",
      type: "Full-time",
      description: "Scale our infrastructure to support millions of learners worldwide.",
      requirements: ["AWS experience", "Kubernetes knowledge", "CI/CD expertise"],
    },
  ];

  const benefits = [
    {
      icon: "Heart",
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs.",
    },
    {
      icon: "Clock",
      title: "Flexible Schedule",
      description: "Work from anywhere with flexible hours and unlimited PTO policy.",
    },
    {
      icon: "GraduationCap",
      title: "Learning Budget",
      description: "$2,000 annual budget for courses, conferences, and professional development.",
    },
    {
      icon: "Users",
      title: "Team Events",
      description: "Regular team building activities, annual retreats, and social events.",
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
              Join Our Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Help us build the future of education. We're looking for passionate individuals who want to make a difference.
            </p>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Why Join EduFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just building a product – we're transforming how people learn and grow.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name={benefit.icon} size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your next career opportunity with us. We're always looking for talented individuals to join our team.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-display font-semibold text-gray-900">
                          {position.title}
                        </h3>
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {position.department}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <ApperIcon name="MapPin" size={16} />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ApperIcon name="Clock" size={16} />
                          <span>{position.type}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{position.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, reqIndex) => (
                          <span
                            key={reqIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Button className="w-full lg:w-auto">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At EduFlow, we believe that great products come from great teams. We foster a culture of collaboration, 
                  innovation, and continuous learning where every team member can thrive.
                </p>
                <p>
                  Our remote-first approach means you can work from anywhere while staying connected with your team. 
                  We prioritize work-life balance and provide the flexibility you need to do your best work.
                </p>
                <p>
                  We celebrate diversity and are committed to creating an inclusive environment where everyone feels 
                  valued and empowered to contribute their unique perspectives.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/api/placeholder/600/400"
                alt="EduFlow team culture"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
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
              Don't See Your Role?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              We're always looking for talented individuals. Send us your resume and let's talk about how you can contribute.
            </p>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Send Resume
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;