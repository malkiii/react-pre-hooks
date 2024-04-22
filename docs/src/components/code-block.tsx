type CodeBlockProps = React.ComponentProps<'div'> & { name: string };

export default function CodeBlock({ name, children, className, ...props }: CodeBlockProps) {
  return (
    <div {...props} className={`[counter-reset:line] ${className}`}>
      <div className="p-2 select-none text-sm text-white font-light w-fit flex items-center gap-2 border-t">
        <img
          src="https://react.dev/favicon.ico"
          className="w-3 pointer-events-none"
          width={32}
          height={32}
          alt="react-icon"
        />{' '}
        {name}.tsx
      </div>
      <div className="ml-4 pt-2 pb-16">{children}</div>
    </div>
  );
}

CodeBlock.displayName = 'CodeBlock';
