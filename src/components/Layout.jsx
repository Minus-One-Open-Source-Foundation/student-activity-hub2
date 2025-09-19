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
          background: #f5f7fa; /* page background */
          font-family: 'Inter', sans-serif;
        }

        /* Main content area */
        .content {
          flex: 1;
          padding: 2rem 2.5rem; /* consistent spacing */
          overflow-y: auto;
          min-height: 100vh;
          box-sizing: border-box;
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
            padding: 1.2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
