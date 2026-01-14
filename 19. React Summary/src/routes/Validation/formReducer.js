export const ActionType = {
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_VALIDATION_ERROR: 'SET_VALIDATION_ERROR',
  SUBMIT: 'SUBMIT',
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
  RESET: 'RESET',
};

export const initialState = {
  currentStep: 1,
  data: {
    // Step 1
    name: '',
    email: '',
    // Step 2
    productType: 'basic', // 'basic' | 'premium'
    quantity: 1,
    // Step 3
  },
  errors: {
    name: null,
    email: null,
    quantity: null,
  },
  isSubmitting: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case ActionType.UPDATE_FIELD:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
        // Reset error on field change
        errors: {
          ...state.errors,
          [action.payload.field]: null,
        }
      };

    case ActionType.SET_VALIDATION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        }
      };

    case ActionType.NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case ActionType.PREV_STEP:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };

    case ActionType.SUBMIT:
      return {
        ...state,
        isSubmitting: true,
      }

    case ActionType.SUBMIT_SUCCESS:
      return {
        ...initialState,
        currentStep: 4,
      }

    case ActionType.RESET:
      return {
        ...initialState,
        currentStep: 1,
      }

    default:
      return state;
  }
}
