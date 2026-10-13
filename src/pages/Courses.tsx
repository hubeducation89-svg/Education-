import { COURSES } from "../data";
import { Link } from "react-router-dom";
import { CheckCircle, Clock } from "lucide-react";
import { SEO } from "../components/SEO";

export function Courses() {
  return (
    <div className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen pb-24 md:pb-16">
      <SEO title="Courses" />
      <div className="text-center mb-8 sm:mb-16">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f2147] mb-2 sm:mb-4">Our Courses</h1>
        <p className="text-xs sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our range of practical and skill-based courses designed to help you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        <div className="lg:col-span-2 space-y-8">
          {COURSES.map((course, index) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row">
              {course.image && (
                <div className="sm:w-1/3 bg-gray-100 flex-shrink-0">
                  <img src={course.image} alt={`${course.title} free video course by Education Hub by GUNJAN GAUR`} className="w-full h-48 sm:h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {course.title}
                  </h3>
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 hidden sm:block">
                    <course.icon className="w-5 h-5 " />
                  </div>
                </div>
                <p className="text-gray-600 mb-4 flex-1">{course.description}</p>
                
                {course.duration && (
                  <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Duration: <span className="font-medium text-gray-800">{course.duration}</span></span>
                  </div>
                )}
                
                <div>
                  <Link to={`/dashboard/course/${course.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Start Learning &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Why Students Choose Us</h3>
            <ul className="space-y-4">
              {[
                "Practical Learning",
                "Easy Language Teaching",
                "Career-Focused Skills",
                "Beginner Friendly",
                "Real Projects",
                "Certificates Available"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link to="/contact" className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors">
                Contact For Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
