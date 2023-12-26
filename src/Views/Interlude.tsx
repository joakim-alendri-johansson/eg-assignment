import React from 'react';

interface InterludeProps {
  show: boolean;
  onHide: () => void;
}

const Interlude: React.FC<InterludeProps> = ({ show, onHide }) => {
  return (
    <div
      className={`fixed left-0 top-0 flex h-screen w-screen flex-col items-center overflow-x-auto bg-background-100 dark:bg-background-900 dark:text-text-200 ${
        show ? '' : 'pointer-events-none animate-dissolve'
      }`}
      onClick={onHide}
    >
      <h1 className="mt-20 w-2/3 max-w-4xl text-5xl font-thin">
        Work assignment MSW mode
      </h1>
      <div className="mt-10 flex w-2/3 max-w-4xl flex-col gap-3 font-light">
        <p>
          For most projects I like to use Mock Service Worker so that the UI
          development can be as disconnected as possible from external factors.
          My goal is always that I should be able to work offline after the API
          spec is set. Oh and I can return unexpected things, such as strings
          that are unreasonably long and see how the components react.
        </p>
        <p>
          This also leads to far fewer requests to the api during development,
          which is crucial since if it is an external API - in this case 2
          external APIs - where we do not want the dev team to get us rate
          limited due to auto-reload on change.
        </p>
        <p>
          In this case the APIs also seem slow, so to lessen the frustration
          during development it is also nice that the requests are immediate and
          only when required can they be turned up to 10-second responses to
          verify graceful component loading-state handling.
        </p>
        <p>
          Often I will configure MSW-mode to run a port above the regular, so
          that both modes can be run at the same time for testing purposes.
        </p>
        <p className="italic">
          This only affects the developers experience, tests can still be
          performed with both immediate and delayed responses.
        </p>
        <p className="mt-6 font-normal">
          Use <span className="text-text-100">npm run start</span> to start the
          project without msw.
        </p>
        <p className="mt-3 font-bold">Click anywhere to hide this message.</p>
      </div>
    </div>
  );
};

export default Interlude;
