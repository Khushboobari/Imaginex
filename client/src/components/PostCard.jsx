import React from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import LikeButton from './LikeButton';


const PostCard = ({ post }) => {





  return (
    <Link
      to={`/auth/post/${post._id}`}
      className="group block relative rounded-2xl overflow-hidden mb-4 break-inside-avoid shadow-lg shadow-violet-900/5 hover:-translate-y-1 hover:shadow-violet-900/20 transition-all duration-500 cursor-zoom-in bg-white/5"
    >
      {/* Image */}
      <img
        src={post?.imageLink}
        alt={post?.prompt || post?.caption}
        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
      />

      {/* Overlay - appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 md:from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">

        {/* Top bar */}
        <div className="flex justify-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {/* <LikeButton initialLikes={post?.likes?.length} post={post} /> */}
        </div>

        {/* Bottom content */}
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
          <p className="text-sm text-gray-200 line-clamp-2 mb-3 leading-snug drop-shadow-md">
            {post?.prompt || post?.caption}
          </p>

          <div className="flex items-center gap-2" onClick={(e) => {
            // e.preventDefault(); // If we wanted clicking user to go to profile instead of post
          }}>
            <UserAvatar src={post?.user?.avatar} alt={post?.user?.name} size="sm" />
            <div>
              <p className="text-xs font-bold text-white leading-tight">{post?.user?.name}</p>
              <p className="text-[10px] text-gray-400">@{post?.user?.name}</p>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default PostCard;
