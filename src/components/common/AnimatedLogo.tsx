export default function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="relative group logo-container">
        <div className="glow-bg absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse transition-opacity duration-1000"></div>

        <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl glow-effect">
          <div className="flex items-center justify-center mb-6 relative">
            <div className="relative brain-icon">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-400 brain-pulse drop-shadow-lg"
              >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                <path d="M6 18a4 4 0 0 1-1.967-.516" />
                <path d="M19.967 17.484A4 4 0 0 1 18 18" />
              </svg>

              <div className="absolute -top-2 -right-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400 lightning-bounce drop-shadow-lg"
                >
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
                </svg>
              </div>

              <div className="absolute inset-0 -m-4">
                <div className="w-24 h-24 border-2 border-cyan-400/30 rounded-full energy-ring-1"></div>
                <div className="absolute inset-2 w-20 h-20 border-2 border-purple-400/30 rounded-full energy-ring-2"></div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2 tracking-tight">
              Eduaigen
            </h1>
            <p className="text-gray-300 text-lg font-medium tracking-wide">
              Educational AI Generator
            </p>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <div
              className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-8 left-8 w-1 h-1 bg-pink-400 rounded-full particle-float-1"></div>
          <div className="absolute top-12 right-12 w-1 h-1 bg-cyan-400 rounded-full particle-float-2"></div>
          <div className="absolute bottom-8 left-12 w-1 h-1 bg-purple-400 rounded-full particle-float-3"></div>
          <div className="absolute bottom-12 right-8 w-1 h-1 bg-yellow-400 rounded-full particle-float-4"></div>
        </div>
      </div>

      <div className="mt-8 text-center max-w-md px-4">
        <p className="text-gray-400 text-sm leading-relaxed">
          Empowering education through artificial intelligence and creative
          content generation
        </p>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400/20 rounded-full animate-ping"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"
          style={{ animationDelay: '2s', animationDuration: '3s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-1 h-1 bg-purple-400/25 rounded-full animate-ping"
          style={{ animationDelay: '1s', animationDuration: '5s' }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-yellow-400/20 rounded-full animate-ping"
          style={{ animationDelay: '3s', animationDuration: '4s' }}
        ></div>
      </div>
    </div>
  );
}
