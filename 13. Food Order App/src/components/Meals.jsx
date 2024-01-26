import { useEffect, useState } from 'react';
import { Meal } from './Meal';

export const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const meals = await response.json();
      setMeals(meals);
    };

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <Meal key={meal.id} {...meal} />
      ))}
    </ul>
  );
};
