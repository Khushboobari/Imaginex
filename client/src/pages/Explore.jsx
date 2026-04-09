import React, { useEffect, useState } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/post/postSlice';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Explore = () => {

  const { posts, postLoading, postSucess, postError, postErrorMessage } = useSelector(state => state.post)


  const dispatch = useDispatch()


  const activePosts = posts.filter(post => post.isPublished)


  useEffect(() => {
    dispatch(getPosts())
  }, [])


  if (postLoading) {
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
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto mt-4">
            <div className="mb-8">
              <h1 className="text-3xl font-syne font-bold mb-6">Discover</h1>
            </div>

            {posts.length > 0 ? (
              <MasonryGrid>
                {activePosts.map(post => (
                  <PostCard key={post._id} post={post} />
                ))}
              </MasonryGrid>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No posts found for this category.
              </div>
            )}
          </div>
        </main>
      </div>
    </>


  );
};

export default Explore;
