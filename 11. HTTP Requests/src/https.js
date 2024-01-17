export const fetchAvailablePlaces = async () => {
  const response = await fetch('http://localhost:3000/places');

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  const { places } = await response.json();

  return places;
};
