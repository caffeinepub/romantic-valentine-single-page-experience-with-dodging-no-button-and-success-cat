import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function ValentinePage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonPositioned, setIsNoButtonPositioned] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe bounds with margins
    const margin = 20;
    const maxX = container.width - button.width - margin * 2;
    const maxY = container.height - button.height - margin * 2;

    // Generate random position within safe bounds
    const newX = Math.random() * maxX + margin;
    const newY = Math.random() * maxY + margin;

    setNoButtonPosition({ x: newX, y: newY });
    setIsNoButtonPositioned(true);
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  // Handle window resize to keep button in bounds
  useEffect(() => {
    const handleResize = () => {
      if (isNoButtonPositioned) {
        moveNoButton();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNoButtonPositioned]);

  if (showSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-medium to-romantic-accent p-4 overflow-hidden">
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="space-y-4">
            <Heart className="w-20 h-20 mx-auto text-romantic-dark animate-pulse" fill="currentColor" />
            <h1 className="text-5xl md:text-7xl font-bold text-romantic-dark tracking-tight">
              Good choice
            </h1>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-romantic-accent/30 blur-3xl rounded-full" />
            <img
              src="/assets/generated/couple-cats.dim_1024x1024.png"
              alt="Cute couple cats celebrating love"
              className="relative rounded-3xl shadow-2xl w-full h-auto border-4 border-white/50"
            />
          </div>
          <div className="flex gap-2 justify-center items-center text-romantic-dark/70 text-lg">
            <Heart className="w-5 h-5" fill="currentColor" />
            <Heart className="w-4 h-4" fill="currentColor" />
            <Heart className="w-3 h-3" fill="currentColor" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-medium to-romantic-accent p-4 overflow-hidden relative"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-romantic-accent/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border-4 border-romantic-accent/30">
          {/* Header with hearts */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-3">
              <Heart className="w-12 h-12 text-romantic-dark animate-pulse" fill="currentColor" />
              <Heart className="w-16 h-16 text-romantic-dark animate-pulse" fill="currentColor" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-12 h-12 text-romantic-dark animate-pulse" fill="currentColor" style={{ animationDelay: '0.4s' }} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-romantic-dark tracking-tight leading-tight">
              Will you be my Valentine?
            </h1>
            <p className="text-xl md:text-2xl text-romantic-dark/70 font-medium">
              Choose wisely... 💕
            </p>
          </div>

          {/* Buttons container */}
          <div className="relative min-h-[200px] flex items-center justify-center">
            {/* Yes button - always centered */}
            <div className="flex gap-6">
              <Button
                onClick={handleYesClick}
                size="lg"
                className="bg-romantic-dark hover:bg-romantic-dark/90 text-white text-2xl px-12 py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-bold"
              >
                Yes! 💖
              </Button>

              {/* No button - positioned absolutely when moved */}
              {!isNoButtonPositioned ? (
                <Button
                  ref={noButtonRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    moveNoButton();
                  }}
                  variant="outline"
                  size="lg"
                  className="border-romantic-dark/30 text-romantic-dark/70 hover:bg-romantic-light text-2xl px-12 py-8 rounded-2xl shadow-lg font-bold"
                >
                  No
                </Button>
              ) : null}
            </div>

            {/* Positioned No button */}
            {isNoButtonPositioned && (
              <Button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveNoButton();
                }}
                variant="outline"
                size="lg"
                className="absolute border-romantic-dark/30 text-romantic-dark/70 hover:bg-romantic-light text-2xl px-12 py-8 rounded-2xl shadow-lg font-bold transition-all duration-300"
                style={{
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                }}
              >
                No
              </Button>
            )}
          </div>

          {/* Footer message */}
          <p className="text-center text-romantic-dark/60 text-sm italic">
            Hint: There's only one right answer 😉
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-romantic-dark/50 text-sm">
        © 2026. Built with <Heart className="inline w-4 h-4 mx-1" fill="currentColor" /> using{' '}
        <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-romantic-dark transition-colors underline">
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
