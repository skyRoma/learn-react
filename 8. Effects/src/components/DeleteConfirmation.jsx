import { useEffect } from 'react';
import { ProgressBar } from './ProgressBar';

const TIME = 3000;

export const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      onConfirm();
    }, TIME);

    return () => clearTimeout(id);
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar max={TIME} />
    </div>
  );
};
