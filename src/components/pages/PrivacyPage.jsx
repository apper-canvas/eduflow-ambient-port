import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Card } from "@/atoms/Card";

const PrivacyPage = () => {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support.",
        "Personal information may include your name, email address, phone number, payment information, and profile details.",
        "We also collect information about your use of our services, including course progress, quiz results, and interaction with course materials.",
        "Technical information is automatically collected, including your IP address, browser type, device information, and usage patterns."
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our educational services and platform functionality.",
        "To process transactions, send receipts, and manage your account and subscriptions.",
        "To communicate with you about courses, updates, and promotional offers (with your consent).",
        "To personalize your learning experience and recommend relevant courses and content.",
        "To analyze usage patterns and improve our services, including developing new features.",
        "To detect, prevent, and address technical issues, fraud, and other security concerns."
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share your information with service providers who help us operate our platform (payment processors, hosting providers, etc.).",
        "Course instructors may see aggregated and anonymized data about student progress and engagement.",
        "We may disclose your information if required by law, regulation, or legal process.",
        "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction."
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal information.",
        "Your data is encrypted in transit and at rest using industry-standard encryption protocols.",
        "We regularly review and update our security practices to protect against unauthorized access, alteration, disclosure, or destruction.",
        "While we strive to protect your personal information, no method of transmission over the internet is 100% secure.",
        "We recommend using strong, unique passwords and enabling two-factor authentication when available."
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      content: [
        "You have the right to access, update, or delete your personal information at any time through your account settings.",
        "You can opt out of marketing communications by clicking the unsubscribe link in emails or updating your preferences.",
        "You may request a copy of your personal data or ask us to delete your account entirely.",
        "If you're in the EU, you have additional rights under GDPR, including the right to data portability and restriction of processing.",
        "You can contact us at privacy@eduflow.com to exercise any of these rights or ask questions about our privacy practices."
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      content: [
        "We use cookies and similar technologies to enhance your experience and analyze usage patterns.",
        "Essential cookies are necessary for the platform to function properly and cannot be disabled.",
        "Analytics cookies help us understand how you use our services and improve the user experience.",
        "You can control cookie preferences through your browser settings, though some features may not work properly if cookies are disabled.",
        "We do not use cookies for targeted advertising, but we may use them for remarketing purposes."
      ]
    },
    {
      id: "children",
      title: "Children's Privacy",
      content: [
        "Our services are not intended for children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If you believe we have collected information from a child under 13, please contact us immediately.",
        "Users between 13 and 18 should have parental consent before using our services.",
        "We encourage parents to monitor their children's online activities and educate them about sharing personal information safely."
      ]
    },
    {
      id: "international",
      title: "International Data Transfers",
      content: [
        "Your information may be transferred to and processed in countries other than your own.",
        "We ensure appropriate safeguards are in place when transferring data internationally.",
        "For EU residents, we comply with GDPR requirements for international data transfers.",
        "We may use Standard Contractual Clauses or other approved transfer mechanisms.",
        "By using our services, you consent to the transfer of your information as described in this policy."
      ]
    },
    {
      id: "retention",
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as necessary to provide our services and fulfill legal obligations.",
        "Account information is retained until you delete your account or request deletion.",
        "Course progress and completion data may be retained for certification and record-keeping purposes.",
        "Payment information is retained as required by law and for fraud prevention.",
        "We may retain anonymized or aggregated data indefinitely for analytical purposes."
      ]
    },
    {
      id: "updates",
      title: "Policy Updates",
      content: [
        "We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.",
        "We will notify you of any material changes by email or by posting a notice on our platform.",
        "Your continued use of our services after any changes constitutes acceptance of the updated policy.",
        "We encourage you to review this policy periodically to stay informed about how we protect your information.",
        "The effective date of this policy is listed at the top of this page."
      ]
    }
  ];

  const quickLinks = [
    { id: "information-collection", title: "Information Collection" },
    { id: "information-use", title: "How We Use Information" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "data-security", title: "Data Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "cookies", title: "Cookies" },
    { id: "children", title: "Children's Privacy" },
    { id: "international", title: "International Transfers" },
    { id: "retention", title: "Data Retention" },
    { id: "updates", title: "Policy Updates" },
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
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
              Questions About Privacy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If you have any questions about this privacy policy or our data practices, we're here to help.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Mail" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Email Us
              </h3>
              <p className="text-gray-600 mb-4">
                For privacy-related questions
              </p>
              <a
                href="mailto:privacy@eduflow.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                privacy@eduflow.com
              </a>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="FileText" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Data Request
              </h3>
              <p className="text-gray-600 mb-4">
                Request your personal data
              </p>
              <a
                href="mailto:data@eduflow.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                data@eduflow.com
              </a>
            </Card>
            
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Shield" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Security Issues
              </h3>
              <p className="text-gray-600 mb-4">
                Report security concerns
              </p>
              <a
                href="mailto:security@eduflow.com"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                security@eduflow.com
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Your Privacy Matters
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              We're committed to protecting your privacy and being transparent about how we handle your data. 
              Thank you for trusting us with your information.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;