"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;
return(
   <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1e2429]">
      <div className="relative w-20 h-20">
        {/* 8 dots rotating */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <div
              key={i}
              className="absolute w-3 h-2 bg-orange-500 rounded-full"
              style={{
                top: "30%",
                left: "30%",
                marginTop: "-4px",
                marginLeft: "-4px",
                transform: `rotate(${angle}deg) translate(0, -40px)`,
                transformOrigin: "center center",
                animation: "spin 1.5s linear infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg) translate(0, -40px);
          }
          100% {
            transform: rotate(360deg) translate(0, -40px);
          }
        }
      `}</style>
    </div>
  );
}