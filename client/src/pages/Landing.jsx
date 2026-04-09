import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Wand2, Users, Image as ImageIcon } from 'lucide-react';
import { useEffect } from 'react';

const Landing = () => {

  const { user } = useSelector(state => state.auth)

  const navigate = useNavigate()


  useEffect(() => {
    // if (user) {
    //   navigate("/feed")
    // }
  }, [user])


  return (
    <div className="w-full h-full bg-[#0a0a0f] overflow-hidden flex flex-col relative">

      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
      </div>

      {/* Nav */}
      <nav className="relative z-10 w-full p-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="text-violet-500 w-8 h-8" />
          <span className="font-syne font-bold text-2xl bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Imaginex
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Log In</Link>
          <Link to="/register" className="px-6 py-2 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-transform">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full pt-10 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-violet-500/30 text-violet-300 mb-8 max-w-full overflow-hidden">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="text-xs md:text-sm font-medium truncate">The Next-Gen AI Art Community</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-syne font-extrabold text-white mb-6 leading-[1.1]">
          Visualize <br className="md:hidden" />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">Anything.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-medium">
          Join a community of millions of creators. Generate breathtaking AI art, discover new prompts, and share your imagination with the world.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2">
            Start Creating <Wand2 className="w-5 h-5" />
          </Link>
          <Link to="/auth/explore" className="w-full sm:w-auto px-8 py-4 rounded-full glass-card text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
            Explore Feed
          </Link>
        </div>
      </main>

      {/* Features */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-violet-600/20 flex items-center justify-center mb-6 border border-violet-500/20">
                <Wand2 className="w-7 h-7 text-violet-400" />
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-3">Generate Instantly</h3>
              <p className="text-gray-400 leading-relaxed">Simply type your prompt and watch as our state-of-the-art models bring your imagination to life in seconds.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-600/20 flex items-center justify-center mb-6 border border-fuchsia-500/20">
                <Users className="w-7 h-7 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-3">Vibrant Community</h3>
              <p className="text-gray-400 leading-relaxed">Follow your favorite creators, discover new artistic styles, and build an audience around your unique vision.</p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center mb-6 border border-indigo-500/20">
                <ImageIcon className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-syne font-bold text-white mb-3">Curate Collections</h3>
              <p className="text-gray-400 leading-relaxed">Organize your favorite generations into public or private boards, just like your favorite inspiration platforms.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;
