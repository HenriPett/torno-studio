export type Locale = 'pt-BR' | 'en';
export type RouteId = 'blog' | 'about' | 'contact' | 'home' | 'privacy' | 'diagnostico' | 'recovery' | 'lovableProduction' | 'rlsGuide' | 'caseLoopt' | 'caseAscende' | 'caseBomCapital';
export declare const locales: readonly ['pt-BR', 'en'];
export declare const defaultLocale: 'pt-BR';
export declare const routes: Record<RouteId, Record<Locale, string | null>>;
export declare const campaignRoutes: readonly RouteId[];
