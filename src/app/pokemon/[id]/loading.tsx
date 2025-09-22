export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header skeleton */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-8 bg-white/20 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 bg-white/20 rounded w-16 animate-pulse"></div>
                <div className="h-8 bg-white/20 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image and basic info skeleton */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-64 h-64 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="space-y-6">
                <div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-200 rounded-full h-2 animate-pulse"></div>
                        </div>
                        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evolutions skeleton */}
                <div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                  <div className="flex flex-wrap gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200"
                      >
                        <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
