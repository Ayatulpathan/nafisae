'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { AnimationType } from '@/types/product';
import { Play, Pause, RefreshCw, Volume2, VolumeX, Eye } from 'lucide-react';

export interface VideoModelViewerProps {
  modelId?: string;
  productId: string;
  videoSrc?: string;
  posterSrc?: string;
  animationType: AnimationType;
  onAnimationEnd?: () => void;
  className?: string;
}

export default function VideoModelViewer({
  modelId = 'MODEL-A01',
  productId,
  videoSrc,
  posterSrc,
  animationType,
  onAnimationEnd,
  className = '',
}: VideoModelViewerProps) {
  // Double-buffering state: active buffer is 'A' or 'B'
  const [activeBuffer, setActiveBuffer] = useState<'A' | 'B'>('A');
  const [srcA, setSrcA] = useState<string>(videoSrc || '/videos/models/default-idle.mp4');
  const [srcB, setSrcB] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);

  // When videoSrc or animationType changes, load into the inactive buffer and cross-fade
  useEffect(() => {
    const targetSrc = videoSrc || `/videos/models/default-${animationType}.mp4`;
    setHasError(false);

    if (activeBuffer === 'A') {
      // Buffer B becomes the incoming video
      setSrcB(targetSrc);
      setIsTransitioning(true);
      setIsLoading(true);
    } else {
      // Buffer A becomes the incoming video
      setSrcA(targetSrc);
      setIsTransitioning(true);
      setIsLoading(true);
    }
  }, [videoSrc, animationType, productId]);

  const handleCanPlay = useCallback((buffer: 'A' | 'B') => {
    setIsLoading(false);
    // When incoming buffer is ready, switch active buffer
    if (buffer !== activeBuffer) {
      setActiveBuffer(buffer);
      setIsTransitioning(false);
    }
  }, [activeBuffer]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const togglePlay = () => {
    const currentVideo = activeBuffer === 'A' ? videoRefA.current : videoRefB.current;
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
        setIsPlaying(true);
      } else {
        currentVideo.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {/* Studio Lighting Background Aura */}
      <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-black/5 pointer-events-none" />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-ping" />
            <span className="text-[7px] tracking-[0.3em] uppercase text-black/30">
              Synchronizing Model Loop...
            </span>
          </div>
        </div>
      )}

      {/* Buffer Video A */}
      {srcA && (
        <video
          ref={videoRefA}
          key={`bufA-${productId}`}
          src={srcA}
          poster={posterSrc || srcA.replace('.mp4', '.jpg')}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => handleCanPlay('A')}
          onError={handleError}
          onEnded={onAnimationEnd}
          className={`absolute h-full max-h-[94%] object-contain transition-opacity duration-500 will-change-transform ${
            activeBuffer === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
      )}

      {/* Buffer Video B */}
      {srcB && (
        <video
          ref={videoRefB}
          key={`bufB-${productId}`}
          src={srcB}
          poster={posterSrc || srcB.replace('.mp4', '.jpg')}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => handleCanPlay('B')}
          onError={handleError}
          onEnded={onAnimationEnd}
          className={`absolute h-full max-h-[94%] object-contain transition-opacity duration-500 will-change-transform ${
            activeBuffer === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
      )}

      {/* Fallback Poster when video encounters network error */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <div className="w-36 h-64 bg-gradient-to-b from-[#e5e5e0] to-[#d0d0cb] flex items-center justify-center text-[7px] uppercase tracking-widest text-black/30">
            Editorial Still
          </div>
          <span className="text-[7px] tracking-[0.2em] uppercase text-black/40 mt-3">
            Offline Mode / Static Silhouette Active
          </span>
        </div>
      )}

      {/* Model Cast Badge Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-[7px] tracking-[0.3em] uppercase text-black/50 font-semibold">
          {modelId} · {animationType.toUpperCase()}
        </span>
      </div>

      {/* Video Playback Controls (Hover Overlay) */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity">
        <button
          onClick={togglePlay}
          className="bg-black/80 hover:bg-black text-white p-2 text-[7px] transition-colors"
          title={isPlaying ? 'Pause Loop' : 'Play Loop'}
        >
          {isPlaying ? <Pause size={10} /> : <Play size={10} />}
        </button>
      </div>

      {/* Shadow Floor Anchor */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-3 bg-black/10 rounded-[100%] blur-[4px] pointer-events-none" />
    </div>
  );
}
