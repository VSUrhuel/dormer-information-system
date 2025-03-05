import React from "react";
import Footer from "./footer";
import Header from "./header";

export default function CustomHome({ children }) {
  return (
    <div className="bg-gradient-to-br from-background to-muted max-w-[100vw]">
      <Header />
      <main className="container mx-auto px-4 py-12 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
