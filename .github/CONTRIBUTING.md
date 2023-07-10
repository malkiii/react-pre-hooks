# Contributing Guide

## Suggesting Features

Feature requests are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue on that repository and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a in detail description of the suggested enhancement** in as many details as possible.
- **Explain why this enhancement would be useful** to the project and the community.

## Creating Pull Requests

### Fork the repository.

Click on the fork button on the top of the page. This will create a copy of this repository in your account. Instead click [here](https://github.com/malkiii/realtime-hooks/fork) to fork the repository.

### Clone the forked repository.

```bash
git clone https://github.com/<your-username>/realtime-hooks.git
```

or if use the Github CLI

```bash
gh repo clone <your-username>/realtime-hooks
```

### Navigate to the project directory.

```bash
cd realtime-hooks
```

### Create a new branch

You could follow this convention. Some ideas to get you started:

- Feature Updates: `feat-<brief 2-3 words-Description>`
- Bug Fixes: `fix-<brief 2-3 words-Description>`
- Documentation: `docs-<brief 2-3 words-Description>`

Here is some branch names examples:

- `feat-feature-1`
- `fix-some-bug`
- `docs-update-template`

To create a new branch, use the following command:

```bash
git checkout -b your-branch-name
```

### Make your changes.

> if you want to add **New hook** make sure you create it in its own file like the others.

### Stage your changes and commit.

```bash
git add .
git commit -m "<commit_message>"
```

The commit message should be structured as follows:

```
<type>(optional scope): <description>
```

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

Before you push your local commits to the remote repository.

```bash
pnpm format && pnpm lint
pnpm build
pnpm test
```

Push your local commits to the remote repository.

```bash
git push origin your-branch-name
```

### Create a new [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) from `your-branch-name`

🎉 Congratulations! You've made your first pull request! Now, you should just wait until the maintainers review your pull request.

### `test` folder

This folder contains the code for the tests for the implementation of realtime-hooks. The test use the [Vitest](https://vitest.dev/).

To run the test locally:

```bash
pnpm install # Install dependencies
pnpm test # Run all tests
```

## Create A Dev Playground

To test your changes on `realtime-hooks` locally, make sure you have an already any existing **React.js** project. Open your local project and do the following:

- after runing `pnpm build` Go to the parts of your project where you are importing the library and then change the paths to absolute paths that are links to the realtime-hooks codebase you have on your machine. For example:

```ts
import ifb from '<absolute path>/realtime-hooks/dist/realtime-hooks';
```

_The template for this contributing guideline was copied from [FrancescoXX/4c-site](https://github.com/FrancescoXX/4c-site). Thank you for the amazing guidelines._
