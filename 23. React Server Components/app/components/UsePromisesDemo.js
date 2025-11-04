'use client';

import { use, useState } from 'react';

export default function UsePromiseDemo({ usersPromise }) {
  console.log('UsePromiseDemo rendered');

  const users = use(usersPromise);

  const [counter, setCounter] = useState(0);

  return (
    <div className='rsc'>
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter((prevCount) => prevCount + 1)}>Increment Counter</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
