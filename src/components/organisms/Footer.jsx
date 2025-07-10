import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Footer = ({ className, ...props }) => {
  const footerLinks = {
    "Company": [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
    "Learn": [
      { name: "Browse Courses", href: "/courses" },
      { name: "Categories", href: "/categories" },
      { name: "Become an Instructor", href: "/teaching" },
      { name: "Student Resources", href: "/resources" },
    ],
    "Support": [
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "System Status", href: "/status" },
      { name: "Report Issue", href: "/report" },
    ],
    "Legal": [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  };

const socialLinks = [
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com/eduflow" },
    { name: "Facebook", icon: "Facebook", href: "https://facebook.com/eduflow" },
    { name: "Instagram", icon: "Instagram", href: "https://instagram.com/eduflow" },
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com/company/eduflow" },
    { name: "YouTube", icon: "Youtube", href: "https://youtube.com/eduflow" },
  ];
const [selectedLanguage, setSelectedLanguage] = React.useState("English");
  const [selectedCurrency, setSelectedCurrency] = React.useState("USD");
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = React.useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  ];

  return (
    <footer className={cn("bg-white border-t border-gray-200", className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="GraduationCap" size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                EduFlow
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-6">
              Empowering learners worldwide with quality education and expert instructors.
            </p>
            <div className="flex space-x-4">
{socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                  aria-label={social.name}
                >
                  <ApperIcon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-gray-900 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

<div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2024 EduFlow. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ApperIcon name="Globe" size={16} />
                <span>{selectedLanguage}</span>
                <ApperIcon name="ChevronDown" size={12} />
              </button>
              {showLanguageDropdown && (
                <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ApperIcon name="DollarSign" size={16} />
                <span>{selectedCurrency}</span>
                <ApperIcon name="ChevronDown" size={12} />
              </button>
              {showCurrencyDropdown && (
                <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[140px] z-10">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code);
                        setShowCurrencyDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {currency.symbol} {currency.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;