import { Places } from './Places.jsx';

export const AvailablePlaces = ({ onSelectPlace }) => {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};
