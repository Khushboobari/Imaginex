import React, { useEffect, useState } from 'react';
import { Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePost } from '../features/post/postSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Generate = () => {

  const { post, postLoading, postSuccess, postError, postErrorMessage } = useSelector(state => state.post)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);


  const STYLES = ['Realistic', 'Anime', 'Cyberpunk', 'Watercolor', 'Oil Painting', 'Neon', 'Fantasy'];
  const [activeStyle, setActiveStyle] = useState('Realistic');

  const RATIOS = [
    { label: 'Square', value: '1:1' },
    { label: 'Portrait', value: '9:16' },
    { label: 'Landscape', value: '16:9' }
  ];
  const [activeRatio, setActiveRatio] = useState('1:1');

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt) return;

    // setIsGenerating(true);

    dispatch(generatePost(`${prompt}, with this style ${activeStyle}, and ratio will be ${activeRatio}`))

    setPrompt("")

  };


  useEffect(() => {

    if (postSuccess && post) {
      navigate("/auth/feed")
    }


    if (postError && postErrorMessage) {
      toast.error(postErrorMessage, { position: "top-center", theme: "dark" })
    }

  }, [postError, postErrorMessage, postSuccess, post])


  if (postLoading) {
    return <Loader />
  }


  return (

    <>
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-8 max-w-5xl mx-auto mt-26">
            <h1 className="text-3xl md:text-4xl font-syne font-bold mb-8 flex items-center gap-3">
              <Sparkles className="text-fuchsia-500 w-8 h-8" />
              Create with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AI</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">

              {/* Controls */}
              <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative shadow-lg shadow-black/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl rounded-tl-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="relative z-10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Prompt</label>
                  <textarea
                    rows="4"
                    placeholder="Describe what you want to see... e.g., 'A cyberpunk city in the rain, neon lights, highly detailed'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition-all"
                  />
                </div>
                




                <div className="relative z-10">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Art Style</label>
                  <div className="flex flex-wrap gap-2">
                    {STYLES.map(style => (
                      <button
                        key={style}
                        onClick={() => setActiveStyle(style)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeStyle === style
                          ? 'bg-violet-600 text-white border border-violet-500'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative z-10">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Aspect Ratio</label>
                  <div className="grid grid-cols-3 gap-3">
                    {RATIOS.map(ratio => (
                      <button
                        key={ratio.label}
                        onClick={() => setActiveRatio(ratio.value)}
                        className={`py-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${activeRatio === ratio.value
                          ? 'bg-fuchsia-600/20 text-white border border-fuchsia-500/50 ring-1 ring-fuchsia-500/50'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                          }`}
                      >
                        <div className={`border-2 border-current rounded-sm ${ratio.value === '1:1' ? 'w-6 h-6' : ratio.value === '16:9' ? 'w-8 h-5' : 'w-5 h-8'
                          }`} />
                        <span className="text-xs">{ratio.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                  className={`mt-auto w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${!prompt
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-500/50 hover:-translate-y-1 active:scale-[0.98]'
                    }`}
                >
                  {isGenerating ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Wand2 className="w-5 h-5" />
                  )}
                  {isGenerating ? 'Generating Magic...' : 'Generate Image And Post'}
                </button>
              </div>


            </div>
          </div>
        </main>
      </div>
    </>



  );
};

export default Generate;
