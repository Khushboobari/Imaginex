import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Home, Compass, PlusSquare, User, Sparkles, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { resetProfile } from '../features/profile/profileSlice';

const Sidebar = () => {

  const { user, isSuccess } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const navItems = [
    { icon: user.isAdmin ? LayoutDashboard : Home, label: user.isAdmin ? "Dashboard" : 'Feed', path: user.isAdmin ? "/admin/dashboard" : '/auth/feed' },
    { icon: Compass, label: 'Explore', path: '/auth/explore' },
    { icon: PlusSquare, label: 'Generate', path: '/auth/generate' },
    { icon: User, label: 'Profile', path: `/auth/profile/${user?.name}` },
  ];


  const handleLogout = () => {
    dispatch(logoutUser())
    if (isSuccess) {
      dispatch(resetProfile())
      navigate("/login")
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-white/10 glass-card bg-[#0a0a0f]/95 shrink-0">
        <div className="p-6">
          <Link to="/auth/feed" className="flex items-center gap-2 group">
            <Sparkles className="text-violet-500 w-8 h-8 group-hover:animate-pulse" />
            <h1 className="font-syne font-bold text-2xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Imaginex
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 mt-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                  ? 'bg-white/10 text-white font-medium shadow-sm'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mb-4 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-red-400 cursor-pointer transition-all mt-1">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 w-full h-16 glass-card border-t border-white/10 bg-[#0a0a0f]/95 z-50 flex items-center justify-around px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-violet-400' : 'text-gray-500 hover:text-gray-300'
              }`
            }
          >
            <item.icon className={`w-6 h-6 ${item.label === 'Generate' ? 'text-fuchsia-500' : ''}`} />
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
