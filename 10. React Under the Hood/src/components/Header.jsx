import { log } from '../log.js';

export const Header = () => {
  log('<Header /> rendered', 1);

  return (
    <header id="main-header">
      <img src="logo.png" alt="Magnifying glass analyzing a document" />
      <h1>React - Behind The Scenes</h1>
    </header>
  );
};
