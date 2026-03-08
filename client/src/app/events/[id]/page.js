"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users, User, ArrowLeft, Tag, AlignLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      toast.error("Failed to load event details");
      router.push("/explore");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinLeave = async (action) => {
    if (!user) {
      toast.error("Please login to join events");
      router.push("/login");
      return;
    }
    
    setActionLoading(true);
    try {
      if (action === "join") {
        await api.post(`/events/${id}/join`);
        toast.success("Successfully joined the event!");
      } else {
        await api.post(`/events/${id}/leave`);
        toast.success("Left the event");
      }
      fetchEvent();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${action} event`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setActionLoading(true);
      try {
        await api.delete(`/events/${id}`);
        toast.success("Event deleted");
        router.push("/dashboard");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete event");
        setActionLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) return null;

  const isCreator = user && event.creator._id === user._id;
  const isParticipant = user && event.participants.some(p => p._id === user._id);
  const isFull = event.maxParticipants && event.participants.length >= event.maxParticipants;

  return (
    <div className="bg-slate-900 text-white min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:text-indigo-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>

        <div className="bg-slate-900 text-white rounded-2xl shadow-none border border-slate-700 border-slate-700 overflow-hidden">
          {/* Banner */}
          <div className="h-64 sm:h-80 w-full bg-slate-800 bg-slate-950 relative">
            {event.banner ? (
              <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100   text-indigo-500 ">
                <Calendar className="w-20 h-20 opacity-50" />
              </div>
            )}
            <div className="absolute top-6 left-6 bg-black/90 /90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-indigo-400  shadow-none flex items-center gap-2">
              <Tag className="w-4 h-4" /> {event.category}
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{event.title}</h1>
                <p className="flex items-center text-gray-500 font-medium">
                  <User className="w-5 h-5 mr-2" />
                  Hosted by <span className="text-white ml-1">{event.creator.name}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 flex flex-col gap-3 min-w-[200px]">
                {isCreator ? (
                  <button
                    onClick={handleDelete}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center px-6 py-3 border border-red-200 text-base font-medium rounded-xl text-red-600  bg-red-50 /20 hover:bg-red-100 hover:bg-red-900/40 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 mr-2" /> Delete Event
                  </button>
                ) : (
                  <>
                    {!isParticipant ? (
                      <button
                        onClick={() => handleJoinLeave("join")}
                        disabled={actionLoading || isFull}
                        className="w-full flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-500 hover:bg-indigo-600 transition-colors shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isFull ? "Event Full" : "Join Event"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinLeave("leave")}
                        disabled={actionLoading}
                        className="w-full flex items-center justify-center px-8 py-3.5 border border-slate-700 border-slate-700 text-base font-medium rounded-xl text-gray-300 bg-slate-900 text-white hover:bg-gray-50 hover:bg-slate-700 transition-colors shadow-none"
                      >
                        Leave Event
                      </button>
                    )}
                  </>
                )}
                {isParticipant && !isCreator && (
                  <div className="text-center text-sm font-medium text-emerald-400  bg-emerald-950/30 /20 py-2 rounded-lg">
                    ✓ You're registered
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold flex items-center text-white mb-4">
                    <AlignLeft className="w-6 h-6 mr-2 text-indigo-500" /> About this event
                  </h3>
                  <div className="prose  max-w-none text-gray-500 whitespace-pre-line leading-relaxed">
                    {event.description}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 border-slate-700">
                  <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Date & Time</h3>
                  <div className="flex items-start text-gray-500 mb-3">
                    <Calendar className="w-5 h-5 mr-3 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium text-white">{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-500">
                    <Clock className="w-5 h-5 mr-3 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium text-white">{format(new Date(event.date), "h:mm a")}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 border-slate-700">
                  <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Location</h3>
                  <div className="flex items-start text-gray-500">
                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium text-white break-words">{event.location}</p>
                      {event.location.startsWith('http') && (
                        <a href={event.location} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:text-indigo-500 mt-1 inline-block">Join Link</a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 border-slate-700">
                  <h3 className="font-bold flex items-center justify-between text-white mb-4 uppercase text-xs tracking-wider">
                    Participants
                    <span className="bg-indigo-100 text-indigo-800 /30  py-1 px-2 rounded-full text-xs normal-case font-semibold">
                      {event.participants.length} / {event.maxParticipants || "∞"}
                    </span>
                  </h3>
                  
                  {event.participants.length === 0 ? (
                    <p className="text-sm text-gray-500">Be the first to join!</p>
                  ) : (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {event.participants.map((p) => (
                        <div key={p._id} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 bg-slate-950 flex items-center justify-center text-indigo-400  font-bold text-sm mr-3">
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-300">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
