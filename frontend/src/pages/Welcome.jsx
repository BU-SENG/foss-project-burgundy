export default function Welcome() {
  return (
   <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden
                 bg-[#120F22]                                        /* BASE COLOR: Your custom dark blue */
                 bg-linear-to-br from-[#120F22] via-[#120F22] to-[#120F22] /* Subtle background gradient (kept monochromatic for max darkness) */
                 bg-size-[200%_200%]                               /* Makes the gradient larger for animation */
                 animate-[bg-shift_20s_ease_infinite]               /* Custom animation for the background */
                 "
     
      style={{
        animationName: 'bg-shift',
        '@keyframes bg-shift': {
          '0%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '50% 50%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '50% 50%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      }}
    >
      
     
      <div className="flex-1 flex flex-col justify-end p-8">
        
        <div className="w-full max-w-md mx-auto">
          
          
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              Connect With Someone Who Understands
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-300">
              Chat with Ai-matched Buddies Based on your Mood
            </p>
          </div>

        
          <div className="mt-10 flex flex-col gap-y-4">
            
            
            <a
              href="/register"
              className="w-full rounded-full bg-[#3713EC] px-4 py-3 text-center text-base font-semibold text-white shadow-lg hover:bg-sky-400  focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Start Your Journey
            </a>
            
            <a
              href="/login"
              className="w-full rounded-full border border-white/40 bg-transparent px-4 py-3 text-center text-base font-semibold text-white shadow-lg hover:bg-white/10  focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Log In
            </a>
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            Join 10,000+ People Finding Support
          </p>
        </div>
      </div>
    </div>
  );
}
