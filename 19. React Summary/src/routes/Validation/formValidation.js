export function validateStep(data, step) {
  const errors = {};

  if (step === 1) {
    if (!data.name.trim()) {
      errors.name = 'Введите ваше имя.';
    }
    if (!data.email.includes('@')) {
      errors.email = 'Неверный формат email.';
    }
  }

  else if (step === 2) {
    const qty = data.quantity;

    if (data.productType === 'premium' && qty < 5) {
      errors.quantity = 'Для премиум-продукта минимальное количество — 5.';
    } else if (qty < 1) {
      errors.quantity = 'Количество должно быть не менее 1.';
    }
  }

  return errors;
}
