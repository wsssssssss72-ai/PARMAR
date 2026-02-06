
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { data } from '../data';

const ClassPage: React.FC = () => {
  const { courseId, subjectId } = useParams<{ courseId: string; subjectId: string }>();
  const course = data.courses.find(c => c.id === courseId);
  const subject = course?.subjects.find(s => s.id === subjectId);
  
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
    setProgress(0);
    setIsBuffering(false);
  }, [activeVideoIndex]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = window.setTimeout(() => {
        if (isPlaying && !isDragging) setShowControls(false);
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, isDragging]);

  if (!course || !subject) {
    return <Navigate to="/" replace />;
  }

  const currentVideo = subject.videos[activeVideoIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
    setShowSpeedMenu(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (videoRef.current) {
      const time = (val / 100) * (videoRef.current.duration || 0);
      videoRef.current.currentTime = time;
    }
  };

  const onSeekMouseDown = () => {
    setIsDragging(true);
  };

  const onSeekMouseUp = () => {
    setIsDragging(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
      videoRef.current.muted = v === 0;
      setIsMuted(v === 0);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    }
  };

  const togglePiP = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.error("Picture-in-Picture failed:", error);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0 
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-slate-950 animate-[fadeIn_0.3s_ease-out]">
      {/* Enhanced Video Player Container */}
      <div className="flex-grow bg-black relative group order-1 lg:order-2 flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          src={currentVideo.url} 
          className="w-full max-h-full aspect-video cursor-pointer"
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          onPlay={() => { setIsPlaying(true); setIsBuffering(false); }}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onCanPlay={() => setIsBuffering(false)}
          onStalled={() => setIsBuffering(true)}
          onLoadStart={() => setIsBuffering(true)}
          poster={currentVideo.thumbnail}
        />

        {/* Subtle Gradient Overlays for better contrast */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none transition-opacity duration-500 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`} />

        {/* Prominent Buffering Indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none bg-black/10 backdrop-blur-[1px]">
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute w-12 h-12 border-4 border-white/10 border-b-white/40 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
            </div>
          </div>
        )}

        {/* Center Play/Pause Indicator Overlay */}
        {!isPlaying && !isBuffering && (
          <button 
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-20 h-20 bg-indigo-600/90 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {/* Custom Premium Controls Bar */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 lg:p-6 transition-all duration-500 transform ${showControls || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} z-30`}>
          <div className="max-w-4xl mx-auto flex flex-col gap-3">
            
            {/* Draggable Progress Bar Container */}
            <div className="relative group/progress h-2 w-full bg-white/20 rounded-full cursor-pointer">
              <input 
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onMouseDown={onSeekMouseDown}
                onTouchStart={onSeekMouseDown}
                onMouseUp={onSeekMouseUp}
                onTouchEnd={onSeekMouseUp}
                onChange={handleSeekChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              {/* Visual Track */}
              <div 
                className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              >
                {/* Scrubber Thumb */}
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-transform ${isDragging ? 'scale-125' : 'scale-0 group-hover/progress:scale-100'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Play/Pause */}
                <button onClick={togglePlay} className="hover:text-indigo-400 transition-colors">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-3 group/volume">
                  <button onClick={toggleMute} className="hover:text-indigo-400 transition-colors">
                    {isMuted || volume === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 group-hover/volume:w-20 transition-all duration-300 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-indigo-500 overflow-hidden"
                  />
                </div>

                {/* Time Display */}
                <div className="text-sm font-medium tabular-nums opacity-90">
                  <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                  <span className="mx-1 opacity-50">/</span>
                  <span className="opacity-70">{currentVideo.duration}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {/* Speed Control */}
                <div className="relative">
                  <button 
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/10 flex items-center gap-1 min-w-[50px] justify-center"
                  >
                    {playbackSpeed}x
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full mb-3 right-0 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[100px] py-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between ${playbackSpeed === speed ? 'text-indigo-400 bg-white/5' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                        >
                          {speed}x
                          {playbackSpeed === speed && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/10">
                  1080p
                </button>
                {/* PiP Button */}
                <button onClick={togglePiP} className="hover:text-indigo-400 transition-colors" title="Picture in Picture">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11h-8v5h8v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  </svg>
                </button>
                <button onClick={toggleFullscreen} className="hover:text-indigo-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Playlist - Refined UI */}
      <div className="w-full lg:w-[420px] bg-slate-50 border-l border-slate-200 flex flex-col order-2 lg:order-1 shadow-inner overflow-hidden">
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
              Course Content
            </span>
            <span className="text-slate-400 text-xs font-medium">
              {activeVideoIndex + 1} / {subject.videos.length} Lectures
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            {subject.name}
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar p-3 space-y-2 bg-slate-50/50">
          {subject.videos.map((video, index) => {
            const isActive = index === activeVideoIndex;
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideoIndex(index)}
                className={`w-full text-left p-3 rounded-2xl transition-all flex gap-4 group relative ${
                  isActive 
                  ? 'bg-white shadow-lg shadow-indigo-100/50 border-indigo-100 ring-2 ring-indigo-500/10' 
                  : 'hover:bg-white hover:shadow-sm border-transparent'
                } border`}
              >
                <div className="relative w-28 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200">
                  <img src={video.thumbnail} alt={video.title} className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {isActive && (
                    <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center backdrop-blur-[1px]">
                       <div className="flex gap-1 items-end h-4">
                         <div className="w-1 bg-white animate-[equalizer_0.8s_ease-in-out_infinite]"></div>
                         <div className="w-1 bg-white animate-[equalizer_0.8s_ease-in-out_infinite_0.2s]"></div>
                         <div className="w-1 bg-white animate-[equalizer_0.8s_ease-in-out_infinite_0.4s]"></div>
                       </div>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-white px-1.5 py-0.5 rounded-md backdrop-blur-sm font-medium">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex flex-col justify-center min-w-0 pr-4">
                  <h4 className={`text-sm font-bold truncate leading-tight ${isActive ? 'text-indigo-600' : 'text-slate-700'}`}>
                    {index + 1}. {video.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    {isActive ? (
                      <span className="text-[10px] font-bold text-indigo-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        Now Playing
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400">Available</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Completion Status Footer */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-50">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {Math.round(((activeVideoIndex + 1) / subject.videos.length) * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-indigo-50">
              <div 
                style={{ width: `${((activeVideoIndex + 1) / subject.videos.length) * 100}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes equalizer {
          0% { height: 20%; }
          50% { height: 100%; }
          100% { height: 20%; }
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background: #6366f1;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default ClassPage;
