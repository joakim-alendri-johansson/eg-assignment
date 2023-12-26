import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import React from 'react';

const techs: Record<'title' | 'href' | 'description', string>[] = [
  {
    title: 'React',
    href: 'https://react.dev/',
    description: 'Main framework engine.',
  },
  {
    title: 'React router',
    href: 'https://reactrouter.com/',
    description:
      'Handling the nav menu links and mounting the correct components based on the URL route.',
  },
  {
    title: 'Typescript',
    href: 'https://www.typescriptlang.org/',
    description:
      'TypeScript is a typesafety addon to JavaScript, also allows for great standard and custom tooltips for developers in a team.',
  },
  {
    title: 'Mock service worker',
    href: 'https://mswjs.io/',
    description: `Intercepting and mocking requests and respones.
      This is an amazing tool for a frontend dev to test how components react to unplanned responses such as a HTTP/500.
      It also allows devs to work on frontend before the backend is finished or while it is offline.`,
  },
  {
    title: 'Tailwind',
    href: 'https://tailwindcss.com/',
    description: `CSS framework for styling frontends by applying classes.
      Bonus; you learn the underlying CSS, which is fantastic transferable knowledge.`,
  },
  {
    title: 'Vite',
    href: 'https://vitejs.dev/',
    description:
      'Frontend dev environment. Fast. Lovely dev experience coming from large projects using other tooling.',
  },
  {
    title: 'ViTest',
    href: 'https://vitest.dev/',
    description:
      'Vite native test framework. Worth a glance if you ever find yourself using Vite. Works very much as you expect coming from any of the other major test frameworks.',
  },
  {
    title: 'Eslint',
    href: 'https://eslint.org/',
    description:
      'Code linting with basic rulesets and extended with plugins from tailwind and prettier. Consistent formatting and basic sanity checks for all team members, less commit diffs, helpful hints.',
  },
  {
    title: 'Zustand',
    href: 'https://github.com/pmndrs/zustand',
    description:
      'I found I rarely needed everything in Redux and have come to enjoy using this tiny replacement for my state management needs. It stores the entries of the list you are currently reading.',
  },
  {
    title: 'GitHub',
    href: 'https://www.github.com/',
    description: 'Git repository host.',
  },
  {
    title: 'Axios',
    href: 'https://axios-http.com/',
    description:
      'Promise based HTTP client. Handy for use in both browser and node.js applications.',
  },
  {
    title: 'fuse.js',
    href: 'hhttps://www.fusejs.io/',
    description:
      'Small fuzzy search library, super neat for text searches JS/TS applications.',
  },
];

const About: React.FC = () => {
  return (
    <main className="isolate mb-4 animate-materialize">
      <div className="max-w-[1680px] px-8">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6 divide-y divide-accent-100 dark:divide-accent-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          <li className="py-4">
            <dl className="relative flex flex-wrap gap-x-2">
              <dd className="mt-1 w-full flex-none font-work font-bold">
                In no particular order these techs and tools are used within or
                were used to create this page.
              </dd>
            </dl>
          </li>

          {techs.map((tech) => (
            <li key={tech.title} className="py-4">
              <dl className="group relative flex flex-wrap gap-x-2">
                <a href={tech.href} target="_blank">
                  <dt className="flex w-full items-center text-lg font-semibold tracking-tight group-hover:text-accent-600 dark:group-hover:text-accent-300">
                    {tech.title}
                    <ArrowTopRightOnSquareIcon className="ml-1 h-5 w-5 opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:opacity-70" />
                  </dt>
                  <dd className="mt-1 w-full flex-none text-sm leading-6 ">
                    {tech.description}
                  </dd>
                </a>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default About;
