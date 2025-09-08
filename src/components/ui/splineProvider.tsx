"use client";
import React, { useEffect, ReactNode } from "react";

function SplineProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const overlayWatermark = () => {
      const viewer = document.querySelector("spline-viewer") as HTMLElement;
      if (viewer) {
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.bottom = "10px"; // Adjust based on the watermark position
        overlay.style.right = "10px";
        overlay.style.width = "100px"; // Adjust width of the cover box
        overlay.style.height = "40px"; // Adjust height of the cover box
        overlay.style.background = "white"; // White background to cover it
        overlay.style.zIndex = "9999"; // Ensure it overlays everything
        overlay.style.pointerEvents = "none"; // Allow interaction with Spline
        
        viewer.style.position = "relative"; // Ensure the container is positioned
        viewer.appendChild(overlay);
      }
    };

    setTimeout(overlayWatermark, 2000); // Delay to ensure Spline loads

    return () => {};
  }, []);

  return <>{children}</>;
}

export default SplineProvider;