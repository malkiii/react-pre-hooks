# Contributing to daisyUI

Thank you for your contribution 🤝

## Reporting issues

- Before opening a new issue, first [search for existing issues](https://github.com/malkiii/realtime-hooks/issues?q=) to avoid duplications.
- Provide detailed reports to make things easier for maintainers.

## Fixing existing issues

- You can help by [fixing existing issues](https://github.com/malkiii/realtime-hooks/issues?q=)
- Don't work on issues assigned to others (to avoid duplicate efforts)
- Before starting to work on an issue, please first add a comment and ask to get assigned to that issue. This way everyone will know you're working on that and it avoids duplicate efforts.
- Commit messages must start with: `fix: #<issue number> <description>`, so the issue will close automatically and it gets added to changelog file on a release.

## Feature requests

- For feature requests, [open a new issue](https://github.com/saadeghi/daisyui/issues/new)
- All feature requests may not fit this library and some may get rejected. Don't take it personally.

## Pull requests

- A pull request must fix **an open issue** assigned to you. If there's no issue, please create one first. If it's not assigned to you, please ask for it in the comments. This is for avoiding duplicate efforts.
- Fixing typos doesn't need to be an issue. You can just open a pull request.

## Building on local

### To build the realtime-hooks package on local:

1. **Fork** and **clone** the repo on local
1. Install package dependencies:
   ```bash
   pnpm install
   ```
1. Build the package:
   ```bash
   pnpm build
   ```
1. Now you can import `realtime-hooks`:
   ```ts
   import * as hooks from "/path/to/dist/directory"
   ```

### To run the **documentation site** on local:
```bash
pnpm dev
```

## Adding a new hook

### File structure

All the hooks are in [`/src`](https://github.com/malkiii/realtime-hooks/tree/master/packages/hooks/src) folder, you must follow this file structure:

### An example
