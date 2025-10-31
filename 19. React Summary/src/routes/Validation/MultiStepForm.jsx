import { useReducer, useCallback } from 'react';
import { formReducer, initialState, ActionType } from './formReducer';
import { validateStep } from './formValidation';

const Step1 = ({ data, dispatch, errors }) => (
  <>
    <h2>Шаг 1: Контакты</h2>
    <div>
      <label>Имя:</label>
      <input
        value={data.name}
        onChange={(e) => dispatch({ type: ActionType.UPDATE_FIELD, payload: { field: 'name', value: e.target.value } })}
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
    </div>
    <div>
      <label>Email:</label>
      <input
        value={data.email}
        onChange={(e) => dispatch({ type: ActionType.UPDATE_FIELD, payload: { field: 'email', value: e.target.value } })}
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
    </div>
  </>
);

const Step2 = ({ data, dispatch, errors }) => (
  <>
    <h2>Шаг 2: Параметры Продукта</h2>
    <div>
      <label>Тип продукта:</label>
      <select
        value={data.productType}
        onChange={(e) => dispatch({ type: ActionType.UPDATE_FIELD, payload: { field: 'productType', value: e.target.value } })}
      >
        <option value="basic">Базовый</option>
        <option value="premium">Премиум</option>
      </select>
    </div>
    <div>
      <label>Количество:</label>
      <input
        type="number"
        value={data.quantity}
        min="1"
        onChange={(e) => dispatch({ type: ActionType.UPDATE_FIELD, payload: { field: 'quantity', value: parseInt(e.target.value) || 0 } })}
      />
      {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity}</p>}
      {data.productType === 'premium' && <p style={{ color: 'blue', fontSize: 'small' }}>*Мин. для Премиум: 5 шт.</p>}
    </div>
  </>
);

const Step3 = ({ data }) => (
  <>
    <h2>Шаг 3: Подтверждение</h2>
    <p>Проверьте данные перед отправкой:</p>
    <ul>
      <li>**Имя:** {data.name}</li>
      <li>**Email:** {data.email}</li>
      <li>**Тип:** {data.productType}</li>
      <li>**Количество:** {data.quantity}</li>
    </ul>
  </>
);

const StepFinal = () => (
  <div style={{ padding: '20px', border: '2px solid green', textAlign: 'center' }}>
    ✅ Спасибо! Ваша форма успешно отправлена.
  </div>
);

export function MultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { currentStep, data, errors, isSubmitting } = state;

  console.log('isSubmitting');
  console.log(isSubmitting);

  const handleNext = () => {
    const stepErrors = validateStep(data, currentStep);

    if (Object.keys(stepErrors).length > 0) {
      // Диспатчим каждую ошибку в редьюсер, чтобы обновить UI
      Object.keys(stepErrors).forEach(field => {
        dispatch({ type: ActionType.SET_VALIDATION_ERROR, payload: { field, error: stepErrors[field] } });
      });
      return;
    }

    dispatch({ type: ActionType.NEXT_STEP });
  };

  const handleSubmit = async () => {
    dispatch({ type: ActionType.SUBMIT });
    await new Promise(resolve => setTimeout(resolve, 1500));

    dispatch({ type: ActionType.SUBMIT_SUCCESS });
  };

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return <Step1 data={data} dispatch={dispatch} errors={errors} />;
      case 2:
        return <Step2 data={data} dispatch={dispatch} errors={errors} />;
      case 3:
        return <Step3 data={data} />;
      case 4:
        return <StepFinal />;
      default:
        return <div>Ошибка шага</div>;
    }
  }, [currentStep, data, errors]);

  const isNextButtonDisabled = currentStep < 3 && Object.values(errors).some(e => e !== null);

  return (
    <div style={{ padding: '30px', maxWidth: '500px', margin: '0 auto', border: '1px solid #ccc' }}>
      <h1>Регистрация Проекта</h1>

      <p>Шаг {currentStep} из 3</p>

      <div style={{ border: '1px dashed #ddd', padding: '20px', marginBottom: '20px' }}>
        {renderStep()}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        {currentStep > 1 && currentStep < 4 && (
          <button
            onClick={() => dispatch({ type: ActionType.PREV_STEP })}
            disabled={isSubmitting}
          >
            &larr; Назад
          </button>
        )}

        {currentStep < 3 && (
          <button
            onClick={handleNext}
            disabled={isNextButtonDisabled || isSubmitting}
            style={{ marginLeft: 'auto' }}
          >
            Далее &rarr;
          </button>
        )}

        {currentStep === 3 && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ marginLeft: 'auto', backgroundColor: isSubmitting ? 'gray' : 'green', color: 'white' }}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
        )}

        {currentStep === 4 && (
          <button
            onClick={() => dispatch({ type: ActionType.RESET })}
            style={{ marginLeft: 'auto' }}
          >
            Начать заново
          </button>
        )}
      </div>
    </div>
  );
} 
