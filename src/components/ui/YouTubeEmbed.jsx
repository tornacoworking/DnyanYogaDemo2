/**
 * YouTubeEmbed.jsx
 * A lightweight YouTube video: shows the video thumbnail with a play button, and only
 * loads the real YouTube player after the visitor clicks.
 * WHY: a normal YouTube embed downloads about 1 MB of scripts per video even if nobody
 * presses play, which hurts page speed and Lighthouse scores.
 * Used on: /testimonials (video testimonials).
 */
import { useState } from "react";
import { Play } from "lucide-react";

/**
 * @param {Object} props
 * @param {string} props.videoId YouTube video ID (the part after "youtu.be/")
 * @param {string} props.title   Describes the video for screen readers
 */
export default function YouTubeEmbed({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-900 shadow-card">
      {isPlaying ? (
        // youtube-nocookie.com: privacy-friendly version that sets no cookies until play
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {/* The thumbnail image comes from YouTube's server */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            width={480}
            height={360}
            className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-saffron-600 text-white shadow-card-hover transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7" aria-hidden="true" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
