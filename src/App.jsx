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