import React, { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavBtnProps {
  to: string;
}

const NavBtn: React.FC<PropsWithChildren<NavBtnProps>> = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <p
          className={`mx-1 border-b-[3px] p-2 text-xl font-light transition-all duration-300 ${
            isActive
              ? 'border-primary-500 text-text-900 dark:border-primary-400 dark:text-text-200'
              : 'border-transparent hover:border-accent-300 hover:text-accent-600 dark:text-text-400 dark:hover:border-accent-600 dark:hover:text-accent-300'
          }`}
        >
          {children}
        </p>
      )}
    </NavLink>
  );
};

export default NavBtn;
