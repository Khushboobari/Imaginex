import React, { useEffect } from 'react';
import CoverImage from "../assets/cover_image.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import { CURRENT_USER, MOCK_POSTS } from '../mockData';
import MasonryGrid from '../components/MasonryGrid';
import PostCard from '../components/PostCard';
import UserAvatar from '../components/UserAvatar';
import { Settings, Share2, MapPin, Calendar, CircleDollarSign } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { follow, getProfile, unfollow } from '../features/profile/profileSlice';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Profile = () => {

  const { profile, profileSuccess, profileLoading, profileError, profileErrorMessage } = useSelector(state => state.profile)
  const { user } = useSelector(state => state.auth)

  let alreadyFollowed = profile.followers.some(follow => follow?._id === user?.id)

  const dispatch = useDispatch()
  const { username } = useParams();

  console.log(username)

  const handleFollowUnfollow = (id) => {

    if (alreadyFollowed) {
      // Unfolow
      dispatch(unfollow(id))
    } else {
      // Follow
      dispatch(follow(id))
    }

    // Reload The Page
    window.location.href = "/profile/" + username
  }




  useEffect(() => {
    // Get Profile
    dispatch(getProfile(username))

    if (profileError && profileErrorMessage) {
      toast.error(profileErrorMessage, { position: "top-center", theme: "dark" })
    }


  }, [username])


  if (profileLoading) {
    return (
      <Loader />
    )
  }


  return (

    <>
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="w-full relative pb-20">
            {/* Cover Image */}
            <div className="h-64 sm:h-80 w-full relative">
              <img
                src={CoverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 sm:-mt-32">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <div className="flex items-end gap-6 relative z-10">
                  <UserAvatar alt="Profile" size="xl" ring />
                  <div className="mb-2">
                    <h1 className="text-3xl font-syne font-bold text-white">{profile?.name}</h1>
                    <p className="text-gray-400">@{username}</p>
                  </div>
                </div>

                <div className="flex gap-3 relative z-10 sm:mb-2">
                  <button className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-300" />
                  </button>
                  <button onClick={() => handleFollowUnfollow(profile._id)} className={alreadyFollowed ? "px-5 py-2 rounded-full text-white font-medium hover:bg-white/20 transition-colors text-sm bg-red-500" : "px-5 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm"}>
                    {alreadyFollowed ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>

              {/* Bio & Stats */}
              <div className="max-w-2xl text-gray-300 mb-8 space-y-4">
                <p className="leading-relaxed">{profile?.bio}</p>

                <div className="flex gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5"><CircleDollarSign className="w-4 h-4" /> Credits : {profile?.credits}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {new Date(profile?.createdAt).toLocaleDateString('en-IN')}</div>
                </div>

                <div className="flex gap-8 pt-4 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">{profile?.posts?.length}</span>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Posts</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">{profile?.followers.length}</span>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Followers</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">{profile?.following.length}</span>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Following</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 mb-8 border-b border-white/10">
                <button className="pb-4 font-medium text-violet-400 border-b-2 border-violet-500 relative">
                  Creations
                </button>
                <button className="pb-4 font-medium text-gray-400 hover:text-white transition-colors">
                  Liked
                </button>
                <button className="pb-4 font-medium text-gray-400 hover:text-white transition-colors">
                  Collections
                </button>
              </div>

              {/* Posts Grid */}
              <MasonryGrid>
                {profile?.posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </MasonryGrid>
            </div>
          </div>
        </main>
      </div>
    </>




  );
};

export default Profile;
