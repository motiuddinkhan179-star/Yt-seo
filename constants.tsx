
import React from 'react';
import { 
  Home, Search, PenTool, TrendingUp, DollarSign, Grid, Bell, Layout, Monitor, ShieldCheck,
  Tag, Hash, UserPlus, Type, Flame, Compass, Users, Lightbulb, Calculator, Image, Zap,
  FileText, List, BarChart, MessageSquare, Smartphone, Mail, Globe, Target, Calendar, 
  UserCheck, Download, Palette, Wand2, RefreshCw, ClipboardList, CheckSquare, Video, Scissors, Subtitles, Layers, Cpu, Cloud
} from 'lucide-react';
import { AppRoute } from './types';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'toolkit', label: 'Tools', icon: <Grid size={20} /> },
  { id: 'monetization', label: 'Earn', icon: <DollarSign size={20} /> },
];

export const TOOL_GRID = [
  // Cloud AI (Featured)
  { id: AppRoute.CLOUD_AI, label: 'Cloud AI Assistant', icon: <Cloud className="text-indigo-600" />, color: 'bg-indigo-100' },

  // Thumbnail Suite
  { id: AppRoute.THUMBNAIL_DOWNLOADER, label: 'Thumbnail Downloader', icon: <Download className="text-red-600" />, color: 'bg-red-50' },
  { id: AppRoute.THUMBNAIL_BUILDER, label: 'AI Thumbnail Builder', icon: <Wand2 className="text-pink-600" />, color: 'bg-pink-50' },
  { id: AppRoute.THUMBNAIL_EDITOR, label: 'Thumbnail Editor', icon: <Palette className="text-purple-600" />, color: 'bg-purple-50' },
  { id: AppRoute.THUMBNAIL_CONCEPTS, label: 'Thumbnail Concepts', icon: <Image className="text-rose-500" />, color: 'bg-rose-50' },

  // SEO Category
  { id: AppRoute.TAGS_EXTRACTOR, label: 'Video Tags Extractor', icon: <Tag className="text-blue-500" />, color: 'bg-blue-50' },
  { id: AppRoute.KEYWORD_SUGGESTION, label: 'Keyword Suggestion', icon: <Search className="text-cyan-500" />, color: 'bg-cyan-50' },
  { id: AppRoute.TAGS_GENERATOR, label: 'AI Tags Generator', icon: <Zap className="text-orange-500" />, color: 'bg-orange-50' },
  { id: AppRoute.DESCRIPTION_GEN, label: 'Video Description Gen', icon: <FileText className="text-blue-600" />, color: 'bg-blue-100' },
  { id: AppRoute.KEYWORD_DIFFICULTY, label: 'Keyword Difficulty', icon: <BarChart className="text-indigo-500" />, color: 'bg-indigo-50' },
  { id: AppRoute.HASHTAG_GENERATOR, label: 'AI Hashtag Generator', icon: <Hash className="text-green-500" />, color: 'bg-green-50' },
  { id: AppRoute.SEO_AUDIT, label: 'SEO Profile Audit', icon: <CheckSquare className="text-emerald-500" />, color: 'bg-emerald-50' },
  
  // Content Category
  { id: AppRoute.TITLE_GEN, label: 'AI Video Title Gen', icon: <Type className="text-purple-500" />, color: 'bg-purple-50' },
  { id: AppRoute.VIRAL_HOOKS, label: 'Viral Hook Generator', icon: <Zap className="text-yellow-600" />, color: 'bg-yellow-50' },
  { id: AppRoute.SCRIPT_OUTLINE, label: 'Script Outline Creator', icon: <List className="text-purple-600" />, color: 'bg-purple-100' },
  { id: AppRoute.SCRIPT_REWRITER, label: 'AI Script Re-writer', icon: <RefreshCw className="text-indigo-400" />, color: 'bg-indigo-50' },
  { id: AppRoute.CTA_GENERATOR, label: 'Call to Action Gen', icon: <MessageSquare className="text-pink-500" />, color: 'bg-pink-50' },
  { id: AppRoute.SHORTS_IDEAS, label: 'Shorts Content Ideas', icon: <Smartphone className="text-rose-500" />, color: 'bg-rose-50' },

  // Channel Category
  { id: AppRoute.CHANNEL_NAME_GEN, label: 'AI Channel Name Gen', icon: <UserPlus className="text-red-500" />, color: 'bg-red-50' },
  { id: AppRoute.ABOUT_SECTION, label: 'About Section Gen', icon: <FileText className="text-zinc-500" />, color: 'bg-zinc-100' },
  { id: AppRoute.CHANNEL_SLOGAN, label: 'Channel Slogan Ideas', icon: <Lightbulb className="text-yellow-500" />, color: 'bg-yellow-50' },
  { id: AppRoute.COMMUNITY_POSTS, label: 'Community Post Ideas', icon: <MessageSquare className="text-blue-400" />, color: 'bg-blue-50' },
  
  // Business Category
  { id: AppRoute.SPONSOR_PITCH, label: 'Sponsor Email Pitch', icon: <Mail className="text-emerald-600" />, color: 'bg-emerald-50' },
  { id: AppRoute.BRAND_DEAL_STRAT, label: 'Brand Deal Strategy', icon: <DollarSign className="text-green-600" />, color: 'bg-green-100' },
  { id: AppRoute.EARNING_CALC, label: 'Earning Calculator', icon: <Calculator className="text-emerald-500" />, color: 'bg-emerald-50' },
  
  // Growth Category
  { id: AppRoute.TRENDING_VIDEOS, label: 'Trending Videos', icon: <TrendingUp className="text-rose-500" />, color: 'bg-rose-50' },
  { id: AppRoute.COMPETITOR_FINDER, label: 'Find Competitor', icon: <Users className="text-indigo-500" />, color: 'bg-indigo-50' },
  { id: AppRoute.NICHE_ANALYSIS, label: 'Niche Market Analysis', icon: <Target className="text-red-600" />, color: 'bg-red-50' },
];

export const ADMIN_MENU = [
  { id: 'dashboard', label: 'Overview', icon: <Layout size={20} /> },
  { id: 'ads', label: 'Ad Management', icon: <Monitor size={20} /> },
  { id: 'keys', label: 'API Keys', icon: <ShieldCheck size={20} /> },
  { id: 'notifications', label: 'Send Alert', icon: <Bell size={20} /> },
];

export const YOUTUBE_COLORS = {
  primary: '#FF0000',
  black: '#0f0f0f',
  white: '#ffffff',
  gray: '#606060'
};
