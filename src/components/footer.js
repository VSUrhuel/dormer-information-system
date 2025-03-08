import React from "react";

export default function Footer() {
  return (
    <footer className="backdrop-blur bg-background/95 border-t border-muted flex flex-col items-center py-4 text-sm text-gray-500 dark:text-gray-400">
      <div className="grid justify-center px-6 text-center">
        <p>
          Developed by{" "}
          <a
            className="hover:underline text-primary"
            href="https://github.com/VSUrhuel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Laurente, J.R.
          </a>
        </p>
        <p>© 2025 Laurente. All rights reserved.</p>
      </div>
    </footer>
  );
}
