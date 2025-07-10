import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Card } from "@/atoms/Card";

const TermsPage = () => {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: [
        "By accessing or using EduFlow's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any part of these terms, you may not use our services.",
        "These terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.",
        "Your access to and use of the service is conditioned on your acceptance of and compliance with these terms."
      ]
    },
    {
      id: "description",
      title: "Description of Service",
      content: [
        "EduFlow is an online learning platform that provides access to educational courses, instructional materials, and related services.",
        "We offer both free and paid courses across various subjects and skill levels.",
        "The service includes features such as video lectures, quizzes, assignments, certificates, and community discussions.",
        "We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without notice.",
        "We do not guarantee that the service will be available at all times or that it will be error-free."
      ]
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      content: [
        "You must create an account to access certain features of our service.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must provide accurate and complete information when creating your account.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized access to your account.",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      id: "course-enrollment",
      title: "Course Enrollment and Access",
      content: [
        "Course enrollment grants you access to course materials for the duration specified in the course description.",
        "Access to paid courses is contingent upon successful payment processing.",
        "You may access course materials multiple times within the access period unless otherwise specified.",
        "Some courses may have prerequisites or require specific software or hardware.",
        "We reserve the right to remove courses from the platform with appropriate notice to enrolled students."
      ]
    },
    {
      id: "payment-terms",
      title: "Payment Terms",
      content: [
        "Payment for courses must be made in advance using our approved payment methods.",
        "All prices are listed in USD unless otherwise specified and are subject to applicable taxes.",
        "We offer a 30-day money-back guarantee for most courses, subject to our refund policy.",
        "Subscription services will automatically renew unless cancelled before the renewal date.",
        "We reserve the right to change our pricing with appropriate notice to users.",
        "Failed payments may result in suspension of access to paid content."
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: [
        "All course content, including videos, text, images, and audio, is protected by copyright and other intellectual property laws.",
        "You are granted a limited, non-exclusive, non-transferable license to access and use course materials for personal, educational purposes only.",
        "You may not reproduce, distribute, modify, create derivative works, or publicly display course content without express written permission.",
        "Any content you submit to the platform (reviews, comments, etc.) grants us a non-exclusive license to use, modify, and distribute such content.",
        "We respect the intellectual property rights of others and expect our users to do the same."
      ]
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      content: [
        "You agree to use the service in a lawful manner and in accordance with these terms.",
        "You will not use the service to harass, abuse, or harm others or to violate any laws or regulations.",
        "You will not attempt to gain unauthorized access to any part of the service or other users' accounts.",
        "You will not upload or transmit viruses, malware, or any other harmful code.",
        "You will not engage in any activity that interferes with or disrupts the service.",
        "Violation of these conduct rules may result in immediate termination of your account."
      ]
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      content: [
        "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.",
        "By using our service, you consent to the collection and use of your information as described in our Privacy Policy.",
        "We implement appropriate security measures to protect your personal information.",
        "You have the right to access, update, or delete your personal information as described in our Privacy Policy.",
        "We will not sell or rent your personal information to third parties without your consent."
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      content: [
        "The service is provided 'as is' without warranties of any kind, either express or implied.",
        "We do not guarantee that the service will meet your specific requirements or that it will be uninterrupted or error-free.",
        "We are not responsible for the accuracy, completeness, or usefulness of any information provided through the service.",
        "Your use of the service is at your own risk, and we disclaim all warranties related to your use of the service.",
        "We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service."
      ]
    },
    {
      id: "termination",
      title: "Termination",
      content: [
        "Either party may terminate these terms at any time with or without cause.",
        "Upon termination, your right to use the service will cease immediately.",
        "We may suspend or terminate your account if you violate these terms or engage in prohibited activities.",
        "Termination does not affect any rights or obligations that arose before termination.",
        "Upon termination, you must discontinue all use of the service and delete any downloaded materials."
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      content: [
        "These terms are governed by the laws of the State of California, without regard to conflict of law principles.",
        "Any disputes arising from these terms or your use of the service will be resolved through binding arbitration.",
        "You waive any right to participate in class action lawsuits or class-wide arbitrations.",
        "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect.",
        "These terms constitute the entire agreement between you and EduFlow regarding the use of the service."
      ]
    },
    {
      id: "changes",
      title: "Changes to Terms",
      content: [
        "We reserve the right to modify these terms at any time without prior notice.",
        "Changes will be effective immediately upon posting the updated terms on our website.",
        "Your continued use of the service after any changes constitutes acceptance of the new terms.",
        "We encourage you to review these terms periodically to stay informed of any updates.",
        "If you do not agree to the modified terms, you must discontinue use of the service."
      ]
    }
  ];

  const quickLinks = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "description", title: "Service Description" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "course-enrollment", title: "Course Enrollment" },
    { id: "payment-terms", title: "Payment Terms" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "user-conduct", title: "User Conduct" },
    { id: "privacy", title: "Privacy" },
    { id: "disclaimers", title: "Disclaimers" },
    { id: "termination", title: "Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
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
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              These terms govern your use of EduFlow's platform and services. Please read them carefully.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span>Last updated: March 15, 2024</span>
              <span>•</span>
              <span>Effective date: March 15, 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ApperIcon name="AlertTriangle" size={24} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                  Important Notice
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    By using EduFlow's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                  <p>
                    These terms may be updated from time to time. Your continued use of the service after any changes constitutes acceptance of the new terms.
                  </p>
                  <p>
                    If you have any questions about these terms, please contact us at legal@eduflow.com.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Questions About These Terms?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If you have any questions about these terms or need clarification on any provision, we're here to help.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Mail" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Legal Questions
              </h3>
              <p className="text-gray-600 mb-4">
                For legal or terms-related questions
              </p>
              <a
                href="mailto:legal@eduflow.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                legal@eduflow.com
              </a>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="HelpCircle" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                General Support
              </h3>
              <p className="text-gray-600 mb-4">
                For general questions and support
              </p>
              <a
                href="mailto:support@eduflow.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                support@eduflow.com
              </a>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Phone" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-4">
                Speak with our team directly
              </p>
              <a
                href="tel:+15551234567"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                +1 (555) 123-4567
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;