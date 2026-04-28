import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';
import LikeButton from '../components/LikeButton';
import { Share2, Bookmark, MoreHorizontal, ArrowLeft, Wand2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, reportPost } from '../features/post/postSlice';
import Loader from '../components/Loader';
import { follow } from '../features/profile/profileSlice';
import { toast } from 'react-toastify';

const PostDetail = () => {

  const [modal, setModal] = useState(false)
  const [text, setText] = useState("")
  const { pid } = useParams();
  // Generate a stable seed from the post ID
  const seed = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < pid.length; i++) {
      hash = ((hash << 5) - hash) + pid.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 999999999;
  }, [pid])


  const { post, postLoading, postSucess, postError, postErrorMessage } = useSelector(state => state.post)

  const { profile, profileLoading, profileSuccess, profileError, profileErrorMessage } = useSelector(state => state.profile)

  const dispatch = useDispatch()

  let alreadyFollowed = profile.following.some(follow => follow?._id === post?.user?._id)

  const navigate = useNavigate()


  const followUser = (id) => {
    dispatch(follow(id))
  }


  const handleModal = () => {
    setModal(modal ? false : true)
  }

  // Report Post
  const handleReportPost = (e) => {
    e.preventDefault()
    dispatch(reportPost({ text, pid }))
    setModal(false)
  }


  useEffect(() => {

    if (!profileError && !postError) {
      // Fetch post details
      dispatch(getPost(pid))
    }


    if (postError && postErrorMessage || profileError && profileErrorMessage) {
      toast.error(postErrorMessage || profileErrorMessage)
      navigate("/login")
    }


  }, [pid, postError, postErrorMessage, profileError, profileErrorMessage])


  if (postLoading || !post || profileLoading) {
    return (
      <Loader />
    )
  }


  return (
    <div className="h-full flex flex-col md:flex-row max-w-[1600px] mx-auto overflow-hidden">
      {/* Scrollable Image Area */}
      <div className="flex-1 overflow-y-auto bg-black/50 p-4 md:p-8 flex flex-col items-center justify-start min-h-0 relative hide-scrollbar">
        <Link to={-1} className="absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors z-10 group">
          <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
        </Link>
        <div className="max-w-4xl w-full flex-grow flex items-center justify-center py-10">
          <img
            src={post.imageLink}
            alt={post.prompt}
            className="w-full h-auto object-contain max-h-[85vh] rounded-xl shadow-2xl shadow-black ring-1 ring-white/10"
          />
        </div>
      </div>

      {/* Detail Sidebar */}
      <div className="w-full md:w-[400px] lg:w-[450px] shrink-0 border-l border-white/10 glass-card bg-[#0a0a0f]/90 flex flex-col h-[50vh] md:h-full overflow-y-auto">
        <div className="p-6 md:p-8 flex flex-col gap-8 h-full">

          {/* Header Actions */}
          <div className="relative flex items-center justify-between">

            {/* Report Modal */}

            {
              modal && (
                <div className="p-8 h-52 md:w-80 w-100 bg-gray-900 rounded-lg absolute top-12 right-5 z-50">
                  <form onSubmit={handleReportPost}>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className='border p-4 border-white rounded-xl w-full' name="" id="" placeholder='Enter Your Issue Here..'></textarea>
                    <button type='submit' className="mt-4 w-full cursor-pointer py-2 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 bg-white/5 border border-violet-500/30 text-violet-300 hover:bg-violet-600/20">Report This Post</button>
                  </form>
                </div>
              )
            }

            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4 text-gray-300" />
              </button>
              <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors">
                <Bookmark className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleModal} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
              <LikeButton initialLikes={post.likes.length} post={post} />
            </div>
          </div>

          <div className="h-px w-full bg-white/5"></div>

          {/* User Info */}
          <div className="flex items-center justify-between">
            <Link to={`/auth/profile/${post?.user?.name}`} className="flex items-center gap-3 group">
              <UserAvatar src={post.user.avatar} alt={post.user.name} />
              <div>
                <p className="font-bold text-white group-hover:text-violet-400 transition-colors">{post.user.name}</p>
                <p className="text-xs text-gray-400">{post.user.followers.length} followers</p>
              </div>
            </Link>
            <button disabled={alreadyFollowed} onClick={() => followUser(post.user._id)} className="px-5 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm disabled:bg-green-900">
              {alreadyFollowed ? "Followed" : "Follow"}
            </button>
          </div>

          {/* Prompt / Title */}
          <div className="flex-1 mt-4">
            <h2 className="text-xl font-syne font-bold mb-4">Prompt details</h2>
            <div className="bg-black/40 border border-white/5 rounded-xl p-5 relative group">
              <p className="text-gray-300 leading-relaxed font-mono text-sm selection:bg-violet-500/30">
                {post.prompt}
              </p>
              <button className="absolute top-2 right-2 p-2 rounded bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 text-xs font-semibold text-violet-300">
                Copy
              </button>
            </div>

            <button className="mt-6 w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 bg-white/5 border border-violet-500/30 text-violet-300 hover:bg-violet-600/20">
              <Wand2 className="w-5 h-5" />
              Remix Prompt
            </button>
          </div>

          {/* Metadata */}
          <div className="mt-auto pt-6 text-xs text-gray-500 flex justify-between items-center">
            <span>Model: Nano Banana Pro</span>
            <span>Seed: {seed}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostDetail;
