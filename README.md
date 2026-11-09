# @quartz-community/recent-notes

Displays a list of recently modified or created notes.

## Installation

```bash
npx quartz plugin add @quartz-community/recent-notes
```

Quartz's default configuration has a disabled entry for this plugin (without a `layout`, so the component goes after the page body); set `enabled: true` to use it.

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/recent-notes"
    enabled: true
    options:
      limit: 3
      showTags: true
      linkToMore: false
    layout:
      position: afterBody
      priority: 50
```

`filter` and `sort` take functions, so they need a TypeScript override:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.RecentNotes({
  filter: (f) => f.slug?.startsWith("blog/") ?? false,
});
```

## Configuration

| Option            | Type              | Default                  | Description                                                                                                          |
| ----------------- | ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `title`           | `string`          | localized "Recent Notes" | The title of the recent notes section.                                                                               |
| `limit`           | `number`          | `3`                      | The maximum number of notes to display.                                                                              |
| `linkToMore`      | `string \| false` | `false`                  | The slug of a page listing more notes; when set and there are more notes than `limit`, a "See N more" link is shown. |
| `showTags`        | `boolean`         | `true`                   | Whether to display tags for each note.                                                                               |
| `hideTagPages`    | `boolean`         | `false`                  | Hide generated tag pages (slugs under `tags/`) from the list.                                                        |
| `hideFolderPages` | `boolean`         | `false`                  | Hide generated folder index pages (slugs ending in `/` or `/index`) from the list.                                   |
| `filter`          | `function`        | `() => true`             | Which pages to include. TS override only.                                                                            |
| `sort`            | `function`        | newest first, then title | How to sort the notes, by each page's default date (`defaultDateType` of created-modified-date). TS override only.   |

Pages marked `unlisted` (see [`@quartz-community/unlisted-pages`](https://github.com/quartz-community/unlisted-pages)) are always left out.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/RecentNotes) for more information.

## License

MIT
