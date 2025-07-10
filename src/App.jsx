import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import HomePage from "@/components/pages/HomePage";
import CourseListPage from "@/components/pages/CourseListPage";
import CourseDetailPage from "@/components/pages/CourseDetailPage";
import LessonPage from "@/components/pages/LessonPage";
import StudentDashboard from "@/components/pages/StudentDashboard";
import InstructorDashboard from "@/components/pages/InstructorDashboard";
import QuizPage from "@/components/pages/QuizPage";
import ProfilePage from "@/components/pages/ProfilePage";

// Company Pages
import AboutPage from "@/components/pages/AboutPage";
import CareersPage from "@/components/pages/CareersPage";
import PressPage from "@/components/pages/PressPage";
import ContactPage from "@/components/pages/ContactPage";

// Learn Pages
import CategoriesPage from "@/components/pages/CategoriesPage";
import ResourcesPage from "@/components/pages/ResourcesPage";

// Support Pages
import HelpPage from "@/components/pages/HelpPage";
import CommunityPage from "@/components/pages/CommunityPage";
import StatusPage from "@/components/pages/StatusPage";
import ReportPage from "@/components/pages/ReportPage";

// Legal Pages
import PrivacyPage from "@/components/pages/PrivacyPage";
import TermsPage from "@/components/pages/TermsPage";
import CookiesPage from "@/components/pages/CookiesPage";
import AccessibilityPage from "@/components/pages/AccessibilityPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
<Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CourseListPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/courses/:courseId/quiz/:quizId" element={<QuizPage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/teaching" element={<InstructorDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Company Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Learn Pages */}
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            
            {/* Support Pages */}
            <Route path="/help" element={<HelpPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/report" element={<ReportPage />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
          </Routes>
        </motion.div>
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;