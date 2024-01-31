import React from 'react';
import Sidebar from './components/sidebar'; // Adjust the path as needed

export default function Page() {
  return (
      <div className="container">
          <Sidebar />
          <textarea className="editor"></textarea>
      </div>
  );
}
