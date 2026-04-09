import { User2 } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

const UserAvatar = ({ src, alt, size = 'md', isOnline = false, ring = false }) => {




  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className="relative inline-block">
      <div className=' border border-purple-500 bg-gray-900 h-12 w-12 rounded-full flex items-center justify-center'>
        <h1 className='text-white text-2xl font-bold'>
          <User2 />
        </h1>
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-[#0a0a0f] bg-green-500"></span>
      )}
    </div>
  );
};

export default UserAvatar;
