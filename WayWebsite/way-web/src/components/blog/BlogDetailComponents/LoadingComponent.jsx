import { memo } from "react";


export const LoadingComponent = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Məqalə yüklənir...</p>
    </div>
  </div>
));