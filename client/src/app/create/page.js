"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Calendar as CalendarIcon, MapPin, Tag, Users, Type, AlignLeft } from "lucide-react";

export default function CreateEvent() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Meetup",
    maxParticipants: "",
    banner: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to create an event");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // Combine date and time
      const datetime = new Date(`${formData.date}T${formData.time}`);
      
      const payload = {
        title: formData.title,
        description: formData.description,
        date: datetime.toISOString(),
        location: formData.location,
        category: formData.category,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
        banner: formData.banner || "",
      };

      const res = await api.post("/events", payload);
      toast.success("Event created successfully!");
      router.push(`/events/${res.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Sign in to Host an Event</h2>
        <button onClick={() => router.push('/login')} className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-600 transition">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto bg-slate-900 text-white rounded-2xl shadow-none border border-slate-700 border-slate-700 overflow-hidden">
        <div className="px-6 py-8 border-b border-slate-700 border-slate-700 bg-indigo-950/30 /50">
          <h1 className="text-3xl font-bold text-white">Host a New Event</h1>
          <p className="mt-2 text-sm text-gray-500">Fill out the details below to publish your event to the community.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Event Title *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Type className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors"
                  placeholder="e.g., Tech Startup Networking"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time *</label>
              <input
                type="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors"
              />
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Location * (Address or Link)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors"
                  placeholder="123 Main St, City or Online Link"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors appearance-none"
                >
                  <option value="Meetup">Meetup</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Sports">Sports</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Social">Social</option>
                  <option value="Tech">Tech</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Max Participants (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="number"
                  name="maxParticipants"
                  min="1"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors"
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            {/* Banner URL */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Cover Image URL (Optional)</label>
              <input
                type="url"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                className="block w-full px-4 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-gray-500" />
                </div>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white transition-colors"
                  placeholder="Tell people what this event is about..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700 border-slate-700 flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="mr-3 px-5 py-2.5 border border-slate-700 border-slate-700 shadow-none text-sm font-medium rounded-lg text-gray-300 bg-slate-900 text-white hover:bg-gray-50 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 border border-transparent shadow-none text-sm font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
