import React, { useState } from "react";
import {
  GraduationCap,
  ChevronRight,
  Heart,
  BookmarkCheck,
  Search,
  Award,
  ExternalLink,
} from "lucide-react";

const HigherStudies = ({ studyOptions }) => {
  const [savedStudyOptions, setSavedStudyOptions] = useState([]);
  const [expandedStudy, setExpandedStudy] = useState(null);

  // Study details database
  const studyDetailsMap = {
    "Master's in Computer Science": {
      duration: "2 years",
      /*************  ✨ Windsurf Command ⭐  *************/
      /**
       * Toggle the expanded study option with the given index.
       * If the index is already expanded, it will be set to null.
       * If the index is not expanded, it will be set to the given index.
       * @param {number} index - The index of the study option to toggle.
       */
      /*******  a39c54a9-cb90-4b04-a7f1-f045950b77e2  *******/ avgCost:
        "$20k-$50k",
      topUniversities: ["Stanford", "MIT", "Carnegie Mellon", "UC Berkeley"],
      careers: [
        "Software Architect",
        "ML Engineer",
        "Research Scientist",
        "Tech Lead",
      ],
      requirements: "Bachelor's in CS, GRE scores (310+), 3.0+ GPA, LORs",
    },
    "Data Science Specialization": {
      duration: "1-2 years",
      avgCost: "$15k-$40k",
      topUniversities: ["UC Berkeley", "Harvard", "Columbia", "Stanford"],
      careers: [
        "Data Scientist",
        "AI Engineer",
        "Analytics Manager",
        "ML Researcher",
      ],
      requirements:
        "Bachelor's degree, Math/Stats background, Programming skills",
    },
    "Cloud Computing Certification (AWS/Azure)": {
      duration: "3-6 months",
      avgCost: "$300-$2k",
      topPlatforms: [
        "AWS Training",
        "Microsoft Learn",
        "Google Cloud",
        "Linux Academy",
      ],
      careers: [
        "Cloud Engineer",
        "DevOps Engineer",
        "Solutions Architect",
        "Cloud Consultant",
      ],
      requirements: "Basic programming, Networking knowledge, Linux basics",
    },
    "Artificial Intelligence & Machine Learning": {
      duration: "1-2 years",
      avgCost: "$25k-$60k",
      topUniversities: ["MIT", "Stanford", "CMU", "Oxford"],
      careers: [
        "AI Researcher",
        "ML Engineer",
        "Computer Vision Engineer",
        "NLP Specialist",
      ],
      requirements:
        "Strong Math/Stats, Programming, Bachelor's in CS/related field",
    },
    "MBA (Marketing/Finance/Strategy)": {
      duration: "2 years",
      avgCost: "$50k-$150k",
      topUniversities: ["Harvard", "Wharton", "Stanford GSB", "INSEAD"],
      careers: ["Product Manager", "Business Consultant", "VP Strategy", "COO"],
      requirements:
        "Bachelor's degree, GMAT/GRE (700+), 2+ years work experience",
    },
    "Digital Marketing Certification": {
      duration: "3-6 months",
      avgCost: "$0-$2k",
      topPlatforms: [
        "Google Digital Garage",
        "HubSpot Academy",
        "Facebook Blueprint",
        "Coursera",
      ],
      careers: [
        "Marketing Manager",
        "Digital Strategist",
        "Growth Hacker",
        "SEO Specialist",
      ],
      requirements: "Basic marketing understanding, Analytical mindset",
    },
    "Data Analytics for Business": {
      duration: "6-12 months",
      avgCost: "$5k-$20k",
      topPlatforms: ["Google Analytics", "Tableau", "IBM", "Microsoft"],
      careers: [
        "Business Analyst",
        "Data Analyst",
        "Analytics Consultant",
        "BI Developer",
      ],
      requirements: "Excel proficiency, Basic SQL, Business acumen",
    },
    "CFA/FRM Certification": {
      duration: "2-4 years",
      avgCost: "$3k-$5k",
      topPlatforms: ["CFA Institute", "GARP (FRM)"],
      careers: [
        "Financial Analyst",
        "Portfolio Manager",
        "Risk Manager",
        "Investment Banker",
      ],
      requirements: "Bachelor's degree, 4 years work experience, Pass 3 levels",
    },
    "UX Design Certification": {
      duration: "6-12 months",
      avgCost: "$500-$5k",
      topPlatforms: [
        "Google UX Certificate",
        "Nielsen Norman Group",
        "IDF",
        "General Assembly",
      ],
      careers: [
        "Senior UX Designer",
        "Product Designer",
        "UX Manager",
        "UX Researcher",
      ],
      requirements: "Portfolio, Basic design knowledge, User empathy",
    },
    "Master's in Design (MDes)": {
      duration: "2 years",
      avgCost: "$30k-$70k",
      topUniversities: ["RISD", "Parsons", "RCA", "Stanford d.school"],
      careers: [
        "Creative Director",
        "Design Lead",
        "Innovation Consultant",
        "Design Strategist",
      ],
      requirements: "Bachelor's in Design, Portfolio, Statement of Purpose",
    },
    "Human-Computer Interaction": {
      duration: "1-2 years",
      avgCost: "$25k-$55k",
      topUniversities: ["CMU", "Stanford", "MIT", "Georgia Tech"],
      careers: [
        "UX Researcher",
        "Interaction Designer",
        "Product Designer",
        "HCI Specialist",
      ],
      requirements: "Design/CS background, Portfolio, Research experience",
    },
    "Master's in Your Field of Interest": {
      duration: "1-2 years",
      avgCost: "Varies",
      topUniversities: ["Research top programs in your field"],
      careers: [
        "Specialist in your domain",
        "Research positions",
        "Academic roles",
      ],
      requirements: "Bachelor's degree, Good GPA, Field-specific prerequisites",
    },
    "Professional Certifications": {
      duration: "3-12 months",
      avgCost: "$500-$5k",
      topPlatforms: ["Coursera", "edX", "Udacity", "LinkedIn Learning"],
      careers: ["Certified professional in chosen field", "Specialized roles"],
      requirements: "Varies by certification, Often work experience",
    },
    "Skill-based Online Courses": {
      duration: "1-6 months",
      avgCost: "$0-$1k",
      topPlatforms: ["Coursera", "Udemy", "edX", "freeCodeCamp"],
      careers: ["Entry to mid-level positions", "Freelance opportunities"],
      requirements: "Self-motivation, Internet access, Time commitment",
    },
  };

  // Get study details or return defaults
  const getStudyDetails = (option) => {
    return (
      studyDetailsMap[option] || {
        duration: "1-2 years",
        avgCost: "Varies",
        topUniversities: ["Research programs online"],
        topPlatforms: ["Check popular platforms"],
        careers: ["Various career opportunities"],
        requirements: "Bachelor's degree or equivalent",
      }
    );
  };

  const toggleSaveStudy = (option) => {
    setSavedStudyOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((opt) => opt !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const isSavedStudy = (option) => savedStudyOptions.includes(option);

  const toggleExpandStudy = (index) => {
    setExpandedStudy(expandedStudy === index ? null : index);
  };

  const searchPrograms = (option) => {
    const query = encodeURIComponent(option + " programs universities");
    window.open(
      `https://www.google.com/search?q=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const searchScholarships = (option) => {
    const query = encodeURIComponent(
      option + " scholarships international students"
    );
    window.open(
      `https://www.google.com/search?q=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyToClipboard = () => {
    const text = savedStudyOptions.join("\n");
    navigator.clipboard.writeText(text);
    alert("✅ Copied to clipboard!");
  };

  const downloadList = () => {
    const text = `My Saved Study Options\n${"=".repeat(
      30
    )}\n\n${savedStudyOptions.join("\n\n")}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-study-options.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!studyOptions || studyOptions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-purple-600" />
          Higher Studies Options
        </h2>
        {savedStudyOptions.length > 0 && (
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <BookmarkCheck className="w-4 h-4" />
            {savedStudyOptions.length} Saved
          </span>
        )}
      </div>

      {/* Study Options List */}
      <div className="space-y-4">
        {studyOptions.map((option, idx) => {
          const details = getStudyDetails(option);
          const isExpanded = expandedStudy === idx;
          const isSaved = isSavedStudy(option);

          return (
            <div
              key={idx}
              className={`border-2 rounded-lg transition-all ${
                isSaved
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Main Option Header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      <ChevronRight
                        className={`w-5 h-5 text-purple-600 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {option}
                      </h3>

                      {/* Quick Info */}
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          ⏱️ {details.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          💰 {details.avgCost}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleExpandStudy(idx)}
                          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-semibold"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </button>

                        <button
                          onClick={() => toggleSaveStudy(option)}
                          className={`px-4 py-2 rounded-lg transition-all text-sm font-semibold flex items-center gap-2 ${
                            isSaved
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`}
                          />
                          {isSaved ? "Saved" : "Save"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                    {/* Top Universities/Platforms */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        🏆{" "}
                        {details.topUniversities
                          ? "Top Universities"
                          : "Top Platforms"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(
                          details.topUniversities ||
                          details.topPlatforms ||
                          []
                        ).map((name, i) => (
                          <span
                            key={i}
                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Career Outcomes */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        💼 Career Outcomes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {details.careers.map((career, i) => (
                          <span
                            key={i}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                          >
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        📋 Requirements
                      </h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                        {details.requirements}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => searchPrograms(option)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Search Programs
                      </button>

                      <button
                        onClick={() => searchScholarships(option)}
                        className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        Find Scholarships
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Saved Study Options Summary */}
      {savedStudyOptions.length > 0 && (
        <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-blue-600" />
            Your Saved Study Options ({savedStudyOptions.length})
          </h3>
          <div className="space-y-2">
            {savedStudyOptions.map((option, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-800 font-medium text-sm">
                  {option}
                </span>
                <button
                  onClick={() => toggleSaveStudy(option)}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Export Options */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Copy List
            </button>

            <button
              onClick={downloadList}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
            >
              💾 Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HigherStudies;
