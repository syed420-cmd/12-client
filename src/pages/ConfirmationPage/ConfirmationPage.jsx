import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/config';

const fetchSession = async (id) => {
  const response = await api.get(`/sessions/${id}`);
  return response.data;
};

const ConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: sessionData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['session', id],
    queryFn: () => fetchSession(id),
    enabled: !!id,
  });

  const handleBackToSessions = () => {
    navigate('/');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading session data</p>;

  return (
    <section className="section confirmation-page bg-gray-100 py-12">
      <div className="container">
        <div className="row justify-center">
          <div className="mt-10 max-w-[810px] lg:col-9 rounded-lg p-8 bg-white shadow">
            <h1 className="h2 text-3xl font-bold text-green-600">Success!</h1>
            <p className="mt-4 text-lg">
              Your session has been booked successfully.
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">{sessionData.title}</h2>
              <p className="mt-2 text-gray-600">{sessionData.description}</p>
              <div className="mt-4">
                <p className="font-semibold">Tutor:</p>
                <p>{sessionData.tutorName}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Class Date:</p>
                <p>{new Date(sessionData.classStartDate).toLocaleString()}</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Duration:</p>
                <p>{sessionData.sessionDuration} hours</p>
              </div>
            </div>
            <button
              className="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
              onClick={handleBackToSessions}
            >
              Back to Sessions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationPage;
