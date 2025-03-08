import React from "react";
import Footer from "./footer";
import Header from "./header";

export default function CustomHome({ children }) {
  return (
    <div className="flex flex-col min-h-[min(100vh,auto)] bg-gradient-to-br from-background to-muted max-w-[100vw]">
      <Header />

      {/* This makes sure the content pushes the footer down */}
      <main className="flex-grow container mx-auto px-4 py-12">{children}</main>

      {/* Footer stays at the bottom only if there's not enough content */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
