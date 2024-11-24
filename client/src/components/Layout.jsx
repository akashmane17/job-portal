import React from "react";
import Header from "./Header";

// Layout for the app contains Header and basic page styling
const Layout = ({ children }) => {
  return (
    <div className="h-screen overflow-y-auto transition-all duration-300">
      {/* Header */}
      <Header />

      {/* Body */}
      <main id="layout" className="">
        <div className="w-full p-2 max-md:p-4 min-h-screen">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
