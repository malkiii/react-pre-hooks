# Contributing to `react-pre-hooks`

> Thank you for your contribution 🤝

## Reporting issues

- Before opening a new issue, first [search for existing issues](https://github.com/malkiii/react-pre-hooks/issues?q=) to avoid duplications.
- [Open a bug report](https://github.com/malkiii/react-pre-hooks/issues/new?labels=bug&template=bug-report.yml&title=bug%3A+) with detailed description to make things easier.

## Fixing existing issues

- You can help by [fixing existing issues](https://github.com/malkiii/react-pre-hooks/issues?q=)
- Don't work on issues assigned to others (to avoid duplicate efforts)
- Before starting to work on an issue, please first add a comment and ask to get assigned to that issue. This way everyone will know you're working on that and it avoids duplicate efforts.
- Commit messages must start with: `fix: #<issue number> <description>`, so the issue will close automatically and it gets added to changelog file on a release.

## Feature requests

- For feature requests, [open a new issue](https://github.com/malkiii/react-pre-hooks/issues/new?labels=feature&template=feature-request.yml&title=feat%3A+)
- All feature requests may not fit this library and some may get rejected. Don't take it personally.

## Pull requests

- A pull request must fix **an open issue** assigned to you. If there's no issue, please create one first. If it's not assigned to you, please ask for it in the comments. This is for avoiding duplicate efforts.
- Fixing typos doesn't need to be an issue. You can just open a pull request.

## Building on local

### To build the react-pre-hooks package on local:

1. **Fork** and **clone** the repo on local, if you are using [GitHub CLI](https://cli.github.com/) just run:

   ```sh
   gh repo fork malkiii/react-pre-hooks --clone
   ```

2. Install package dependencies and build the package:

   ```sh
   pnpm install && pnpm build
   ```

### To run the **documentation site** on local:

- start the development server:

   ```sh
   pnpm docs:dev
   ```

- to generate the hook pages (this process will be done automatically with `docs:dev`):

   ```sh
   pnpm build && pnpm generate:pages
   ```


## Adding a new hook

> Before you add a new hook, please [open a request](<https://github.com/malkiii/react-pre-hooks/issues/new?labels=feature&template=feature-request.yml&title=feat(hook)%3A+>).

1. Add the hook folder to [`packages/hooks/src`](https://github.com/malkiii/react-pre-hooks/tree/master/packages/hooks/src) folder.
2. Create an `index.ts` file that includes the code.
3. Create an `index.page.tsx` file that includes the page content (see this [example](https://github.com/malkiii/react-pre-hooks/tree/master/packages/hooks/src/useArray/index.page.tsx)).

- the folder structure should look like this:

   ```sh
   packages
   ├── hooks
   │   ├── src
   │   │   ├── useHook
   │   │   │   ├── index.ts
   │   │   │   ├── index.page.tsx
   ```

