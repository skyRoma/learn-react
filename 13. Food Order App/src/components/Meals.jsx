import { Meal } from './Meal';
import { useHttp } from '../hooks/useHttp';
import { Error } from './Error';

export const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', null, []);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <Meal key={meal.id} {...meal} />
      ))}
    </ul>
  );
};
