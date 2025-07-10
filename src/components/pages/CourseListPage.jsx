import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import SearchBar from "@/components/molecules/SearchBar";
import FilterPanel from "@/components/molecules/FilterPanel";
import CourseGrid from "@/components/organisms/CourseGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { coursesService } from "@/services/api/coursesService";

const CourseListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All Categories",
    difficulty: "All Levels",
    price: "All Prices",
    duration: "All Durations",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterAndSortCourses();
  }, [courses, searchQuery, filters, sortBy]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await coursesService.getAll();
      setCourses(data);
    } catch (err) {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCourses = () => {
    let filtered = [...courses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== "All Categories") {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Apply difficulty filter
    if (filters.difficulty && filters.difficulty !== "All Levels") {
      filtered = filtered.filter(course => course.difficulty === filters.difficulty.toLowerCase());
    }

    // Apply price filter
    if (filters.price && filters.price !== "All Prices") {
      if (filters.price === "Free") {
        filtered = filtered.filter(course => course.price === 0);
      } else if (filters.price === "Paid") {
        filtered = filtered.filter(course => course.price > 0);
      }
    }

    // Apply duration filter
    if (filters.duration && filters.duration !== "All Durations") {
      filtered = filtered.filter(course => {
        const duration = parseInt(course.duration);
        switch (filters.duration) {
          case "0-2 hours":
            return duration <= 2;
          case "2-6 hours":
            return duration > 2 && duration <= 6;
          case "6-12 hours":
            return duration > 6 && duration <= 12;
          case "12+ hours":
            return duration > 12;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: "All Categories",
      difficulty: "All Levels",
      price: "All Prices",
      duration: "All Durations",
    });
    setSearchQuery("");
    setSearchParams({});
  };

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              All Courses
            </h1>
            <p className="text-xl text-gray-600">
              Discover your next learning adventure from our extensive course library.
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <SearchBar
            placeholder="Search courses, instructors, or topics..."
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-xl shadow-soft p-4 mb-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {filteredCourses.length} courses found
                  </span>
                  {(searchQuery || Object.values(filters).some(v => v && !v.startsWith("All"))) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <ApperIcon name="X" size={16} className="mr-1" />
                      Clear all
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Sort by:</label>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-40"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "rounded-r-none border-r border-gray-300",
                        viewMode === "grid" && "bg-primary-100 text-primary-600"
                      )}
                    >
                      <ApperIcon name="Grid3X3" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "rounded-l-none",
                        viewMode === "list" && "bg-primary-100 text-primary-600"
                      )}
                    >
                      <ApperIcon name="List" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Course Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {loading ? (
                <Loading type="skeleton" />
              ) : error ? (
                <Error
                  title="Failed to load courses"
                  message={error}
                  onRetry={loadCourses}
                />
              ) : filteredCourses.length === 0 ? (
                <Empty
                  title="No courses found"
                  message="Try adjusting your search or filters to find what you're looking for."
                  icon="Search"
                  action={{
                    label: "Clear Filters",
                    onClick: handleClearFilters,
                    icon: "RefreshCw"
                  }}
                />
              ) : (
                <CourseGrid
                  courses={filteredCourses}
                  className={cn(
                    viewMode === "list" && "grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
                  )}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListPage;