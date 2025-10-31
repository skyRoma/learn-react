
self.onmessage = function (event) {
  const inputNumber = event.data.number;

  let result = 0;
  for (let i = 0; i < inputNumber; i++) {
    result += Math.sqrt(i);
  }

  self.postMessage({ result: result, timestamp: Date.now() });
};
