import { useRef, useState, useCallback } from 'react';

import { Places } from './components/Places.jsx';
import { Modal } from './components/Modal.jsx';
import { DeleteConfirmation } from './components/DeleteConfirmation.jsx';
import { AvailablePlaces } from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './https.js';
import { ErrorMsg } from './components/Error.jsx';
import { useFetch } from './hooks/useFetch.js';

export const App = () => {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    isLoading,
    error,
    data: userPlaces,
    setData: setUserPlaces,
  } = useFetch(fetchUserPlaces, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setError(error.message || 'Could not update places');
    }
  }

  const handleRemovePlace = useCallback(async () => {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error) {
      setUserPlaces(userPlaces);
      setError(error.message || 'Could not remove place');
    }

    setModalIsOpen(false);
  }, [userPlaces, setUserPlaces]);

  const handleClearError = () => {
    setError(null);
  };

  return (
    <>
      <Modal open={error} onClose={handleClearError}>
        <ErrorMsg
          title="An error occurred"
          message={error}
          onConfirm={handleClearError}
        />
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src="logo.png" alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isLoading}
          loadingText="Loading your places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
};
