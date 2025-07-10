import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import CourseCard from "@/components/molecules/CourseCard";

const CourseGrid = ({ 
  courses,
  showProgress = false,
  loading = false,
  className,
  ...props 
}) => {
  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="aspect-video bg-gray-200 shimmer" />
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded shimmer" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 shimmer" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded shimmer" />
                <div className="h-3 bg-gray-200 rounded w-3/4 shimmer" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/3 shimmer" />
                <div className="h-4 bg-gray-200 rounded w-1/4 shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}
      {...props}
    >
      {courses.map((course, index) => (
        <motion.div
          key={course.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CourseCard
            course={course}
            showProgress={showProgress}
            progress={course.progress}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CourseGrid;