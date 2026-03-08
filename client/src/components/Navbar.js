"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Menu, X, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-none border-b border-slate-700 bg-slate-900 text-white border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">
                Community Connect
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
            <Link href="/explore" className="text-gray-500 hover:text-gray-700 focus:text-indigo-400 font-medium px-3 py-2 rounded-md">
              Explore Events
            </Link>

            {user ? (
              <>
                <Link href="/create" className="flex items-center text-gray-500 hover:text-gray-700 focus:text-indigo-400 font-medium px-3 py-2 rounded-md">
                  <PlusCircle className="w-5 h-5 mr-1" /> Create
                </Link>
                <Link href="/dashboard" className="flex items-center text-gray-500 hover:text-gray-700 focus:text-indigo-400 font-medium px-3 py-2 rounded-md">
                  <User className="w-5 h-5 mr-1" /> Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-500 hover:text-red-600 text-gray-500 focus:text-red-400 font-medium px-3 py-2 rounded-md transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-500 hover:text-gray-700 focus:text-indigo-400 font-medium px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link href="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-none">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-500 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-slate-900 text-white border-t border-slate-700 border-slate-700 pb-3">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-600 text-white">
              Explore Events
            </Link>
            {user ? (
              <>
                <Link href="/create" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-600 text-white">
                  Create Event
                </Link>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-600 text-white">
                  Dashboard
                </Link>
                <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-red-600 text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-600 text-white">
                  Login
                </Link>
                <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-800 ">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
