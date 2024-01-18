export const fetchAvailablePlaces = async () => {
  const response = await fetch('http://localhost:3000/places');

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  const { places } = await response.json();

  return places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update places');
  }

  const resData = await response.json();

  return resData.message;
};

export const fetchUserPlaces = async () => {
  const response = await fetch('http://localhost:3000/user-places');

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  const { places } = await response.json();

  return places;
};
