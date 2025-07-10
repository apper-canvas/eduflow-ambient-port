import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/atoms/Button";
import { Card } from "@/atoms/Card";

const CookiesPage = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const handleSavePreferences = () => {
    // Save preferences to localStorage or send to server
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    toast.success('Cookie preferences saved successfully!');
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    toast.success('All cookies accepted!');
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    toast.success('Non-essential cookies rejected!');
  };

  const cookieCategories = [
    {
      id: "essential",
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly and cannot be disabled.",
      required: true,
      examples: [
        "Authentication and security tokens",
        "Session management",
        "Load balancing",
        "CSRF protection",
        "Cookie consent preferences"
      ],
      retention: "Session or up to 1 year",
      icon: "Shield",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting information anonymously.",
      required: false,
      examples: [
        "Google Analytics",
        "Page view tracking",
        "User behavior analysis",
        "Performance monitoring",
        "Error tracking"
      ],
      retention: "Up to 2 years",
      icon: "BarChart3",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      description: "These cookies are used to deliver advertisements that are relevant to you and your interests.",
      required: false,
      examples: [
        "Ad personalization",
        "Conversion tracking",
        "Retargeting pixels",
        "Social media integration",
        "Email marketing optimization"
      ],
      retention: "Up to 1 year",
      icon: "Target",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "preferences",
      title: "Preference Cookies",
      description: "These cookies remember your preferences and settings to provide a personalized experience.",
      required: false,
      examples: [
        "Language preferences",
        "Theme settings",
        "Layout customizations",
        "Accessibility options",
        "Content preferences"
      ],
      retention: "Up to 1 year",
      icon: "Settings",
      color: "from-orange-500 to-red-500"
    }
  ];

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance tracking",
      category: "Analytics",
      privacy: "https://policies.google.com/privacy",
      optOut: "https://tools.google.com/dlpage/gaoptout"
    },
    {
      name: "Google Ads",
      purpose: "Advertisement delivery and conversion tracking",
      category: "Marketing",
      privacy: "https://policies.google.com/privacy",
      optOut: "https://adssettings.google.com/"
    },
    {
      name: "Facebook Pixel",
      purpose: "Social media advertising and analytics",
      category: "Marketing",
      privacy: "https://www.facebook.com/privacy/explanation",
      optOut: "https://www.facebook.com/settings?tab=ads"
    },
    {
      name: "Stripe",
      purpose: "Payment processing and fraud prevention",
      category: "Essential",
      privacy: "https://stripe.com/privacy",
      optOut: "Cannot be disabled"
    }
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
              Cookie Policy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Learn about how we use cookies and similar technologies to improve your experience on EduFlow.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span>Last updated: March 15, 2024</span>
              <span>•</span>
              <span>Effective date: March 15, 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Preferences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Cookie Preferences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Customize your cookie preferences below. You can change these settings at any time.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {cookieCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                        <ApperIcon name={category.icon} size={32} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-display font-semibold text-gray-900">
                            {category.title}
                          </h3>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={category.id}
                              checked={preferences[category.id]}
                              onChange={(e) => {
                                if (!category.required) {
                                  setPreferences(prev => ({
                                    ...prev,
                                    [category.id]: e.target.checked
                                  }));
                                }
                              }}
                              disabled={category.required}
                              className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500 disabled:opacity-50"
                            />
                            <label htmlFor={category.id} className="ml-2 text-sm text-gray-600">
                              {category.required ? "Always Active" : "Optional"}
                            </label>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {category.examples.map((example, exIndex) => (
                                <li key={exIndex} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Retention:</h4>
                            <p className="text-sm text-gray-600">{category.retention}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button onClick={handleAcceptAll} size="lg">
                Accept All Cookies
              </Button>
              <Button onClick={handleRejectAll} variant="outline" size="lg">
                Reject Non-Essential
              </Button>
              <Button onClick={handleSavePreferences} variant="secondary" size="lg">
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Third-Party Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use third-party services that may set cookies. Here's information about each service and how to opt out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-display font-semibold text-gray-900">
                      {service.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.category === "Essential" ? "bg-green-100 text-green-800" :
                      service.category === "Analytics" ? "bg-blue-100 text-blue-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {service.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{service.purpose}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={service.privacy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-gray-400">•</span>
                    {service.optOut === "Cannot be disabled" ? (
                      <span className="text-gray-500 text-sm">Cannot be disabled</span>
                    ) : (
                      <a
                        href={service.optOut}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Opt Out
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              What Are Cookies?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding cookies and how they work to improve your browsing experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Cookie" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                What They Are
              </h3>
              <p className="text-gray-600">
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Zap" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                How They Work
              </h3>
              <p className="text-gray-600">
                When you visit a website, the server sends a cookie to your browser. Your browser stores it and sends it back with future requests to the same site.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Shield" size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                Your Control
              </h3>
              <p className="text-gray-600">
                You can control cookies through your browser settings or our cookie preference center. You can block, delete, or manage cookies at any time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Browser Settings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Browser Settings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You can also manage cookies directly through your browser settings.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                    Desktop Browsers
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Globe" size={20} className="text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Chrome</div>
                        <div className="text-sm text-gray-600">Settings → Privacy and Security → Cookies</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Globe" size={20} className="text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Firefox</div>
                        <div className="text-sm text-gray-600">Options → Privacy & Security → Cookies</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Globe" size={20} className="text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Safari</div>
                        <div className="text-sm text-gray-600">Preferences → Privacy → Cookies</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Globe" size={20} className="text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Edge</div>
                        <div className="text-sm text-gray-600">Settings → Privacy → Cookies</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                    Mobile Browsers
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Smartphone" size={20} className="text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Chrome Mobile</div>
                        <div className="text-sm text-gray-600">Settings → Site Settings → Cookies</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Smartphone" size={20} className="text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Safari Mobile</div>
                        <div className="text-sm text-gray-600">Settings → Safari → Privacy & Security</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ApperIcon name="Smartphone" size={20} className="text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">Samsung Internet</div>
                        <div className="text-sm text-gray-600">Settings → Sites and downloads → Cookies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Questions About Cookies?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              If you have any questions about our use of cookies, please don't hesitate to contact us.
            </p>
            <a
              href="mailto:privacy@eduflow.com"
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <ApperIcon name="Mail" size={20} />
              privacy@eduflow.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPage;