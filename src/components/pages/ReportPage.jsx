import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/atoms/Button";
import { Card } from "@/atoms/Card";
import { Input } from "@/atoms/Input";
import { Textarea } from "@/atoms/Textarea";
import { Select } from "@/atoms/Select";

const ReportPage = () => {
  const [formData, setFormData] = useState({
    reportType: "",
    priority: "",
    title: "",
    description: "",
    steps: "",
    expectedBehavior: "",
    actualBehavior: "",
    email: "",
    browserInfo: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "improvement", label: "Improvement Suggestion" },
    { value: "security", label: "Security Issue" },
    { value: "performance", label: "Performance Issue" },
    { value: "content", label: "Content Issue" },
    { value: "other", label: "Other" },
  ];

  const priorities = [
    { value: "low", label: "Low - Minor issue" },
    { value: "medium", label: "Medium - Moderate impact" },
    { value: "high", label: "High - Significant impact" },
    { value: "critical", label: "Critical - System breaking" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Report submitted successfully! We'll review it and get back to you soon.");
    setFormData({
      reportType: "",
      priority: "",
      title: "",
      description: "",
      steps: "",
      expectedBehavior: "",
      actualBehavior: "",
      email: "",
      browserInfo: "",
      url: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const reportCategories = [
    {
      type: "bug",
      title: "Bug Report",
      description: "Report technical issues or unexpected behavior",
      icon: "Bug",
      color: "from-red-500 to-pink-500",
    },
    {
      type: "feature",
      title: "Feature Request",
      description: "Suggest new features or functionality",
      icon: "Lightbulb",
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "improvement",
      title: "Improvement",
      description: "Suggest enhancements to existing features",
      icon: "TrendingUp",
      color: "from-green-500 to-emerald-500",
    },
    {
      type: "security",
      title: "Security Issue",
      description: "Report security vulnerabilities or concerns",
      icon: "Shield",
      color: "from-orange-500 to-red-500",
    },
    {
      type: "performance",
      title: "Performance Issue",
      description: "Report slow loading or performance problems",
      icon: "Zap",
      color: "from-purple-500 to-indigo-500",
    },
    {
      type: "content",
      title: "Content Issue",
      description: "Report problems with course content or materials",
      icon: "FileText",
      color: "from-teal-500 to-blue-500",
    },
  ];

  const guidelines = [
    {
      title: "Be Specific",
      description: "Provide detailed information about the issue including steps to reproduce it.",
      icon: "Target",
    },
    {
      title: "Include Context",
      description: "Mention your browser, device, and what you were trying to accomplish.",
      icon: "Info",
    },
    {
      title: "Attach Evidence",
      description: "Screenshots, error messages, or videos help us understand the problem better.",
      icon: "Paperclip",
    },
    {
      title: "Check Duplicates",
      description: "Search existing reports to avoid submitting duplicate issues.",
      icon: "Search",
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
              Report an Issue
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Help us improve EduFlow by reporting bugs, suggesting features, or sharing feedback.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Report Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              What would you like to report?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the type of issue you'd like to report to help us categorize and prioritize it.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportCategories.map((category, index) => (
              <motion.div
                key={category.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    formData.reportType === category.type ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, reportType: category.type }))}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-4`}>
                    <ApperIcon name={category.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 text-center">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">{category.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Reporting Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these guidelines to help us process your report more effectively.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={guideline.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 h-full">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={guideline.icon} size={24} className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                    {guideline.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{guideline.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Submit Your Report
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please fill out the form below with as much detail as possible.
            </p>
          </motion.div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    id="reportType"
                    name="reportType"
                    value={formData.reportType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select report type</option>
                    {reportTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <Select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select priority</option>
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Provide a detailed description of the issue"
                />
              </div>

              {formData.reportType === "bug" && (
                <>
                  <div>
                    <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-2">
                      Steps to Reproduce
                    </label>
                    <Textarea
                      id="steps"
                      name="steps"
                      value={formData.steps}
                      onChange={handleChange}
                      rows={4}
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expectedBehavior" className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Behavior
                      </label>
                      <Textarea
                        id="expectedBehavior"
                        name="expectedBehavior"
                        value={formData.expectedBehavior}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What should happen?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="actualBehavior" className="block text-sm font-medium text-gray-700 mb-2">
                        Actual Behavior
                      </label>
                      <Textarea
                        id="actualBehavior"
                        name="actualBehavior"
                        value={formData.actualBehavior}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What actually happened?"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    Page URL
                  </label>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://eduflow.com/..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="browserInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Browser & Device Information
                </label>
                <Input
                  id="browserInfo"
                  name="browserInfo"
                  type="text"
                  value={formData.browserInfo}
                  onChange={handleChange}
                  placeholder="e.g., Chrome 91 on Windows 10, iPhone 12 Safari"
                />
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({
                    reportType: "",
                    priority: "",
                    title: "",
                    description: "",
                    steps: "",
                    expectedBehavior: "",
                    actualBehavior: "",
                    email: "",
                    browserInfo: "",
                    url: "",
                  })}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              What Happens Next?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's how we handle your report and keep you informed.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Clock" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                1. Acknowledgment
              </h3>
              <p className="text-gray-600">
                We'll send you a confirmation email within 24 hours acknowledging receipt of your report.
              </p>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Search" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                2. Investigation
              </h3>
              <p className="text-gray-600">
                Our team will review and investigate the issue, potentially reaching out for more details.
              </p>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="CheckCircle" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                3. Resolution
              </h3>
              <p className="text-gray-600">
                We'll work on fixing the issue and update you on the progress and final resolution.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportPage;