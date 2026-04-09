import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    bio: ""
  })

  const { name, email, phone, password, bio } = formData


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }




  const handleRegister = (e) => {
    e.preventDefault();

    // Register User
    dispatch(registerUser(formData))

    // Simulate registration
    // navigate('/feed');
  };


  useEffect(() => {
    if (user) {
      navigate("/auth/feed")
    }

    if (isError && message) {
      toast.error(message, { position: "top-center" })
    }

  }, [user, isError, message])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] p-4 relative overflow-hidden">

      {/* Background elements */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]"></div>

      <div className="glass-card border border-white/10 p-8 md:p-10 rounded-3xl w-full max-w-md relative z-10 shadow-2xl shadow-black">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="text-violet-500 w-8 h-8 group-hover:animate-pulse" />
            <span className="font-syne font-bold text-2xl text-white tracking-wide">Imaginex</span>
          </Link>
        </div>

        <h2 className="text-2xl text-white font-bold text-center mb-2">Create an account</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Join the community of creators worldwide.</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              name='name'
              value={name}
              onChange={handleChange}
              type="text"
              required
              placeholder="creative_mind"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              value={email}
              onChange={handleChange}
              name='email'
              type="email"
              required
              placeholder="hello@example.com"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input
              value={phone}
              onChange={handleChange}
              name='phone'
              type="phone"
              required
              placeholder="+919123456789"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              value={password}
              onChange={handleChange}
              name='password'
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Bio</label>
            <textarea
              value={bio}
              onChange={handleChange}
              name='bio'
              type="text"
              required
              placeholder="Enter Your Bio"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-violet-600/25 flex justify-center items-center gap-2"
          >
            Sign Up <Sparkles className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account? <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
