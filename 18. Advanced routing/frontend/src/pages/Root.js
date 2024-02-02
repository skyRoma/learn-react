import { MainNavigation } from '../components/MainNavigation';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
