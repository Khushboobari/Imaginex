import React from 'react';

const MasonryGrid = ({ children }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 w-full">
      {children}
    </div>
  );
};

export default MasonryGrid;
