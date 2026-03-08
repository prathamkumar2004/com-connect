"use client";

import { useState, useEffect } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin, Users, Plus, ArrowRight, Star } from "lucide-react";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("joined");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/events/user/dashboard");
      setCreatedEvents(res.data.createdEvents);
      // Sort joined events by date
      const sortedJoined = res.data.joinedEvents.sort((a,b) => new Date(a.date) - new Date(b.date));
      setJoinedEvents(sortedJoined);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const renderEventCard = (event) => (
    <div key={event._id} className="bg-slate-900 text-white rounded-xl shadow-none border border-slate-700 border-slate-700 p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center card-hover overflow-hidden relative">
      <div className="w-full sm:w-32 h-32 sm:h-24 rounded-lg bg-slate-900 text-white bg-slate-950 flex-shrink-0 overflow-hidden relative">
        {event.banner ? (
          <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-950/30 text-indigo-300">
            <Calendar className="w-8 h-8" />
          </div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-indigo-400  bg-indigo-950/30 /30 px-2.5 py-0.5 rounded-full">
            {event.category}
          </span>
          {new Date(event.date) < new Date() && (
            <span className="text-xs font-semibold text-gray-500 bg-slate-900 text-white  px-2.5 py-0.5 rounded-full">
              Past
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white truncate">{event.title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {format(new Date(event.date), "MMM d, h:mm a")}</span>
          <span className="flex items-center truncate"><MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" /> <span className="truncate max-w-[150px]">{event.location}</span></span>
          <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> {event.participants?.length || 0}</span>
        </div>
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
        <Link 
          href={`/events/${event._id}`} 
          className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-slate-700 border-slate-700 rounded-lg text-sm font-medium text-gray-300 bg-slate-900 text-white hover:bg-gray-50 hover:bg-slate-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 text-white min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Card */}
        <div className="bg-slate-900 text-white rounded-2xl shadow-none border border-slate-700 border-slate-700 p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-none">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-6 py-3 bg-indigo-950/30 rounded-xl">
              <p className="text-2xl font-bold text-indigo-400 ">{joinedEvents.length}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Attending</p>
            </div>
            <div className="text-center px-6 py-3 bg-pink-950/30 rounded-xl">
              <p className="text-2xl font-bold text-pink-400 ">{createdEvents.length}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hosted</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700 border-slate-700 mb-8">
          <button
            onClick={() => setActiveTab("joined")}
            className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "joined"
                ? "border-indigo-500 text-indigo-400 "
                : "border-transparent text-gray-500 hover:text-gray-700 text-gray-500 focus:text-gray-300"
            }`}
          >
            Events I'm Attending
          </button>
          <button
            onClick={() => setActiveTab("created")}
            className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "created"
                ? "border-indigo-500 text-indigo-400 "
                : "border-transparent text-gray-500 hover:text-gray-700 text-gray-500 focus:text-gray-300"
            }`}
          >
            Events I'm Hosting
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "joined" && (
            <div className="space-y-4">
              {joinedEvents.length > 0 ? (
                joinedEvents.map(renderEventCard)
              ) : (
                <div className="text-center py-16 bg-slate-900 text-white rounded-2xl border border-slate-700 border-slate-700 border-dashed">
                  <Star className="mx-auto h-12 w-12 text-gray-500 text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-white">Not attending any events</h3>
                  <p className="mt-1 text-gray-500 mb-6">Discover exciting events in your community and join them.</p>
                  <Link href="/explore" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-none text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition">
                    Explore Events <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "created" && (
            <div className="space-y-4">
              <div className="flex justify-end mb-4">
                <Link href="/create" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-none text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition">
                  <Plus className="mr-2 w-4 h-4" /> Host New Event
                </Link>
              </div>
              {createdEvents.length > 0 ? (
                createdEvents.map(renderEventCard)
              ) : (
                <div className="text-center py-16 bg-slate-900 text-white rounded-2xl border border-slate-700 border-slate-700 border-dashed">
                  <Calendar className="mx-auto h-12 w-12 text-gray-500 text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-white">No events hosted yet</h3>
                  <p className="mt-1 text-gray-500 mb-6">Start building your community by hosting your first event.</p>
                  <Link href="/create" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-none text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition">
                    <Plus className="ml-[-4px] mr-2 w-4 h-4" /> Create Event
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
