import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Search, Bell } from 'lucide-react';
import { CURRENT_USER } from '../mockData';
import UserAvatar from './UserAvatar';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const { user } = useSelector(state => state.auth)

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Hide Navbar completely on landing and auth pages
  const isExcluded = ['/', '/login', '/register'].includes(location.pathname);
  if (isExcluded && location.pathname === '/') return null; // handled differently in AppLayout anyway, but just in case.

  return (
    <nav className="sticky top-0 z-40 w-full glass-card border-b border-white/10 bg-[#0a0a0f]/80 px-4 md:px-6 h-16 flex items-center justify-between transition-all duration-300">

      {/* Mobile Logo / Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="md:hidden flex items-center gap-2">
          <Sparkles className="text-violet-500 w-6 h-6" />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        <Link
          to="/auth/generate"
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-4 py-2 rounded-full font-medium text-sm shadow-lg shadow-violet-900/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate</span>
        </Link>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative group">
          <Bell className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fuchsia-500 rounded-full"></span>
        </button>
        <Link to={`/profile/${user?.name}`}>
          <UserAvatar alt={user?.name} size="sm" isOnline ring />
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
