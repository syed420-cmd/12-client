import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';

const fetchSession = async (id) => {
  const response = await api.get(`/sessions/${id}`);
  return response.data;
};

const BookStudySession = () => {
  const { currentUser } = useSelector((state) => state.user);
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

  const handlePaymentSubmit = async () => {
    try {
      const response = await api.post(`/sessions/${id}/book`);
      if (response.status === 200) {
        toast.success('Session booked successfully');
        navigate(`/study-session/${id}/confirmation`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading session data</p>;

  return (
    <section className="section session-details bg-gray-100 py-12">
      <div className="container">
        <div className="row justify-center">
          <div className="mt-10 max-w-[810px] lg:col-9 rounded-lg p-8 bg-white shadow">
            <h1 className="h2 text-3xl font-bold">{sessionData.title}</h1>
            <div className="mt-6 mb-5 flex items-center space-x-2 justify-between">
              <div className="flex items-center space-x-2">
                <div className="tutor-avatar h-[58px] w-[58px] rounded-full border-2 border-primary p-0.5">
                  <img
                    className="tutor-avatar h-[50px] w-[50px] rounded-full border-2"
                    src="/user.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-dark">{sessionData.tutorName}</p>
                  <span className="text-sm text-gray-600">
                    {new Date(sessionData.createdAt).toLocaleDateString()} •{' '}
                    {sessionData.duration} hours
                  </span>
                </div>
              </div>
            </div>

            <div className="content text-gray-800">
              <p>{sessionData.description}</p>
            </div>
            <div className="session-info mt-8">
              <p className="font-semibold text-lg text-primary">
                Session Information
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-semibold">Average Rating:</p>
                  <p>{sessionData.averageRating}</p>
                  <p className="font-semibold">Registration Start Date:</p>
                  <p>
                    {new Date(
                      sessionData.registrationStartDate,
                    ).toLocaleString()}
                  </p>
                  <p className="font-semibold">Registration End Date:</p>
                  <p>
                    {new Date(sessionData.registrationEndDate).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Class Start Time:</p>
                  <p>{new Date(sessionData.classStartDate).toLocaleString()}</p>
                  <p className="font-semibold">Class End Date:</p>
                  <p>{new Date(sessionData.classEndDate).toLocaleString()}</p>
                  <p className="font-semibold">Session Duration:</p>
                  <p>{sessionData.sessionDuration} hours</p>
                  <p className="font-semibold">Registration Fee:</p>
                  <p>
                    {sessionData.registrationFee > 0
                      ? `$${sessionData.registrationFee}`
                      : 'Free'}
                  </p>
                </div>
              </div>
            </div>

            {currentUser &&
              currentUser.role === 'student' &&
              sessionData.registrationFee > 0 && (
                <div className="payment-info mt-8">
                  <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8 text-2xl text-primary">
                    Payment Information
                  </h3>
                  <form className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={handlePaymentSubmit}
                    >
                      Submit Payment
                    </button>
                  </form>
                </div>
              )}

            {currentUser &&
              currentUser.role === 'student' &&
              sessionData.registrationFee === 0 && (
                <div className="payment-info mt-8">
                  <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8 text-2xl text-primary">
                    Payment Information
                  </h3>
                  <p className="mt-4 text-gray-800">
                    This session is free. Click the button below to book the
                    session.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={handlePaymentSubmit}
                  >
                    Book Session
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookStudySession;
