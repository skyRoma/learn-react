import { useRef, useState, useEffect, useCallback } from 'react';

import { Places } from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import { Modal } from './components/Modal.jsx';
import { DeleteConfirmation } from './components/DeleteConfirmation.jsx';
import { sortPlacesByDistance } from './loc.js';
import logoImg from './assets/logo.png';

const storedIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

export const App = () => {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setIsModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false);
  }

  function handlePickPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);

      localStorage.setItem(
        'pickedPlaces',
        JSON.stringify([id, ...prevPickedPlaces.map((place) => place.id)])
      );

      return [place, ...prevPickedPlaces];
    });
  }

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) => {
      const newPlaces = prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current
      );

      localStorage.setItem(
        'pickedPlaces',
        JSON.stringify(newPlaces.map((place) => place.id))
      );

      return newPlaces;
    });
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText={'Sorting places by distance...'}
          onSelectPlace={handlePickPlace}
        />
      </main>
    </>
  );
};
