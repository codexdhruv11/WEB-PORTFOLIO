import { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  className = ''
}: SquaresProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const offsetRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      ctx.scale(dpr, dpr);
    };

    const drawSquare = (x: number, y: number, isHovered: boolean) => {
      if (isHovered) {
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(x, y, squareSize, squareSize);
      }
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(x, y, squareSize, squareSize);
    };

    const render = () => {
      if (!canvas || !ctx) return;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Update offset based on direction
      switch (direction) {
        case 'right':
          offsetRef.current.x += speed;
          break;
        case 'left':
          offsetRef.current.x -= speed;
          break;
        case 'up':
          offsetRef.current.y -= speed;
          break;
        case 'down':
          offsetRef.current.y += speed;
          break;
        case 'diagonal':
          offsetRef.current.x += speed;
          offsetRef.current.y += speed;
          break;
      }

      // Keep offset within bounds
      offsetRef.current.x = offsetRef.current.x % squareSize;
      offsetRef.current.y = offsetRef.current.y % squareSize;

      // Calculate grid dimensions
      const cols = Math.ceil(width / squareSize) + 2;
      const rows = Math.ceil(height / squareSize) + 2;

      // Draw grid
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * squareSize - offsetRef.current.x;
          const y = row * squareSize - offsetRef.current.y;

          const mouseCol = Math.floor((mouseRef.current.x + offsetRef.current.x) / squareSize);
          const mouseRow = Math.floor((mouseRef.current.y + offsetRef.current.y) / squareSize);
          
          const isHovered = col === mouseCol && row === mouseRow;
          drawSquare(x, y, isHovered);
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    // Set up event listeners
    window.addEventListener('resize', updateCanvasSize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup
    updateCanvasSize();
    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{
        display: 'block',
        touchAction: 'none'
      }}
    />
  );
};

export default Squares; 