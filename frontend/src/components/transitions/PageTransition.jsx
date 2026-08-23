import React from "react";
import { useLocation } from "react-router-dom";

/**
 * PageTransition wrapper component.
 * Uses location.pathname as key to trigger smooth, subtle entry transitions.
 * Hardware-accelerated with GPU transforms and reduced-motion awareness.
 */
export function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="fin-page-enter">
      {children}
    </div>
  );
}

/**
 * FadeTransition wrapper for tab/card/content swaps
 */
export function FadeTransition({ children, activeKey }) {
  return (
    <div key={activeKey} className="fin-fade-in">
      {children}
    </div>
  );
}
