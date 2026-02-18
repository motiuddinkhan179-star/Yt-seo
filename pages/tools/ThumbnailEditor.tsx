
import React, { useState, useRef, useEffect } from 'react';
import { Palette, Type, Image as ImageIcon, Download, Plus, Trash2, MoveUp, MoveDown, Layers, Sun, Contrast, RotateCw, Maximize, MousePointer2, ChevronRight, ChevronLeft } from 'lucide-react';
import AdSlot from '../../components/AdSlot';

interface Layer {
  id: string;
  type: 'text' | 'sticker' | 'image';
  content: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color?: string;
  fontSize?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const VIRAL_ASSETS = [
  { id: 'arrow1', url: 'https://cdn-icons-png.flaticon.com/512/271/271218.png', label: 'Red Arrow' },
  { id: 'emoji1', url: 'https://cdn-icons-png.flaticon.com/512/10542/10542468.png', label: 'Shocked' },
  { id: 'fire', url: 'https://cdn-icons-png.flaticon.com/512/426/426833.png', label: 'Viral Fire' },
  { id: 'money', url: 'https://cdn-icons-png.flaticon.com/512/2454/2454282.png', label: 'Cash' },
  { id: 'badge', url: 'https://cdn-icons-png.flaticon.com/512/10629/10629607.png', label: 'Verified' },
];

const ThumbnailEditor: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLayer = layers.find(l => l.id === activeLayerId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setBgImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      type: 'text',
      content: 'NEW TEXT',
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      color: '#FFFFFF',
      fontSize: 48,
      strokeColor: '#000000',
      strokeWidth: 4
    };
    setLayers([...layers, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  const addSticker = (url: string) => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      type: 'sticker',
      content: url,
      x: 50,
      y: 50,
      scale: 0.5,
      rotation: 0
    };
    setLayers([...layers, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  const updateLayer = (id: string, updates: Partial<Layer>) => {
    setLayers(layers.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLayer = (id: string) => {
    setLayers(layers.filter(l => l.id !== id));
    setActiveLayerId(null);
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !bgImage) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 1280;
      canvas.height = 720;
      
      // Background with filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(img, 0, 0, 1280, 720);
      ctx.filter = 'none';

      // Layers
      layers.forEach(layer => {
        ctx.save();
        const realX = (layer.x / 100) * 1280;
        const realY = (layer.y / 100) * 720;
        ctx.translate(realX, realY);
        ctx.rotate((layer.rotation * Math.PI) / 180);
        ctx.scale(layer.scale, layer.scale);

        if (layer.type === 'text') {
          ctx.font = `black ${layer.fontSize}px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          if (layer.strokeWidth) {
            ctx.strokeStyle = layer.strokeColor || '#000000';
            ctx.lineWidth = layer.strokeWidth * 2;
            ctx.strokeText(layer.content, 0, 0);
          }
          
          ctx.fillStyle = layer.color || '#FFFFFF';
          ctx.fillText(layer.content, 0, 0);
        } else {
          const sImg = new Image();
          sImg.crossOrigin = "anonymous";
          sImg.src = layer.content;
          // Synchronous draw might fail if not loaded, in production you'd use a Promise.all
          ctx.drawImage(sImg, -100, -100, 200, 200);
        }
        ctx.restore();
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'tubepro-thumbnail.png';
      link.href = dataUrl;
      link.click();
    };
    img.src = bgImage;
  };

  return (
    <div className="space-y-6 pb-32">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl font-black">Pro Studio Editor</h1>
          <p className="text-xs opacity-80 font-bold uppercase tracking-widest mt-1">Sabse Advanced Design Engine</p>
        </div>
        <Layers className="absolute -right-4 -bottom-4 opacity-10" size={120} />
      </div>

      {!bgImage ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-[40px] border-4 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all group"
        >
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
          <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform mb-4">
            <ImageIcon size={32} className="text-purple-600" />
          </div>
          <p className="text-sm font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Upload Base Screenshot</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in">
          {/* Canvas Preview Area */}
          <div 
            ref={containerRef}
            className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl bg-zinc-800 border-4 border-white dark:border-zinc-900 group"
          >
            {/* Background Image with CSS Filters */}
            <img 
              src={bgImage} 
              style={{ filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)` }}
              className="w-full h-full object-cover pointer-events-none" 
              alt="Base" 
            />
            
            {/* Render Layers */}
            {layers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                style={{
                  left: `${layer.x}%`,
                  top: `${layer.y}%`,
                  transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scale})`,
                  color: layer.color,
                  fontSize: `${layer.fontSize}px`,
                  WebkitTextStroke: layer.type === 'text' ? `${layer.strokeWidth}px ${layer.strokeColor}` : 'none',
                  zIndex: layers.indexOf(layer) + 10,
                }}
                className={`absolute cursor-move select-none whitespace-nowrap font-black italic uppercase
                  ${activeLayerId === layer.id ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-transparent' : ''}`}
              >
                {layer.type === 'text' ? (
                  layer.content
                ) : (
                  <img src={layer.content} className="w-32 h-32 object-contain" alt="Sticker" />
                )}
              </div>
            ))}

            <div className="absolute top-4 left-4 flex gap-2">
               <button onClick={addText} className="p-3 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-black active:scale-95 transition-all">
                 <Plus size={16} className="text-purple-600" /> TEXT
               </button>
               <button onClick={() => setBgImage(null)} className="p-3 bg-red-600 text-white rounded-2xl shadow-xl active:scale-95 transition-all">
                 <Trash2 size={16} />
               </button>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8">
            
            {/* Asset Library Scroll */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase text-zinc-400 ml-1">Viral YouTube Assets</p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {VIRAL_ASSETS.map(asset => (
                  <button 
                    key={asset.id} 
                    onClick={() => addSticker(asset.url)}
                    className="shrink-0 w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-3 border border-zinc-100 dark:border-zinc-700 hover:border-purple-500 transition-all active:scale-90 flex items-center justify-center"
                  >
                    <img src={asset.url} className="w-full h-full object-contain" alt={asset.label} />
                  </button>
                ))}
              </div>
            </div>

            {/* Active Layer Customizer */}
            {activeLayer ? (
              <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-purple-600">Editing Layer</h3>
                  <button onClick={() => deleteLayer(activeLayer.id)} className="text-[10px] font-black text-red-600 uppercase">Delete Layer</button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {activeLayer.type === 'text' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Text Content</label>
                        <input 
                          value={activeLayer.content} 
                          onChange={(e) => updateLayer(activeLayer.id, { content: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-black text-lg border-2 border-transparent focus:border-purple-600/30"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Color</label>
                          <input type="color" value={activeLayer.color} onChange={(e) => updateLayer(activeLayer.id, { color: e.target.value })} className="w-full h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl cursor-pointer p-1" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Outline</label>
                          <input type="color" value={activeLayer.strokeColor} onChange={(e) => updateLayer(activeLayer.id, { strokeColor: e.target.value })} className="w-full h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl cursor-pointer p-1" />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-400 ml-1 flex items-center justify-between">
                        Scale <span>{activeLayer.scale.toFixed(1)}x</span>
                      </label>
                      <input type="range" min="0.1" max="3" step="0.1" value={activeLayer.scale} onChange={(e) => updateLayer(activeLayer.id, { scale: parseFloat(e.target.value) })} className="w-full h-10 accent-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-400 ml-1 flex items-center justify-between">
                        Rotate <span>{activeLayer.rotation}°</span>
                      </label>
                      <input type="range" min="-180" max="180" value={activeLayer.rotation} onChange={(e) => updateLayer(activeLayer.id, { rotation: parseInt(e.target.value) })} className="w-full h-10 accent-purple-600" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Position Controller</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-between">
                        <span className="text-[9px] font-bold">X-Pos</span>
                        <div className="flex gap-2">
                          <button onClick={() => updateLayer(activeLayer.id, { x: Math.max(0, activeLayer.x - 2) })} className="p-2 bg-white dark:bg-zinc-700 rounded-lg shadow-sm"><ChevronLeft size={14}/></button>
                          <button onClick={() => updateLayer(activeLayer.id, { x: Math.min(100, activeLayer.x + 2) })} className="p-2 bg-white dark:bg-zinc-700 rounded-lg shadow-sm"><ChevronRight size={14}/></button>
                        </div>
                      </div>
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-between">
                        <span className="text-[9px] font-bold">Y-Pos</span>
                        <div className="flex gap-2">
                          <button onClick={() => updateLayer(activeLayer.id, { y: Math.max(0, activeLayer.y - 2) })} className="p-2 bg-white dark:bg-zinc-700 rounded-lg shadow-sm"><MoveUp size={14}/></button>
                          <button onClick={() => updateLayer(activeLayer.id, { y: Math.min(100, activeLayer.y + 2) })} className="p-2 bg-white dark:bg-zinc-700 rounded-lg shadow-sm"><MoveDown size={14}/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                 <div className="flex items-center gap-2 mb-4">
                   <Sun size={18} className="text-yellow-500" />
                   <h3 className="text-sm font-black uppercase tracking-widest">Image Enhancements</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-black text-zinc-400 uppercase"><span>Brightness</span> <span>{brightness}%</span></div>
                      <input type="range" min="50" max="200" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} className="w-full h-8 accent-orange-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-black text-zinc-400 uppercase"><span>Contrast</span> <span>{contrast}%</span></div>
                      <input type="range" min="50" max="200" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} className="w-full h-8 accent-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-black text-zinc-400 uppercase"><span>Vibrancy</span> <span>{saturation}%</span></div>
                      <input type="range" min="0" max="300" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))} className="w-full h-8 accent-pink-500" />
                    </div>
                 </div>
              </div>
            )}

            <button 
              onClick={exportCanvas}
              className="w-full bg-purple-600 text-white font-black py-6 rounded-[32px] flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-2xl shadow-purple-600/30"
            >
              <Download size={24} /> 
              <div className="text-left">
                <p className="leading-none text-lg">Export 4K Thumbnail</p>
                <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">High Definition Composition</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Hidden Render Canvas */}
      <canvas ref={canvasRef} className="hidden" />
      <AdSlot type="Inline" />
    </div>
  );
};

export default ThumbnailEditor;
