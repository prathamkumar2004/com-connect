"use client";

import { useState, useEffect } from "react";
import api from "../../lib/api";
import Link from "next/link";
import { format } from "date-fns";
import { Search, MapPin, Calendar, Clock, Users } from "lucide-react";

export default function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = ["All", ...new Set(events.map((e) => e.category))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Explore Events</h1>
            <p className="mt-2 text-sm text-gray-500">Discover and join amazing events happening near you.</p>
          </div>
          <Link href="/create" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-none whitespace-nowrap">
            Host an Event
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-none border border-slate-700 border-slate-700 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-950 text-white"
            />
          </div>
          <div className="sm:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full py-2 px-3 border border-slate-700 border-slate-700 bg-slate-900 text-white bg-slate-950 text-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 text-white rounded-xl border border-slate-700 border-slate-700">
            <Calendar className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-white">No events found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Link href={`/events/${event._id}`} key={event._id} className="group flex flex-col bg-slate-900 text-white rounded-2xl shadow-none border border-slate-700 border-slate-700 overflow-hidden card-hover">
                <div className="relative h-48 bg-slate-800 bg-slate-950 flex-shrink-0">
                  {event.banner ? (
                    <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100   text-indigo-500 ">
                      <Calendar className="w-12 h-12 mb-2 opacity-50" />
                      <span className="font-semibold">{event.category}</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/90 /90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-400 ">
                    {event.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-600 focus:text-indigo-400 line-clamp-1">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                      {format(new Date(event.date), "EEE, MMM d, yyyy")}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                      {format(new Date(event.date), "h:mm a")}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-700 border-slate-700 flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants?.length || 0} / {event.maxParticipants || "∞"} attending
                    </div>
                    <span className="text-indigo-400  font-medium group-hover:underline">Details &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
