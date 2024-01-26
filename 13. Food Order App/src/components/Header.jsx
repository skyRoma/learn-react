import { Button } from './UI/button';

export const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button>Cart (0)</Button>
      </nav>
    </header>
  );
};
