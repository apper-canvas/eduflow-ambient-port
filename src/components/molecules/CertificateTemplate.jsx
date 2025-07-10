import React from "react";
import { format } from "date-fns";
import { cn } from "@/utils/cn";

const CertificateTemplate = ({ 
  studentName, 
  courseTitle, 
  completionDate,
  className 
}) => {
  const formattedDate = format(new Date(completionDate), "MMMM dd, yyyy");

  return (
    <div className={cn(
      "bg-white p-12 border-8 border-double border-amber-600 rounded-lg shadow-lg print:shadow-none print:border-black",
      "aspect-[4/3] max-w-4xl mx-auto relative overflow-hidden",
      className
    )}>
      {/* Decorative Border Pattern */}
      <div className="absolute inset-4 border-2 border-amber-500 rounded-lg opacity-30"></div>
      <div className="absolute inset-6 border border-amber-400 rounded-lg opacity-20"></div>
      
      {/* Certificate Content */}
      <div className="relative z-10 text-center h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl text-gray-800 mb-2">
            Certificate of Completion
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </div>
        
        {/* Main Content */}
        <div className="mb-8 space-y-6">
          <p className="text-lg text-gray-600 font-medium">
            This certifies that
          </p>
          
          <div className="mb-6">
            <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
              {studentName}
            </h2>
            <div className="w-48 h-0.5 bg-gray-400 mx-auto"></div>
          </div>
          
          <p className="text-lg text-gray-600 font-medium">
            has successfully completed the course
          </p>
          
          <div className="mb-6">
            <h3 className="font-display font-semibold text-2xl text-primary-700 mb-2">
              {courseTitle}
            </h3>
            <div className="w-64 h-0.5 bg-gray-400 mx-auto"></div>
          </div>
          
          <p className="text-lg text-gray-600 font-medium">
            on {formattedDate}
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-8">
          <div className="flex justify-between items-end">
            <div className="text-center">
              <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
              <p className="text-sm text-gray-500">Date</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-0.5 bg-gray-400 mb-2"></div>
              <p className="text-sm text-gray-500">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-4 border-amber-500 rounded-full opacity-20"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-4 border-amber-500 rounded-full opacity-20"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 bg-amber-500 rounded-full opacity-10"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 bg-amber-500 rounded-full opacity-10"></div>
    </div>
  );
};

export default CertificateTemplate;