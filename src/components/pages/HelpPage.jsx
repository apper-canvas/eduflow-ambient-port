import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/atoms/Button";
import { Card } from "@/atoms/Card";
import { Input } from "@/atoms/Input";

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState(null);

  const helpCategories = [
    { id: "all", name: "All Topics", icon: "Grid3x3" },
    { id: "account", name: "Account", icon: "User" },
    { id: "courses", name: "Courses", icon: "BookOpen" },
    { id: "payment", name: "Payment", icon: "CreditCard" },
    { id: "technical", name: "Technical", icon: "Settings" },
    { id: "certificates", name: "Certificates", icon: "Award" },
  ];

  const faqs = [
    {
      id: 1,
      category: "account",
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Sign Up' button in the top right corner of any page. You'll need to provide your email address and create a password. You can also sign up using your Google or Facebook account for quicker access.",
    },
    {
      id: 2,
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer: "Click the 'Forgot Password' link on the login page. Enter your email address and we'll send you a reset link. Check your email (including spam folder) and follow the instructions to create a new password.",
    },
    {
      id: 3,
      category: "courses",
      question: "How do I enroll in a course?",
      answer: "Browse our course catalog and click on any course that interests you. On the course page, you'll see an 'Enroll Now' button. Click it to add the course to your cart, then complete the checkout process. Once enrolled, you'll have immediate access to all course materials.",
    },
    {
      id: 4,
      category: "courses",
      question: "Can I download course videos for offline viewing?",
      answer: "Yes! Our mobile app allows you to download course videos for offline viewing. Simply install the EduFlow app on your device, log in to your account, and look for the download button next to each video lesson.",
    },
    {
      id: 5,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system.",
    },
    {
      id: 6,
      category: "payment",
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all courses. If you're not satisfied with a course, you can request a full refund within 30 days of purchase. Contact our support team with your order details to process the refund.",
    },
    {
      id: 7,
      category: "technical",
      question: "What are the system requirements?",
      answer: "EduFlow works on any device with a modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, we recommend using the latest version of your browser. Our mobile app is available for iOS 12+ and Android 8+.",
    },
    {
      id: 8,
      category: "technical",
      question: "I'm having trouble playing videos. What should I do?",
      answer: "First, check your internet connection. If the problem persists, try refreshing the page or clearing your browser cache. Make sure you're using a supported browser and that JavaScript is enabled. If you're still having issues, contact our support team.",
    },
    {
      id: 9,
      category: "certificates",
      question: "Do I get a certificate when I complete a course?",
      answer: "Yes! You'll receive a certificate of completion for every course you finish. Certificates are automatically generated and available in your dashboard. You can download them as PDF files or share them on LinkedIn.",
    },
    {
      id: 10,
      category: "certificates",
      question: "Are the certificates accredited?",
      answer: "Our certificates are industry-recognized credentials that validate your skills and knowledge. While they are not accredited by traditional educational institutions, they are valued by employers and demonstrate your commitment to continuous learning.",
    },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: "MessageCircle",
      action: "mailto:support@eduflow.com",
    },
    {
      title: "Video Tutorials",
      description: "Learn how to use EduFlow",
      icon: "Play",
      action: "/tutorials",
    },
    {
      title: "System Status",
      description: "Check our platform status",
      icon: "Activity",
      action: "/status",
    },
    {
      title: "Report a Bug",
      description: "Help us improve the platform",
      icon: "Bug",
      action: "/report",
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
              How Can We Help?
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find answers to frequently asked questions or get in touch with our support team.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for help..."
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

      {/* Quick Actions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common tasks and helpful resources to get you started.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                    <ApperIcon name={action.icon} size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to the most common questions about EduFlow.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {helpCategories.map((category) => (
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
          
          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-display font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <ApperIcon 
                        name={openFAQ === faq.id ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-gray-500 flex-shrink-0"
                      />
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <p className="text-gray-600 mt-4">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Search" size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse different categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Mail" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get help via email within 24 hours
              </p>
              <Button className="w-full">
                Send Email
              </Button>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="MessageCircle" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Live Chat
              </h3>
              <p className="text-gray-600 mb-4">
                Chat with our team in real-time
              </p>
              <Button className="w-full">
                Start Chat
              </Button>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Phone" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-4">
                Call us during business hours
              </p>
              <Button className="w-full">
                Call Now
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;