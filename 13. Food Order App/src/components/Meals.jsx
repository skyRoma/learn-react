import { Meal } from './Meal';
import { useHttp } from '../hooks/useHttp';

export const Meals = () => {
  const { data: meals, isLoading } = useHttp(
    'http://localhost:3000/meals',
    null,
    []
  );

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <Meal key={meal.id} {...meal} />
      ))}
    </ul>
  );
};
