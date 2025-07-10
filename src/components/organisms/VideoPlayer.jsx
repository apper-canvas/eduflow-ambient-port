import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

const VideoPlayer = ({ 
  src, 
  poster, 
  title, 
  onProgress, 
  onComplete, 
  className, 
  ...props 
}) => {
const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [videoError, setVideoError] = useState(null)
  const [videoLoading, setVideoLoading] = useState(false)

  // Helper function to extract video error details
  const extractVideoError = (error) => {
    // Handle video element error events
    if (error?.target?.error) {
      const mediaError = error.target.error
      return {
        code: mediaError.code,
        message: getMediaErrorMessage(mediaError.code),
        type: 'media_error',
        timestamp: new Date().toISOString()
      }
    }
    
    // Handle network/fetch errors
    if (error?.message) {
      return {
        message: error.message,
        type: 'network_error',
        timestamp: new Date().toISOString()
      }
    }
    
    // Handle generic errors
    return {
      message: 'An unknown video error occurred',
      type: 'unknown_error',
      timestamp: new Date().toISOString()
    }
  }

  // Helper function to get media error message
  const getMediaErrorMessage = (code) => {
    switch (code) {
      case 1: return 'Video loading was aborted'
      case 2: return 'Network error occurred while loading video'
      case 3: return 'Video format is not supported or corrupted'
      case 4: return 'Video source is not available'
      default: return 'Unknown video error occurred'
    }
  }

  // Event handlers - moved outside useEffect to be accessible throughout component
  const updateTime = () => {
    const video = videoRef.current
    if (!video) return
    
    setCurrentTime(video.currentTime)
    setIsPlaying(!video.paused)
    if (onProgress) {
      onProgress(video.currentTime, video.duration)
    }
  }

  const updateDuration = () => {
    const video = videoRef.current
    if (!video) return
    
    setDuration(video.duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    if (onComplete) {
      onComplete()
    }
  }

  const handleError = (e) => {
    const errorDetails = extractVideoError(e)
    console.error('Video error:', errorDetails)
    setVideoError(errorDetails)
    setIsPlaying(false)
    setVideoLoading(false)
  }

  const handleLoadStart = () => {
    setVideoLoading(true)
    setVideoError(null)
  }

  const handleLoadedData = () => {
    setVideoLoading(false)
  }

  const retryVideo = () => {
    setVideoError(null)
    setVideoLoading(true)
    if (videoRef.current) {
      videoRef.current.load()
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleLoadedData)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleLoadedData)
    }
  }, [onProgress, onComplete])
const togglePlay = () => {
    const video = videoRef.current
    if (!video || videoError) return

    if (video.paused) {
      video.play().catch(err => {
        const errorInfo = {
          message: err.message || 'Failed to play video',
          name: err.name || 'PlayError',
          type: 'play_error',
          timestamp: new Date().toISOString()
        }
        console.error('Play failed:', errorInfo)
        setVideoError(errorInfo)
      })
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    if (!video || videoError) return
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
<div
    className={cn("relative bg-black rounded-lg overflow-hidden group", className)}
    onMouseEnter={() => setShowControls(true)}
    onMouseLeave={() => setShowControls(false)}
    {...props}>
    {/* Video Element */}
{!videoError ? <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-cover"
        preload="metadata">
        {/* Primary source */}
        {src && <source src={src} type="video/mp4" />}
        {/* Fallback sources for different formats */}
        {src && <>
            <source src={src.replace(".mp4", ".webm")} type="video/webm" />
            <source src={src.replace(".mp4", ".ogv")} type="video/ogg" />
        </>}
        {/* Fallback text for browsers that don't support video */}Your browser does not support the video tag.
                </video> : <div
        className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-8">
            <ApperIcon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-400" />
            <h3 className="text-lg font-semibold mb-2">Video Unavailable</h3>
            <p className="text-sm text-gray-300 mb-4">
                {videoError?.message || "This video cannot be played. It may be temporarily unavailable or in an unsupported format."}
            </p>
            {videoError?.code && <p className="text-xs text-gray-400 mb-4">Error Code: {videoError.code}
            </p>}
            <Button
                variant="outline"
                size="sm"
                onClick={retryVideo}
                className="text-white border-white hover:bg-white hover:text-gray-900">
                <ApperIcon name="RefreshCw" size={16} className="mr-2" />Retry
                            </Button>
            <Button
                variant="outline"
size="sm"
                onClick={retryVideo}
                className="text-white border-white hover:bg-white hover:text-black ml-2">Try Again
                            </Button>
        </div>
    </div>}
    {/* Loading Overlay */}
    {videoLoading && !videoError && <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="text-center text-white">
            <div
                className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-sm">Loading video...</p>
        </div>
    </div>}
    {/* Play Button Overlay */}
    {!isPlaying && !videoLoading && !videoError && <motion.div
        initial={{
            opacity: 0,
            scale: 0.8
        }}
        animate={{
            opacity: 1,
            scale: 1
        }}
        className="absolute inset-0 flex items-center justify-center bg-black/20">
        <Button
            variant="primary"
            size="lg"
            onClick={togglePlay}
            className="rounded-full w-16 h-16 p-0 shadow-lg">
            <ApperIcon name="Play" size={24} className="ml-1" />
        </Button>
    </motion.div>}
    {/* Controls */}
    <motion.div
        initial={{
            opacity: 0,
            y: 20
        }}
        animate={{
            opacity: showControls ? 1 : 0,
            y: showControls ? 0 : 20
        }}
        transition={{
            duration: 0.2
        }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div
            className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
            onClick={handleSeek}>
            <div
                className="h-full bg-primary-500 rounded-full transition-all duration-200"
                style={{
                    width: `${progressPercentage}%`
                }} />
        </div>
        {/* Control Buttons */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    className="text-white hover:text-white hover:bg-white/20 p-2">
                    <ApperIcon name={isPlaying ? "Pause" : "Play"} size={20} />
                </Button>
                <div className="flex items-center gap-2">
                    <ApperIcon name="Volume2" size={16} className="text-white" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div className="text-white text-sm">
                    {formatTime(currentTime)}/ {formatTime(duration)}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="text-white hover:text-white hover:bg-white/20 p-2">
                    <ApperIcon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
                </Button>
            </div>
        </div>
    </motion.div>
    {/* Title Overlay */}
    {title && <div className="absolute top-4 left-4 right-4">
        <h3 className="text-white font-display font-semibold text-lg drop-shadow-lg">
            {title}
        </h3>
    </div>}
</div>
  );
};

export default VideoPlayer;