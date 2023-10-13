# What is Realtime Hooks?

Realtime Hooks is a collection of [React.js](https://react.dev) hooks built with [TypeScript](https://www.typescriptlang.org) to simplify your web development workflow. This collection of hooks is designed to streamline the implementation of real-time features in your React applications while reducing development time and complexity. In this section, we'll explore the key reasons why you should consider using Realtime Hooks in your projects.

## Speed Up Development

Implementing real-time functionality in React applications can be a challenging and time-consuming task. Realtime Hooks aims to address this pain point by providing a set of pre-built hooks that abstract away the complexities of real-time data synchronization. With these hooks, you can significantly accelerate your development process and focus on building the core features of your application.

## Simplify Your Components

By using Realtime Hooks, you can simplify your React components significantly. Complex logic related to real-time data synchronization can be abstracted into reusable hooks, making your components more focused, easier to test, and maintainable. Here is an example:

```jsx
export default function Component({ scrolling }) {
  useEffect(() => {
    const handler = event => {
      console.log('handling...');
    };

    window.addEventListener('click', handler);
    window.addEventListener('mousemove', handler);
    if (scrolling) window.addEventListener('scroll');

    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('mousemove', handler);
      if (scrolling) window.removeEventListener('scroll', handler);
    };
  }, []);

  return (
    <div>
      <button>Click</button>
    </div>
  );
}
```

you can simplify this by using [useEventListener](./useEventListener) hook:

```jsx
export default function Component({ scrolling }) {
  useEventListener(
    ['click', 'mousemove', scrolling && 'scroll'],
    event => {
      console.log('handling...');
    },
    { ref: window }
  );

  return (
    <main>
      <button>Click</button>
    </main>
  );
}
```

## Auto Completion With TypeScript

Each hook is developed with TypeScript, ensuring type safety and improved code quality in your projects, and provides auto-completion and type hints, making your codebase more robust and maintainable.
