
import React, { useState } from 'react';
import { Download, Search, Loader2, ExternalLink } from 'lucide-react';
import AdSlot from '../../components/AdSlot';

const ThumbnailDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState(false);

  const extractId = () => {
    setLoading(true);
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      setVideoId(match[1]);
    } else {
      alert("Invalid YouTube URL");
      setVideoId('');
    }
    setLoading(false);
  };

  const qualities = [
    { label: 'Maximum Resolution (HD)', path: 'maxresdefault.jpg' },
    { label: 'High Quality', path: 'hqdefault.jpg' },
    { label: 'Medium Quality', path: 'mqdefault.jpg' },
    { label: 'Standard Quality', path: 'sddefault.jpg' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-red-600 text-white p-8 rounded-[40px] shadow-xl shadow-red-600/20">
        <h1 className="text-2xl font-black">Thumbnail Downloader</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-widest mt-1">Extract 4K thumbnails instantly</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">YouTube Video Link</label>
          <input 
            value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL here..."
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-3xl outline-none font-bold text-sm border-2 border-transparent focus:border-red-600/20 transition-all"
          />
        </div>
        <button 
          onClick={extractId} 
          disabled={loading} 
          className="w-full bg-red-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />} Get Thumbnails
        </button>
      </div>

      <AdSlot type="Inline" />

      {videoId && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-900">
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
              alt="Thumbnail Preview"
              className="w-full h-auto aspect-video object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {qualities.map((q, idx) => (
              <a 
                key={idx}
                href={`https://img.youtube.com/vi/${videoId}/${q.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between group hover:border-red-600 transition-all"
              >
                <div>
                  <h4 className="font-black text-sm">{q.label}</h4>
                  <p className="text-[10px] text-zinc-400">Direct CDN Link</p>
                </div>
                <Download size={18} className="text-zinc-300 group-hover:text-red-600" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailDownloader;
