import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { Button } from "@/atoms/Button";
import { Card } from "@/atoms/Card";
import { Avatar } from "@/atoms/Avatar";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  const tabs = [
    { id: "discussions", name: "Discussions", icon: "MessageSquare" },
    { id: "events", name: "Events", icon: "Calendar" },
    { id: "achievements", name: "Achievements", icon: "Trophy" },
    { id: "groups", name: "Study Groups", icon: "Users" },
  ];

  const discussions = [
    {
      id: 1,
      title: "Best practices for React component optimization",
      author: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      replies: 23,
      likes: 45,
      category: "Web Development",
      timeAgo: "2 hours ago",
      isHot: true,
    },
    {
      id: 2,
      title: "How to prepare for data science interviews?",
      author: "Mike Johnson",
      avatar: "/api/placeholder/40/40",
      replies: 18,
      likes: 32,
      category: "Data Science",
      timeAgo: "4 hours ago",
      isHot: false,
    },
    {
      id: 3,
      title: "JavaScript ES6 features every developer should know",
      author: "Emily Rodriguez",
      avatar: "/api/placeholder/40/40",
      replies: 41,
      likes: 78,
      category: "Web Development",
      timeAgo: "1 day ago",
      isHot: true,
    },
    {
      id: 4,
      title: "Machine Learning project ideas for beginners",
      author: "David Park",
      avatar: "/api/placeholder/40/40",
      replies: 15,
      likes: 29,
      category: "Data Science",
      timeAgo: "1 day ago",
      isHot: false,
    },
  ];

  const events = [
    {
      id: 1,
      title: "Web Development Bootcamp Graduation",
      date: "March 25, 2024",
      time: "2:00 PM EST",
      attendees: 142,
      type: "Virtual",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Data Science Career Fair",
      date: "March 28, 2024",
      time: "10:00 AM EST",
      attendees: 89,
      type: "Virtual",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "UI/UX Design Workshop",
      date: "April 2, 2024",
      time: "3:00 PM EST",
      attendees: 67,
      type: "Virtual",
      image: "/api/placeholder/300/200",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "JavaScript Master",
      description: "Completed 10 JavaScript courses",
      icon: "Code",
      rarity: "Legendary",
      earnedBy: 234,
    },
    {
      id: 2,
      title: "Community Helper",
      description: "Answered 50 questions in forums",
      icon: "HelpCircle",
      rarity: "Epic",
      earnedBy: 567,
    },
    {
      id: 3,
      title: "Speed Learner",
      description: "Completed a course in under 24 hours",
      icon: "Zap",
      rarity: "Rare",
      earnedBy: 1234,
    },
    {
      id: 4,
      title: "Perfect Score",
      description: "Scored 100% on 5 quizzes",
      icon: "Target",
      rarity: "Epic",
      earnedBy: 456,
    },
  ];

  const studyGroups = [
    {
      id: 1,
      name: "React Developers Circle",
      members: 1247,
      description: "A community for React developers to share knowledge and collaborate on projects.",
      category: "Web Development",
      isActive: true,
    },
    {
      id: 2,
      name: "Data Science Study Group",
      members: 892,
      description: "Weekly discussions on data science topics, algorithms, and career guidance.",
      category: "Data Science",
      isActive: true,
    },
    {
      id: 3,
      name: "UI/UX Design Collective",
      members: 634,
      description: "Share your designs, get feedback, and learn from experienced designers.",
      category: "Design",
      isActive: false,
    },
    {
      id: 4,
      name: "Python Programming Hub",
      members: 1089,
      description: "From beginners to advanced Python developers, all levels welcome.",
      category: "Programming",
      isActive: true,
    },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Legendary": return "from-yellow-400 to-orange-500";
      case "Epic": return "from-purple-400 to-pink-500";
      case "Rare": return "from-blue-400 to-cyan-500";
      default: return "from-gray-400 to-gray-500";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "discussions":
        return (
          <div className="space-y-6">
            {discussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar src={discussion.avatar} alt={discussion.author} size="md" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-display font-semibold text-gray-900 text-lg">
                              {discussion.title}
                            </h3>
                            {discussion.isHot && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                🔥 Hot
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>by {discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.timeAgo}</span>
                            <span>•</span>
                            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                              {discussion.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <ApperIcon name="MessageSquare" size={16} />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ApperIcon name="Heart" size={16} />
                              <span>{discussion.likes} likes</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Join Discussion
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case "events":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Calendar" size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Clock" size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Users" size={16} />
                        <span>{event.attendees} attending</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Monitor" size={16} />
                        <span>{event.type}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Join Event
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case "achievements":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center mx-auto mb-4`}>
                    <ApperIcon name={achievement.icon} size={32} className="text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      achievement.rarity === "Legendary" ? "bg-yellow-100 text-yellow-800" :
                      achievement.rarity === "Epic" ? "bg-purple-100 text-purple-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {achievement.earnedBy} earned
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case "groups":
        return (
          <div className="space-y-6">
            {studyGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-display font-semibold text-gray-900 text-lg">
                          {group.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-sm text-gray-600">
                            {group.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ApperIcon name="Users" size={16} />
                          <span>{group.members.toLocaleString()} members</span>
                        </div>
                        <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                          {group.category}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline">
                      {group.isActive ? 'Join Group' : 'View Group'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
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
              Join Our Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with fellow learners, share knowledge, and grow together in our vibrant learning community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Start Discussing
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Browse Groups
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">125+</div>
              <div className="text-gray-600">Study Groups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">2.5K</div>
              <div className="text-gray-600">Weekly Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ApperIcon name={tab.icon} size={20} />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto">
            {renderContent()}
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
              Ready to Join the Conversation?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Start connecting with fellow learners and expand your knowledge through community discussions.
            </p>
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Create Account
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;