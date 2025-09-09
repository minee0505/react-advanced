import React from 'react';
import { log } from '../log.js';

const Header = () => {
  log('<Header /> rendered!!', 1);

  return (
    <header id='main-header'>
      <h1>React Optimizing</h1>
    </header>
  );
};
export default Header;
