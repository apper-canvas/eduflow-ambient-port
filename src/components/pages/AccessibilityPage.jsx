import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AccessibilityPage() {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <h1 className="text-4xl font-bold font-display gradient-text mb-4">
            Accessibility Statement
          </h1>
          <p className="text-gray-600 text-lg">
            EduFlow is committed to ensuring digital accessibility for people with disabilities.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Our Commitment */}
          <motion.section
            className="card p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Our Commitment to Accessibility
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                EduFlow is committed to ensuring that our website and learning platform are accessible 
                to all users, including those with disabilities. We strive to meet the Web Content 
                Accessibility Guidelines (WCAG) 2.1 Level AA standards and continuously work to improve 
                the accessibility of our platform.
              </p>
              <p className="text-gray-700">
                We believe that education should be accessible to everyone, regardless of their 
                abilities or disabilities. Our goal is to provide an inclusive learning environment 
                that empowers all learners to achieve their educational goals.
              </p>
            </div>
          </motion.section>

          {/* Accessibility Features */}
          <motion.section
            className="card p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">
              Accessibility Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Accessibility</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• High contrast color schemes</li>
                  <li>• Scalable text and interface elements</li>
                  <li>• Alternative text for images</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader compatibility</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Support</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Closed captions for video content</li>
                  <li>• Audio transcripts</li>
                  <li>• Adjustable playback speeds</li>
                  <li>• Clear navigation structure</li>
                  <li>• Consistent page layouts</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Standards and Guidelines */}
          <motion.section
            className="card p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Standards and Guidelines
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Our accessibility efforts are guided by the following standards and guidelines:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                <li>Section 508 of the Rehabilitation Act</li>
                <li>Americans with Disabilities Act (ADA) compliance</li>
                <li>European Accessibility Act (EAA) standards</li>
              </ul>
            </div>
          </motion.section>

          {/* Browser and Assistive Technology */}
          <motion.section
            className="card p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Supported Technologies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Browsers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Chrome (latest version)</li>
                  <li>• Firefox (latest version)</li>
                  <li>• Safari (latest version)</li>
                  <li>• Edge (latest version)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Assistive Technologies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• NVDA (Windows)</li>
                  <li>• JAWS (Windows)</li>
                  <li>• VoiceOver (macOS/iOS)</li>
                  <li>• TalkBack (Android)</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Known Issues */}
          <motion.section
            className="card p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Known Issues and Limitations
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                We are continuously working to improve accessibility. Currently known issues include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Some third-party embedded content may not be fully accessible</li>
                <li>Complex interactive elements are being enhanced for better screen reader support</li>
                <li>Mobile accessibility features are being optimized</li>
              </ul>
              <p className="text-gray-700">
                We are actively working to address these issues and appreciate your patience as we 
                continue to improve our platform.
              </p>
            </div>
          </motion.section>

          {/* Feedback and Contact */}
          <motion.section
            className="card p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
              Feedback and Support
            </h2>
            <div className="prose prose-gray max-w-none mb-6">
              <p className="text-gray-700">
                We welcome your feedback on the accessibility of EduFlow. If you encounter any 
                accessibility barriers or have suggestions for improvement, please contact us:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-primary-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">accessibility@eduflow.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Phone className="w-6 h-6 text-primary-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">1-800-EDUFLOW</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <MessageCircle className="w-6 h-6 text-primary-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Live Chat</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Last Updated */}
          <motion.div
            className="text-center text-gray-500 text-sm"
            variants={fadeInUp}
          >
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}