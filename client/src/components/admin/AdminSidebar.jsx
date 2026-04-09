import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Image as ImageIcon, Flag, Sparkles, LogOut, ShieldCheck, Compass } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

const AdminSidebar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ImageIcon, label: 'Posts', path: '/admin/posts' },
    { icon: Flag, label: 'Reports', path: '/admin/reports' },
    { icon: Compass, label: 'Explore', path: '/auth/explore' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-white/10 glass-card bg-[#0a0a0f]/95 shrink-0">
      <div className="p-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2 group">
          <Sparkles className="text-violet-500 w-8 h-8 group-hover:animate-pulse" />
          <h1 className="font-syne font-bold text-2xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
            Imaginex
            <span className="text-xs font-dmsans bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/30">
              Admin
            </span>
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
        <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 transition-all">
          <ShieldCheck className="w-5 h-5 text-violet-400" />
          <span className="truncate">{user?.name || "Admin"}</span>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-red-400 cursor-pointer transition-all mt-1">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
