export type BlogLocale = 'pt-BR' | 'en';
export interface BlogAlternate { hreflang: string; href: string }
export interface BlogEntry { id: string; collectionId: string; file: string; hash: string; path: string; slug: string; locale: BlogLocale; data: Record<string, any>; alternates: BlogAlternate[] }
export interface BlogManifest { version: number; buildAt: string; sourceHashes: Record<string,string>; entries: BlogEntry[] }
export declare const BLOG_ORIGIN: string;
export declare const BLOG_STATES: string[];
export declare function blogIndexPath(locale: BlogLocale): string;
export declare function sha256(value: string | Uint8Array): string;
export declare function timestamp(value: unknown, label: string): number;
export declare function validateRecord(data: unknown, body: string, buildAt: string, releaseApproval?: unknown): boolean;
export declare function prepareBlogManifest(root: string, buildAt: string): Promise<BlogManifest>;
export declare function validateBlogOutput(root: string, manifest: BlogManifest): Promise<void>;

export declare function blogCriteriaFigure(): (tree: any, file: any) => void;
export declare function blogScrollableBlocks(options?: { labelTaskLists?: boolean }): (tree: any, file: any) => void;
