"use client";

// Technology icon images
const TechIcon = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => <img src={src} alt={alt} className={className} />;

export function TechStack() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900">
      <div className="container-base max-w-6xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-white">
            Technology &{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Architecture
            </span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A modern approach to container management, built with performance
            and developer experience in mind
          </p>
        </div>

        {/* Architecture Stack Section */}
        <div className="mb-8 sm:mb-12">
          <div className="space-y-4 p-4">
            {/* Tauri Application Layer */}
            <div className="p-4 rounded-lg border-2 transition-all duration-300 hover:bg-opacity-80 hover:shadow-lg bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-between ring-purple-200 dark:ring-purple-800 shadow-lg">
              <div className="flex flex-col h-auto sm:h-32 justify-center w-full space-y-4 sm:space-y-6">
                {/* Top: Nookat app logo and label */}
                <div className="flex items-center justify-center space-x-3">
                  <TechIcon src="/logo.png" alt="Nookat" className="w-8 h-8" />
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    Nookat app
                  </span>
                </div>

                {/* Bottom: All technology icons including Tauri */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-2 rounded-lg">
                    <TechIcon
                      src="/tech-icons/tauri.png"
                      alt="Tauri"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      Tauri
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
                    <TechIcon
                      src="/tech-icons/react.png"
                      alt="React"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      React
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
                    <TechIcon
                      src="/tech-icons/type-script.png"
                      alt="TypeScript"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      TypeScript
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-lg">
                    <TechIcon
                      src="/tech-icons/rust.png"
                      alt="Rust"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      Rust
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-lg">
                    <TechIcon
                      src="/tech-icons/bollard-rs.png"
                      alt="Bollard"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      Bollard
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Container Runtime Layer */}
            <div className="p-4 rounded-lg border-2 transition-all duration-300 hover:bg-opacity-80 hover:shadow-lg bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-between ring-cyan-200 dark:ring-cyan-800 shadow-lg">
              <div className="flex flex-col h-auto sm:h-32 justify-center w-full space-y-4 sm:space-y-6">
                {/* Top: Container Runtime title */}
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    Container Runtimes
                  </span>
                </div>

                {/* Bottom: Container technology icons */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                  <div className="flex items-center justify-center px-4 py-3">
                    <TechIcon
                      src="/tech-icons/docker-logo-blue.png"
                      alt="Docker"
                      className="h-6 w-auto"
                    />
                  </div>
                  <div className="flex items-center justify-center px-4 py-3">
                    <TechIcon
                      src="/tech-icons/colima-removebg.png"
                      alt="Colima"
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="flex items-center justify-center px-4 py-3">
                    <TechIcon
                      src="/tech-icons/lima.png"
                      alt="Lima"
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Operating System Layer */}
            <div className="p-4 rounded-lg border-2 transition-all duration-300 hover:bg-opacity-80 hover:shadow-lg bg-gray-50 dark:bg-gray-950/30 text-gray-600 dark:text-gray-400 flex items-center justify-between ring-gray-200 dark:ring-gray-800 shadow-lg">
              <div className="flex flex-col h-auto sm:h-32 justify-center w-full space-y-4 sm:space-y-6">
                {/* Top: Operating System title */}
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                    Operating Systems
                  </span>
                </div>

                {/* Bottom: Operating System icons */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                  <div className="flex items-center justify-center px-4 py-3 group relative">
                    <TechIcon
                      src="/tech-icons/windows.png"
                      alt="Windows"
                      className="h-6 w-auto grayscale opacity-60"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      Coming soon
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-200"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center px-4 py-3">
                    <TechIcon
                      src="/tech-icons/macos.png"
                      alt="macOS"
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="flex items-center justify-center px-4 py-3">
                    <TechIcon
                      src="/tech-icons/ubuntu.png"
                      alt="Ubuntu"
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
