import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import { Button } from "@/components/atoms/Button";
import { Card } from '@/components/atoms/Card'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: "Mail",
      title: "Email Us",
      description: "Get in touch with our team",
      contact: "hello@eduflow.com",
      action: "mailto:hello@eduflow.com",
    },
    {
      icon: "Phone",
      title: "Call Us",
      description: "Speak with our support team",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: "MessageCircle",
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 24/7",
      action: "#",
    },
    {
      icon: "MapPin",
      title: "Visit Us",
      description: "Our headquarters",
      contact: "123 Education St, San Francisco, CA 94105",
      action: "https://maps.google.com",
    },
  ];

  const departments = [
    {
      name: "General Support",
      email: "support@eduflow.com",
      description: "Account issues, technical problems, course questions",
    },
    {
      name: "Business Inquiries",
      email: "business@eduflow.com",
      description: "Partnerships, enterprise solutions, bulk purchases",
    },
    {
      name: "Instructor Support",
      email: "instructors@eduflow.com",
      description: "Course creation, instructor onboarding, teaching resources",
    },
    {
      name: "Press & Media",
      email: "press@eduflow.com",
      description: "Media inquiries, press releases, interview requests",
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
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              We're here to help. Reach out to us with any questions, feedback, or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              How Can We Help?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name={info.icon} size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{info.description}</p>
                  <a
                    href={info.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {info.contact}
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Departments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
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
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Department Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Department Contacts
              </h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card key={dept.name} className="p-6">
                    <h4 className="font-display font-semibold text-gray-900 mb-2">
                      {dept.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">{dept.description}</p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {dept.email}
                    </a>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
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
              Quick answers to common questions. Can't find what you're looking for?
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "How can I reset my password?",
                  answer: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
                },
                {
                  question: "How do I contact my instructor?",
                  answer: "You can message your instructor directly through the course discussion board or use the messaging feature in your course dashboard.",
                },
                {
                  question: "What's your refund policy?",
                  answer: "We offer a 30-day money-back guarantee for all courses. If you're not satisfied, contact our support team for a full refund.",
                },
                {
                  question: "Do you offer corporate training?",
                  answer: "Yes! We offer custom corporate training solutions. Contact our business team at business@eduflow.com for more information.",
                },
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h4 className="font-display font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline">
                View All FAQs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;