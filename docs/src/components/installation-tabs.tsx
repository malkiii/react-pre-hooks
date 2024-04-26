import React from 'react';
import { site } from '~/constants/site';
import { Tab, Tabs } from 'nextra-theme-docs';

function createInstallationTap(manager: string, children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      if (child.includes('npm')) return manager;
      if (child.includes('install') && manager !== 'npm') return 'add';
      if (child.includes('package')) return site.title;
    } else if (React.isValidElement(child) && child.props.children) {
      return React.cloneElement(child, {
        children: createInstallationTap(manager, child.props.children)
      } as any);
    }
    return child;
  });
}

export default function InstallationTabs({ children }: React.PropsWithChildren) {
  const packageManagers = ['npm', 'pnpm', 'yarn', 'bun'];
  return (
    <Tabs items={packageManagers} storageKey="package-manager">
      {packageManagers.map(manager => (
        <Tab key={manager}>{createInstallationTap(manager, children)}</Tab>
      ))}
    </Tabs>
  );
}
