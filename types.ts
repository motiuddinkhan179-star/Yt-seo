
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface AdConfiguration {
  id: string;
  provider: 'AdSense' | 'Adsterra' | 'HilltopAds' | 'Custom';
  slotType: 'Header' | 'Inline' | 'Footer' | 'Popup';
  adCode: string;
  isActive: boolean;
}

export enum AppRoute {
  HOME = 'home',
  SEO = 'seo',
  CONTENT = 'content',
  GROWTH = 'growth',
  MONETIZATION = 'monetization',
  TOOLKIT = 'toolkit',
  NOTIFICATIONS = 'notifications',
  ADMIN = 'admin',
  
  // CLOUD AI
  CLOUD_AI = 'cloud-ai',

  // THUMBNAIL SUITE
  THUMBNAIL_DOWNLOADER = 'thumbnail-downloader',
  THUMBNAIL_BUILDER = 'thumbnail-builder',
  THUMBNAIL_EDITOR = 'thumbnail-editor',
  THUMBNAIL_CONCEPTS = 'thumbnail-concepts',

  // SEO TOOLS
  TAGS_EXTRACTOR = 'tags-extractor',
  KEYWORD_SUGGESTION = 'keyword-suggestion',
  TAGS_GENERATOR = 'tags-generator',
  DESCRIPTION_GEN = 'description-generator',
  META_TAG_GEN = 'meta-tag-generator',
  KEYWORD_DIFFICULTY = 'keyword-difficulty',
  SEO_AUDIT = 'seo-audit',
  HASHTAG_GENERATOR = 'hashtag-generator',

  // CONTENT TOOLS
  TITLE_GEN = 'title-gen',
  VIRAL_HOOKS = 'viral-hooks',
  SCRIPT_OUTLINE = 'script-outline',
  SCRIPT_REWRITER = 'script-rewriter',
  CTA_GENERATOR = 'cta-generator',
  STORYBOARD_IDEAS = 'storyboard-ideas',
  THUMBNAIL_TEXT = 'thumbnail-text',
  SHORTS_IDEAS = 'shorts-ideas',
  COMMENT_REPLY = 'comment-reply',

  // CHANNEL TOOLS
  CHANNEL_NAME_GEN = 'channel-name-gen',
  ABOUT_SECTION = 'about-section',
  CHANNEL_SLOGAN = 'channel-slogan',
  COMMUNITY_POSTS = 'community-posts',
  PLAYLIST_TITLE = 'playlist-title',
  POPULAR_HASHTAGS = 'popular-hashtags',
  EXPLORE_CHANNEL = 'explore-channel',
  CHANNEL_BIO = 'channel-bio',
  CHANNEL_AUDIT = 'channel-audit',

  // BUSINESS & GROWTH
  TRENDING_VIDEOS = 'trending-videos',
  COMPETITOR_FINDER = 'competitor-finder',
  EARNING_CALC = 'earning-calculator',
  SPONSOR_PITCH = 'sponsor-pitch',
  BRAND_DEAL_STRAT = 'brand-deal-strat',
  AFFILIATE_STRAT = 'affiliate-strat',
  NICHE_ANALYSIS = 'niche-analysis',
  COLLAB_FINDER = 'collab-finder',
  AUDIENCE_PERSONA = 'audience-persona',
  POSTING_SCHEDULE = 'posting-schedule',
  CONTENT_CALENDAR = 'content-calendar'
}

export interface SEOResult {
  tags: string[];
  hashtags: string[];
  score: number;
  suggestions: string[];
}
