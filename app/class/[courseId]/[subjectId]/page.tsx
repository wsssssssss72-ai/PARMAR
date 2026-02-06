
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { data } from '@/data';

export default function ClassView() {
  const { courseId, subjectId } = useParams();
  const router = useRouter();
  const course = data.courses.find(c => c.id === courseId);
  const subject = course?.subjects.find(s => s.id === subjectId);
  
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying) videoRef.current.play().catch(() => {});
    }
    setProgress(0);
    setIsBuffering(false);
  }, [activeVideoIndex]);

  if (!course || !subject) return <div className="p-20 text-center">Not found</div>;

  const currentVideo = subject.videos[activeVideoIndex];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100 || 0);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (videoRef.current) {
      videoRef.current.currentTime = (val / 100) * (videoRef.current.duration || 0);
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
        console.error("PiP error:", error);
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

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-slate-950 overflow-hidden">
      {/* Dynamic Video Stage */}
      <div className="flex-grow bg-black relative group order-1 lg:order-2 flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          src={currentVideo.url} 
          className="w-full h-full object-contain cursor-pointer shadow-2xl"
          onTimeUpdate={handleTimeUpdate}
          onClick={() => {
            togglePlay();
            setShowSpeedMenu(false);
          }}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onCanPlay={() => setIsBuffering(false)}
          onStalled={() => setIsBuffering(true)}
          onLoadStart={() => setIsBuffering(true)}
          onPlay={() => { setIsPlaying(true); setIsBuffering(false); }}
          onPause={() => setIsPlaying(false)}
          poster={currentVideo.thumbnail}
        />

        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none transition-opacity duration-500 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`} />

        {/* Prominent Buffering Indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none bg-black/10 backdrop-blur-[1px]">
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 border-[6px] border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute w-14 h-14 border-[4px] border-white/10 border-b-white/40 rounded-full animate-[spin_1.2s_linear_infinite_reverse]"></div>
            </div>
          </div>
        )}

        {!isPlaying && !isBuffering && (
          <button onClick={togglePlay} className="absolute inset-0 m-auto w-24 h-24 bg-indigo-600/95 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
        )}

        {/* Premium Control Hub */}
        <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ${showControls || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} z-30`}>
          <div className="max-w-4xl mx-auto">
            {/* Draggable Progress Bar */}
            <div className="relative h-2 w-full bg-white/20 rounded-full mb-6 cursor-pointer group/seek">
              <input 
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchEnd={() => setIsDragging(false)}
                onChange={handleSeekChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-75" style={{ width: `${progress}%` }} />
              <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl transition-transform ${isDragging ? 'scale-125' : 'scale-0 group-hover/seek:scale-100'}`} style={{ left: `${progress}%` }} />
            </div>
            
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-8">
                <button onClick={togglePlay} className="hover:text-indigo-400 transition-colors">
                  {isPlaying ? (
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <div className="text-sm font-black tracking-widest uppercase opacity-80">
                  Lecture 0{activeVideoIndex + 1} • {currentVideo.duration}
                </div>
              </div>
              <div className="flex items-center gap-6">
                 {/* Speed Control */}
                 <div className="relative">
                   <button 
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-xs font-black bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/10 flex items-center gap-1 min-w-[50px] justify-center"
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

                 <button className="text-xs font-black border-2 border-white/20 px-3 py-1 rounded-lg hover:bg-white hover:text-black transition-all">HD</button>
                 <button onClick={togglePiP} className="hover:text-indigo-400 transition-colors" title="Picture in Picture">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11h-8v5h8v-5z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                   </svg>
                 </button>
                 <button onClick={() => videoRef.current?.requestFullscreen()} className="hover:scale-110 transition-transform">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Sidebar Playlist */}
      <div className="w-full lg:w-[440px] bg-white border-l border-slate-200 flex flex-col order-2 lg:order-1 shadow-2xl relative">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Course Path</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">{subject.name}</h2>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-3">
          {subject.videos.map((video, index) => {
            const isActive = index === activeVideoIndex;
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideoIndex(index)}
                className={`w-full text-left p-4 rounded-[1.5rem] transition-all flex gap-5 group relative border-2 ${
                  isActive 
                  ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-200 text-white' 
                  : 'bg-white border-slate-50 hover:border-indigo-100 hover:shadow-lg text-slate-700'
                }`}
              >
                <div className="relative w-24 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900/10">
                  <img src={video.thumbnail} className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-125' : 'group-hover:scale-110'}`} />
                  {isActive && <div className="absolute inset-0 bg-indigo-600/30 backdrop-blur-[2px] flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full animate-ping" /></div>}
                </div>
                
                <div className="flex flex-col justify-center min-w-0">
                  <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>Part 0{index + 1}</span>
                  <h4 className="text-sm font-bold truncate pr-2">{video.title}</h4>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-200">
           <div className="flex items-center justify-between mb-4">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subject Goal</span>
             <span className="text-xs font-black text-indigo-600">{Math.round(((activeVideoIndex+1)/subject.videos.length)*100)}%</span>
           </div>
           <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-600 transition-all duration-1000 ease-out" style={{ width: `${((activeVideoIndex+1)/subject.videos.length)*100}%` }} />
           </div>
        </div>
      </div>
    </div>
  );
}
