"use client";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br  from-blue-50 via-white to-blue-100 flex items-center justify-center z-50 overflow-hidden">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-22 h-22 border-4 border-[#15529F]/20 rounded-full animate-spin">
            <div className="w-18 h-18 border-4 border-[#15529F] border-t-transparent rounded-full animate-spin absolute top-1 left-1"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#15529F] animate-pulse">
            Loading...
          </h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-[#15529F] rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-[#15529F] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#15529F] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
