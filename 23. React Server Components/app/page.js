import fs from 'node:fs/promises';
import { Suspense } from "react";
import ClientDemo from "./components/ClientDemo";
import DataFetchingDemo from "./components/DataFetchingDemo";
import RSCDemo from "./components/RSCDemo";
import ServerActionsDemo from "./components/ServerActionsDemo";
import UsePromiseDemo from "./components/UsePromisesDemo";
import ErrorBoundary from './components/ErrorBoundary';

export default function Home() {
  const fetchUsersPromise = new Promise((resolve, reject) => setTimeout(async () => {
    const data = await fs.readFile('dummy-db.json', 'utf-8');
    const users = JSON.parse(data);
    resolve(users);
    // reject('ERROR! Unable to fetch users.');
  }, 3000));

  return (
    <main>
      <RSCDemo />
      <ClientDemo />
      <DataFetchingDemo />
      <ServerActionsDemo />
      <ErrorBoundary fallback="Could not load user data. Please try again later.">
        <Suspense fallback={<div>Loading data...</div>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
