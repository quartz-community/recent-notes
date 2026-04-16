import { QuartzPluginData, SortFn, QuartzComponent } from '@quartz-community/types';
export { QuartzComponent, QuartzComponentProps, StringResource } from '@quartz-community/types';

type RecentNotesPluginData = QuartzPluginData & Record<string, unknown>;
interface RecentNotesOptions {
    title?: string;
    limit: number;
    linkToMore: string | false;
    showTags: boolean;
    filter: (f: RecentNotesPluginData) => boolean;
    sort: SortFn;
}
declare function filterListedPages<T>(pages: T[]): T[];
declare const _default: (userOpts?: Partial<RecentNotesOptions>) => QuartzComponent;

export { _default as RecentNotes, type RecentNotesOptions, filterListedPages };
