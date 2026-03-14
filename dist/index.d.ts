import { QuartzComponent } from '@quartz-community/types';
export { QuartzComponent, QuartzComponentProps, StringResource } from '@quartz-community/types';

interface QuartzPluginData {
    slug?: string;
    filePath?: string;
    dates?: Record<string, Date>;
    frontmatter?: {
        title?: string;
        tags?: string[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
interface RecentNotesOptions {
    title?: string;
    limit: number;
    linkToMore: string | false;
    showTags: boolean;
    filter: (f: QuartzPluginData) => boolean;
    sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number;
}
declare const _default: (userOpts?: Partial<RecentNotesOptions>) => QuartzComponent;

export { _default as RecentNotes, type RecentNotesOptions };
