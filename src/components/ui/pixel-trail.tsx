"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { useDimensions } from "@/components/hooks/use-debounced-dimensions";

interface PixelTrailProps {
  pixelSize?: number;
  delay?: number;
  fadeDuration?: number;
  pixelClassName?: string;
}

export function PixelTrail({
  pixelSize = 80,
  delay = 1200,
  fadeDuration = 0,
  pixelClassName = "",
}: PixelTrailProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pixelsRef = useRef<{ id: string; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      mouseX.set(relativeX - pixelSize / 2);
      mouseY.set(relativeY - pixelSize / 2);

      pixelsRef.current.push({
        id: uuidv4(),
        x: relativeX - pixelSize / 2,
        y: relativeY - pixelSize / 2,
      });

      if (pixelsRef.current.length > 20) {
        pixelsRef.current = pixelsRef.current.slice(-20);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, pixelSize]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <motion.div
        className={`absolute ${pixelClassName}`}
        style={{
          width: pixelSize,
          height: pixelSize,
          x,
          y,
        }}
      />
      {pixelsRef.current.map((pixel, i) => (
        <motion.div
          key={pixel.id}
          className={`absolute ${pixelClassName}`}
          style={{
            width: pixelSize,
            height: pixelSize,
            x: pixel.x,
            y: pixel.y,
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: fadeDuration,
            delay: (delay / 1000) * (i / pixelsRef.current.length),
          }}
        />
      ))}
    </div>
  );
}

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const controls = useAnimationControls()

    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      })
    }, [])

    // Attach the animatePixel function to the DOM element
    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          ;(node as any).__animatePixel = animatePixel
        }
      },
      [animatePixel]
    )

    return (
      <motion.div
        id={id}
        ref={ref}
        className={cn("cursor-pointer-none", className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
      />
    )
  }
)

PixelDot.displayName = "PixelDot"