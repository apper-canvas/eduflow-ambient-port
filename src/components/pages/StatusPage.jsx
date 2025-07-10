import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Card } from "@/atoms/Card";

const StatusPage = () => {
  const [currentStatus, setCurrentStatus] = useState("operational");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Update timestamp every minute
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      name: "Web Application",
      status: "operational",
      description: "Main EduFlow platform and website",
      uptime: "99.9%",
      responseTime: "245ms",
    },
    {
      name: "API Services",
      status: "operational",
      description: "Course data and user management APIs",
      uptime: "99.8%",
      responseTime: "156ms",
    },
    {
      name: "Video Streaming",
      status: "operational",
      description: "Course video delivery and streaming",
      uptime: "99.7%",
      responseTime: "89ms",
    },
    {
      name: "Mobile App",
      status: "operational",
      description: "iOS and Android mobile applications",
      uptime: "99.6%",
      responseTime: "198ms",
    },
    {
      name: "Payment Processing",
      status: "operational",
      description: "Course purchases and subscription billing",
      uptime: "99.9%",
      responseTime: "134ms",
    },
    {
      name: "Email Notifications",
      status: "operational",
      description: "Course updates and system notifications",
      uptime: "99.5%",
      responseTime: "267ms",
    },
  ];

  const incidents = [
    {
      id: 1,
      title: "Resolved: Video playback issues on mobile devices",
      status: "resolved",
      date: "March 15, 2024",
      time: "14:30 UTC",
      description: "Some users experienced intermittent video playback issues on mobile devices. The issue has been resolved.",
      updates: [
        {
          time: "15:45 UTC",
          message: "Issue has been resolved. Video playback is now working normally on all mobile devices.",
        },
        {
          time: "15:20 UTC",
          message: "We have identified the cause and are deploying a fix. ETA: 15 minutes.",
        },
        {
          time: "14:30 UTC",
          message: "We are investigating reports of video playback issues on mobile devices.",
        },
      ],
    },
    {
      id: 2,
      title: "Resolved: Brief API response delays",
      status: "resolved",
      date: "March 10, 2024",
      time: "09:15 UTC",
      description: "API responses were slower than usual for approximately 20 minutes. All services are now operating normally.",
      updates: [
        {
          time: "09:35 UTC",
          message: "All API services are now responding normally. Performance has returned to baseline.",
        },
        {
          time: "09:15 UTC",
          message: "We are seeing increased API response times and are investigating the cause.",
        },
      ],
    },
    {
      id: 3,
      title: "Resolved: Scheduled maintenance completed",
      status: "resolved",
      date: "March 5, 2024",
      time: "02:00 UTC",
      description: "Scheduled maintenance was completed successfully with no impact to users.",
      updates: [
        {
          time: "04:00 UTC",
          message: "Maintenance completed successfully. All systems are operational.",
        },
        {
          time: "02:00 UTC",
          message: "Beginning scheduled maintenance. No user impact expected.",
        },
      ],
    },
  ];

  const metrics = [
    {
      name: "Overall Uptime",
      value: "99.8%",
      period: "Last 30 days",
      icon: "Activity",
      color: "text-green-600",
    },
    {
      name: "Average Response Time",
      value: "182ms",
      period: "Last 24 hours",
      icon: "Zap",
      color: "text-blue-600",
    },
    {
      name: "Active Users",
      value: "45.2K",
      period: "Current",
      icon: "Users",
      color: "text-purple-600",
    },
    {
      name: "Error Rate",
      value: "0.02%",
      period: "Last 7 days",
      icon: "AlertTriangle",
      color: "text-orange-600",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "text-green-600";
      case "degraded":
        return "text-yellow-600";
      case "partial":
        return "text-orange-600";
      case "major":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return "CheckCircle";
      case "degraded":
        return "AlertTriangle";
      case "partial":
        return "AlertCircle";
      case "major":
        return "XCircle";
      default:
        return "HelpCircle";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded Performance";
      case "partial":
        return "Partial Outage";
      case "major":
        return "Major Outage";
      default:
        return "Unknown";
    }
  };

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
              System Status
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Real-time status and performance metrics for all EduFlow services.
            </p>
            <div className="flex items-center justify-center gap-2">
              <ApperIcon name="CheckCircle" size={24} className="text-green-400" />
              <span className="text-lg">All systems operational</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Current Status
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <ApperIcon 
                name={getStatusIcon(currentStatus)} 
                size={32} 
                className={getStatusColor(currentStatus)} 
              />
              <span className="text-2xl font-display font-semibold text-gray-900">
                {getStatusText(currentStatus)}
              </span>
            </div>
            <p className="text-gray-600">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          </motion.div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <ApperIcon name={metric.icon} size={24} className={metric.color} />
                    </div>
                  </div>
                  <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{metric.name}</div>
                  <div className="text-xs text-gray-500">{metric.period}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Service Status
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed status and performance metrics for each of our services.
            </p>
          </motion.div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ApperIcon 
                        name={getStatusIcon(service.status)} 
                        size={24} 
                        className={getStatusColor(service.status)} 
                      />
                      <div>
                        <h3 className="font-display font-semibold text-gray-900 text-lg">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {service.uptime}
                        </div>
                        <div className="text-xs text-gray-500">Uptime</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {service.responseTime}
                        </div>
                        <div className="text-xs text-gray-500">Response Time</div>
                      </div>
                      <div className="text-right min-w-[120px]">
                        <span className={`text-sm font-medium ${getStatusColor(service.status)}`}>
                          {getStatusText(service.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Recent Incidents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Historical view of recent incidents and their resolutions.
            </p>
          </motion.div>

          <div className="space-y-8">
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <ApperIcon name="CheckCircle" size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display font-semibold text-gray-900 text-lg">
                            {incident.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{incident.date}</span>
                            <span>•</span>
                            <span>{incident.time}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Resolved
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{incident.description}</p>
                      <div className="space-y-3">
                        {incident.updates.map((update, updateIndex) => (
                          <div key={updateIndex} className="flex gap-3 text-sm">
                            <span className="text-gray-500 font-medium min-w-[80px]">
                              {update.time}
                            </span>
                            <span className="text-gray-700">{update.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Subscribe to status updates and be the first to know about any incidents or maintenance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe to Updates
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 rounded-lg font-medium transition-colors">
                RSS Feed
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StatusPage;