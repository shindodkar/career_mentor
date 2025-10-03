import React, { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Target,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Upload,
  Loader,
  Heart,
  ExternalLink,
} from "lucide-react";

import HigherStudies from "./higherStudies";
export default function CareerMentor() {
  const [step, setStep] = useState("input");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    field: "",
    skills: "",
    interests: "",
    experience: "",
    education: "",
    goals: "",
  });
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState("");
  const [likedResources, setLikedResources] = useState([]);

  const API_BASE_URL = "http://localhost:5000/api";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const analyzeCareer = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setRecommendations({
          jobRoles: result.data.jobRoles,
          studyOptions: result.data.higherStudies,
          roadmap: result.data.roadmap,
          resources: result.data.resources,
          confidence: result.data.confidence,
          skillGaps: result.data.skillGaps,
          insights: result.data.personalizedInsights,
        });
        setStep("results");
      } else {
        setError(result.error || "Failed to analyze career path");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Cannot connect to backend. Make sure server is running on port 5000!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const formDataFile = new FormData();
    formDataFile.append("resume", file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload-resume`, {
        method: "POST",
        body: formDataFile,
      });

      const result = await response.json();

      if (result.success) {
        // Pre-fill form with extracted data
        setFormData({
          field: result.extractedData.field || "",
          skills: result.extractedData.skills || "",
          interests: result.extractedData.interests || "",
          experience: result.extractedData.experience || "",
          education: result.extractedData.education || "",
          goals: result.extractedData.goals || "",
        });

        // Show results immediately
        setRecommendations({
          jobRoles: result.analysis.jobRoles,
          studyOptions: result.analysis.higherStudies,
          roadmap: result.analysis.roadmap,
          resources: result.analysis.resources,
          confidence: result.analysis.confidence,
          skillGaps: result.analysis.skillGaps,
          insights: result.analysis.personalizedInsights,
        });
        setStep("results");
      } else {
        setError(result.error || "Failed to process resume");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Cannot upload resume. Make sure backend is running!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("input");
    setFormData({
      field: "",
      skills: "",
      interests: "",
      experience: "",
      education: "",
      goals: "",
    });
    setRecommendations(null);
    setError("");
  };

  const toggleLike = (resourceName) => {
    setLikedResources((prev) => {
      if (prev.includes(resourceName)) {
        return prev.filter((name) => name !== resourceName);
      } else {
        return [...prev, resourceName];
      }
    });
  };

  const isLiked = (resourceName) => likedResources.includes(resourceName);

  const openResource = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              AI Career Mentor
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your personalized career guidance powered by AI
          </p>
        </div>

        {step === "input" && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Tell us about yourself
            </h2>

            {/* Resume Upload Option */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-dashed border-purple-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">
                    Quick Start: Upload Resume
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Upload your resume (PDF/DOCX) and we'll auto-fill your details!
              </p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  disabled={loading}
                />
                <div className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {loading ? "Processing..." : "Choose File"}
                </div>
              </label>
            </div>

            <div className="text-center mb-6 text-gray-500 text-sm font-semibold">
              OR FILL MANUALLY
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Field of Study / Career Interest *
                </label>
                <input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Business, Design, Engineering"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Skills *
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, JavaScript, Data Analysis, Communication, Leadership"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Interests & Passions
                </label>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="e.g., Building apps, Solving problems, Creative design, Teaching"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience & Projects
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., Internships, freelance work, personal projects, hackathons"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Education Level
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="e.g., 3rd year Bachelor's, Recent graduate, Final semester"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Career Goals
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  placeholder="e.g., Land a job at a tech company, Start my own business, Pursue higher studies"
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={analyzeCareer}
                disabled={!formData.field || !formData.skills || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get My Career Roadmap
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === "results" && recommendations && (
          <div className="space-y-6">
            {/* Confidence Score
            {recommendations.confidence && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Analysis Confidence
                    </h3>
                    <p className="text-sm text-gray-600">
                      Based on your profile match
                    </p>
                  </div>
                  <div className="text-4xl font-bold text-green-600">
                    {recommendations.confidence}%
                  </div>
                </div>
              </div>
            )} */}

            {/* Personalized Insights */}
            {recommendations.insights &&
              recommendations.insights.length > 0 && (
                <div className="bg-blue-50 rounded-2xl shadow-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    💡 Personalized Insights
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.insights.map((insight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Job Roles */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-600" />
                Best Suited Job Roles
              </h2>
              <div className="space-y-4">
                {recommendations.jobRoles.map((job, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {job.title}
                      </h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.match}% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {job.description}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span>💰 {job.salary}</span>
                    </div>
                    {job.skills && (
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            {recommendations.skillGaps &&
              Object.keys(recommendations.skillGaps).length > 0 && (
                <div className="bg-yellow-50 rounded-2xl shadow-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    🎯 Skills to Develop
                  </h3>
                  {Object.entries(recommendations.skillGaps).map(
                    ([role, skills]) => (
                      <div key={role} className="mb-3">
                        <p className="font-semibold text-gray-700 mb-2">
                          {role}:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

            {/* Higher Studies */}

            <HigherStudies studyOptions={recommendations.studyOptions} />

            {/* Roadmap */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                Your Personalized Roadmap
              </h2>
              <div className="space-y-4">
                {recommendations.roadmap.map((phase, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-purple-500 pl-6 py-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                        {phase.month}
                      </span>
                      <span className="text-sm text-gray-600">
                        {phase.hours}
                      </span>
                    </div>
                    <p className="text-gray-800 font-semibold mb-2">
                      {phase.focus}
                    </p>
                    {phase.tasks && (
                      <ul className="space-y-1 ml-4">
                        {phase.tasks.map((task, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-purple-600">•</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Free Resources */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  Free Learning Resources
                </h2>
                {likedResources.length > 0 && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {likedResources.length} Saved
                  </span>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendations.resources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all hover:border-purple-300 relative"
                  >
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(resource.name)}
                      className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title={
                        isLiked(resource.name)
                          ? "Remove from saved"
                          : "Save resource"
                      }
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isLiked(resource.name)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    <div className="mb-3 pr-8">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        {resource.name}
                      </h3>
                      <p className="text-sm text-gray-600">{resource.type}</p>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      {resource.rating && (
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          ⭐{" "}
                          <span className="font-semibold">
                            {resource.rating}
                          </span>
                          /5
                        </span>
                      )}
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                        FREE
                      </span>
                    </div>

                    {/* Visit Button */}
                    <button
                      onClick={() => openResource(resource.url)}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Visit Resource</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Saved Resources Summary */}
              {likedResources.length > 0 && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    Your Saved Resources ({likedResources.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {likedResources.map((name, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-purple-200"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={resetForm}
              className="w-full bg-gray-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
