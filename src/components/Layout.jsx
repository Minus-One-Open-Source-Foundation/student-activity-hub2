import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Sidebar /> {/* always visible on the left */}
      <main className="content">{children}</main>

      <style>{`
        /* Layout container */

        .layout-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background: none;
          font-family: 'Inter', sans-serif;
        }

        /* Main content area */

        .content {
          flex: 1;
          padding: 0;
          overflow-y: auto;
          min-height: 100vh;
          box-sizing: border-box;
          background: url('/src/assets/bg.jpg') no-repeat center center fixed;
          background-size: cover;
          display: flex;
          flex-direction: column;
        }

        /* Optional: smooth scroll for content */
        .content::-webkit-scrollbar {
          width: 8px;
        }
        .content::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .content::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Responsive: sidebar on top for small screens */
        @media(max-width:768px){
          .layout-wrapper {
            flex-direction: column;
          }
          .content {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}
