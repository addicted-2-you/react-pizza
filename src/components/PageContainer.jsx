import React from 'react';

function PageContainer({ children }) {
  return (
    <div className="p-5 min-h-screen bg-yellow-200">
      <div className="p-4 h-full bg-white rounded-lg">{children}</div>
    </div>
  );
}

export default PageContainer;
