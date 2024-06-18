import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import api from '../../api/config';

const fetchSession = async (id) => {
  const response = await api.get(`/sessions/${id}`);
  return response.data;
};

const StudySessionDetails = () => {
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

  const handleBookNow = () => {
    if (!currentUser) {
      toast.error('Please sign in to book a session');
      return navigate('/sign-in');
    }

    if (currentUser.role !== 'student') {
      toast.error('Only students can book sessions');
      return;
    }

    return navigate(`/study-session/${id}/book`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading session data</p>;

  return (
    <section className="section session-details bg-gray-100 py-12">
      <div className="container">
        <div className="row justify-center">
          <div className="mt-10 max-w-[810px] lg:col-9 rounded-lg p-8">
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
              {currentUser && currentUser.role !== 'student' && (
                <div>
                  <button
                    className={twMerge(
                      'inline-flex items-center px-3 py-2 bg-gray-400 text-white text-sm font-medium rounded cursor-not-allowed opacity-50',
                    )}
                    aria-disabled
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </div>
              )}
              {currentUser && currentUser.role === 'student' && (
                <div>
                  <button className="btn btn-primary" onClick={handleBookNow}>
                    Book Now
                  </button>
                </div>
              )}
              {!currentUser && (
                <div>
                  <button className="btn btn-primary" onClick={handleBookNow}>
                    Book Now
                  </button>
                </div>
              )}
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

            <div className="reviews mt-8">
              <h3 className="h5 inline-block border-b-[3px] border-primary font-primary font-medium leading-8 text-2xl text-primary">
                Reviews
              </h3>
              {sessionData?.reviews?.length > 0 ? (
                sessionData?.reviews?.map((review) => (
                  <div
                    className="review flex space-x-4 border-b border-border py-8"
                    key={review._id}
                  >
                    <img
                      src="/user.jpg"
                      className="h-[50px] w-[50px] rounded-full"
                      alt=""
                    />
                    <div>
                      <h4 className="font-primary text-lg font-medium capitalize">
                        {review.createdBy}
                      </h4>
                      <p className="mt-2.5 text-gray-600">
                        {new Date(review.createdAt).toLocaleString()}
                      </p>
                      <p className="mt-5">{review.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-full">No reviews found</div>
              )}
            </div>
            {currentUser && currentUser.role !== 'student' && (
              <button
                className="inline-flex items-center px-3 py-2 bg-gray-400 text-white text-sm font-medium rounded cursor-not-allowed opacity-50 mt-8"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            )}
            {currentUser && currentUser.role === 'student' && (
              <button
                className="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            )}
            {!currentUser && (
              <button
                className="btn btn-primary mt-8 min-w-[189px] cursor-pointer"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudySessionDetails;
