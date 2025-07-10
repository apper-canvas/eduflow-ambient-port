import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Passionate learner and developer with a keen interest in web technologies.",
    location: "New York, NY",
    website: "https://johndoe.com",
    twitter: "@johndoe",
    linkedin: "johndoe",
    github: "johndoe",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    courseUpdates: true,
    marketingEmails: false,
    language: "en",
    timezone: "America/New_York",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Preferences updated successfully!");
    } catch (err) {
      toast.error("Failed to update preferences. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "preferences", label: "Preferences", icon: "Settings" },
    { id: "security", label: "Security", icon: "Shield" },
    { id: "billing", label: "Billing", icon: "CreditCard" },
  ];

  const achievements = [
    { id: 1, name: "First Course", description: "Completed your first course", date: "2024-01-15", icon: "Award" },
    { id: 2, name: "Quick Learner", description: "Completed 5 courses in 30 days", date: "2024-01-20", icon: "Zap" },
    { id: 3, name: "JavaScript Master", description: "Mastered JavaScript fundamentals", date: "2024-01-25", icon: "Code" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 mb-6">
              <div className="text-center mb-6">
                <Avatar
                  src=""
                  alt={profileData.name}
                  size="2xl"
                  fallback={profileData.name.charAt(0)}
                  className="mx-auto mb-4"
                />
                <h3 className="font-display font-semibold text-lg text-gray-900">
                  {profileData.name}
                </h3>
                <p className="text-sm text-gray-600">{profileData.email}</p>
                <Badge variant="primary" className="mt-2">
                  Student
                </Badge>
              </div>
              
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <ApperIcon name="Camera" size={16} />
                Change Photo
              </Button>
            </Card>

            <Card className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Courses Completed</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hours Learned</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certificates</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {/* Tabs */}
              <div className="mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                          activeTab === tab.id
                            ? "border-primary-500 text-primary-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        )}
                      >
                        <ApperIcon name={tab.icon} size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "profile" && (
                <Card className="p-8">
                  <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                    Profile Information
                  </h2>
                  
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Full Name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                      />
                      
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <FormField
                      label="Bio"
                      name="bio"
                      type="textarea"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Location"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        placeholder="City, State"
                      />
                      
                      <FormField
                        label="Website"
                        name="website"
                        type="url"
                        value={profileData.website}
                        onChange={handleProfileChange}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        label="Twitter"
                        name="twitter"
                        value={profileData.twitter}
                        onChange={handleProfileChange}
                        placeholder="@username"
                      />
                      
                      <FormField
                        label="LinkedIn"
                        name="linkedin"
                        value={profileData.linkedin}
                        onChange={handleProfileChange}
                        placeholder="username"
                      />
                      
                      <FormField
                        label="GitHub"
                        name="github"
                        value={profileData.github}
                        onChange={handleProfileChange}
                        placeholder="username"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        type="submit"
                        isLoading={saving}
                        className="flex items-center gap-2"
                      >
                        <ApperIcon name="Save" size={16} />
                        Save Changes
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {activeTab === "preferences" && (
                <Card className="p-8">
                  <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                    Preferences
                  </h2>
                  
                  <form onSubmit={handleSavePreferences} className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                          </div>
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={preferences.emailNotifications}
                            onChange={handlePreferencesChange}
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Course Updates</p>
                            <p className="text-sm text-gray-500">Get notified about course updates</p>
                          </div>
                          <input
                            type="checkbox"
                            name="courseUpdates"
                            checked={preferences.courseUpdates}
                            onChange={handlePreferencesChange}
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Marketing Emails</p>
                            <p className="text-sm text-gray-500">Receive promotional emails</p>
                          </div>
                          <input
                            type="checkbox"
                            name="marketingEmails"
                            checked={preferences.marketingEmails}
                            onChange={handlePreferencesChange}
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Language"
                        name="language"
                        type="select"
                        value={preferences.language}
                        onChange={handlePreferencesChange}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </FormField>
                      
                      <FormField
                        label="Timezone"
                        name="timezone"
                        type="select"
                        value={preferences.timezone}
                        onChange={handlePreferencesChange}
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </FormField>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        type="submit"
                        isLoading={saving}
                        className="flex items-center gap-2"
                      >
                        <ApperIcon name="Save" size={16} />
                        Save Preferences
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                      >
                        Reset to Default
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {activeTab === "security" && (
                <Card className="p-8">
                  <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                    Security Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Password</p>
                          <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Active Sessions</p>
                          <p className="text-sm text-gray-500">Manage your active sessions</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === "billing" && (
                <Card className="p-8">
                  <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                    Billing Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Payment Methods</p>
                          <p className="text-sm text-gray-500">Manage your payment methods</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Add Payment Method
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Billing History</p>
                          <p className="text-sm text-gray-500">View your payment history</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Subscription</p>
                          <p className="text-sm text-gray-500">Manage your subscription</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage Subscription
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Achievements */}
              <Card className="p-8 mt-8">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-6">
                  Achievements
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                          <ApperIcon name={achievement.icon} size={16} className="text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;