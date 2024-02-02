import { useParams } from 'react-router-dom';

export const EventDetailPage = () => {
  const param = useParams();

  return <h1>{param.eventId}</h1>;
};
