# @quartz-community/recent-notes

Displays a list of recently modified or created notes.

## Installation

```bash
npx quartz plugin add github:quartz-community/recent-notes
```

## Usage

```ts
// quartz.layout.ts
import * as Plugin from "./.quartz/plugins";

// Add to your layout
Plugin.RecentNotes(); // in the appropriate layout section
```

## Configuration

| Option       | Type              | Default                 | Description                                              |
| ------------ | ----------------- | ----------------------- | -------------------------------------------------------- |
| `title`      | `string`          | `undefined`             | The title of the recent notes section.                   |
| `limit`      | `number`          | `3`                     | The maximum number of notes to display.                  |
| `linkToMore` | `string \| false` | `false`                 | A link to a page with more notes, or `false` to disable. |
| `showTags`   | `boolean`         | `true`                  | Whether to display tags for each note.                   |
| `filter`     | `function`        | `() => true`            | A function to filter the notes.                          |
| `sort`       | `function`        | `byDateAndAlphabetical` | A function to sort the notes.                            |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/) for more information.

## License

MIT
