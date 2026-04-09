import React, { useEffect } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import PostCard from '../components/PostCard';
import { MOCK_POSTS } from '../mockData';
import { Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/post/postSlice';
import Loader from '../components/Loader';
import { getProfile } from '../features/profile/profileSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Feed = () => {

  const { posts, postLoading, postSucess, postError, postErrorMessage } = useSelector(state => state.post)
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)
  const { profile, profileLoading } = useSelector(state => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const filteredPosts = posts?.filter(post =>
    profile?.following?.some(follow =>
      follow._id === post.user._id
    )
  ).filter(post => post.isPublished)





  useEffect(() => {

    if (user.isAdmin) {
      navigate("/admin/dashboard")
    }

    // Fetch Posts
    dispatch(getPosts())
    // Fetch Profile
    if (user) {
      dispatch(getProfile(user?.name))
    }


    if (postError && postErrorMessage || isError && message) {
      toast.error(postErrorMessage || message, { position: "top-center" })
    }


  }, [postError, postErrorMessage, isError, message, user])


  if (postLoading || isLoading || profileLoading) {
    return (
      <Loader />
    )
  }


  return (

    <>

      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto mt-4">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-syne font-bold">Your Feed</h1>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm">
                  Following
                </button>
              </div>
            </div>

            <MasonryGrid>
              {filteredPosts.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </MasonryGrid>
          </div>
        </main>
      </div>

    </>



  );
};

export default Feed;
