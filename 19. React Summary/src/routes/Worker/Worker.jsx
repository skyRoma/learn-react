import React, { useState, useEffect } from 'react';
// Предполагаем, что ваш сборщик (Vite/Webpack) настроен для импорта Worker
import Worker from './HeavyTask?worker';

export function WorkerComponent() {
  const [workerResult, setWorkerResult] = useState(null);
  const [uiCounter, setUiCounter] = useState(0); // Счетчик для демонстрации, что UI не заблокирован

  useEffect(() => {
    const myWorker = new Worker();

    myWorker.onmessage = (event) => {
      console.log("Получен результат от Worker.");
      setWorkerResult(event.data.result);

      // Завершаем Worker после получения результата
      myWorker.terminate();
    };

    const startNumber = 2000000000;
    console.log(`Начинаем тяжелое вычисление для числа ${startNumber}...`);
    myWorker.postMessage({ number: startNumber });

    return () => {
      myWorker.terminate();
      console.log("Worker завершен.");
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '400px' }}>
      <h2>Демонстрация Web Worker</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>
          **Счетчик UI:** **{uiCounter}**
        </p>
        <button onClick={() => setUiCounter(c => c + 1)}>
          Увеличить Счетчик (Проверить отзывчивость UI)
        </button>
      </div>

      <h3>Статус Вычислений:</h3>
      {workerResult === null ? (
        <p style={{ color: 'orange' }}>⚙️ Вычисляется в **фоновом потоке**...</p>
      ) : (
        <p>✅ Результат: **{workerResult.toFixed(2)}**</p>
      )}

      <p style={{ fontSize: 'small', marginTop: '15px' }}>
        *Если бы вычисления выполнялись в основном потоке, кнопка "Увеличить Счетчик" зависла бы.
      </p>
    </div>
  );
}
