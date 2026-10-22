export interface BlogSection { heading: string; paragraphs: string[]; bullets?: string[] }
export interface BlogPost {
  slug: string; title: string; h1: string; excerpt: string;
  tag: string; date: string; dateISO: string; readingMins: number;
  sections: BlogSection[]; faqs: { q: string; a: string }[];
}
export const BLOG_POSTS: BlogPost[] = [];
export const getBlogPost = (_slug: string) => undefined;
