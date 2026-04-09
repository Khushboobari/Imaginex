import React, { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import UserAvatar from '../../components/UserAvatar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Loader from '../../components/Loader';
import { getAllPosts, publishUnPublishPost } from '../../features/admin/adminSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const AdminPosts = () => {

  const { posts, adminLoading, adminSuccess, adminError, adminErrorMessage } = useSelector(state => state.admin)

  const dispatch = useDispatch()



  const handlePublishUnpublishPost = (pid) => {
    dispatch(publishUnPublishPost(pid))
  }





  useEffect(() => {

    if (!adminError) {
      // Fetch All Posts
      dispatch(getAllPosts())
    }

    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center" })
    }


  }, [adminError, adminErrorMessage])

  if (adminLoading) {
    return (
      <Loader />
    )
  }



  return (


    <>
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3">
              <h1 className="font-syne text-3xl font-bold text-white">Posts</h1>
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                {posts.length} total
              </span>
            </div>

            {/* Filters */}
            {/* <div className="flex items-center gap-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === opt
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div> */}

            {/* Table */}
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-sm">
                      <th className="py-4 px-4 font-medium w-24">Thumbnail</th>
                      <th className="py-4 px-4 font-medium max-w-sm">Prompt</th>
                      <th className="py-4 px-4 font-medium">Author</th>
                      <th className="py-4 px-4 font-medium">Likes</th>
                      <th className="py-4 px-4 font-medium">Status</th>
                      <th className="py-4 px-4 font-medium">Date</th>
                      <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <tr key={post._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4">
                            {post.imageLink ? (
                              <img
                                src={post.imageLink}
                                alt="Post Thumbnail"
                                className="w-16 h-16 object-cover rounded-xl"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-gray-500" />
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4 max-w-sm">
                            <p className="text-gray-300 text-sm line-clamp-2" title={post.prompt}>
                              {post.prompt}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <UserAvatar size="sm" />
                              <span className="text-white font-medium text-sm">{post.user?.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{post.likes?.length || 0}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                              {post.isPublished ? 'Published' : 'Unpublished'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-400 text-sm">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            {post.isPublished ? (
                              <button onClick={() => handlePublishUnpublishPost(post._id)} className="border border-gray-500/50 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                                Unpublish
                              </button>
                            ) : (
                              <button onClick={() => handlePublishUnpublishPost(post._id)} className="border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                                Publish
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-16 text-center text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <ImageIcon className="w-10 h-10 mb-3 opacity-20" />
                            <p>No posts found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>


  );
};

export default AdminPosts;
