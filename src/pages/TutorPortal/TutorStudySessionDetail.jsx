import { Link } from 'react-router-dom';
import CommonSidebar from '../../components/common/CommonSidebar';
import { mockSession } from '../../utils/const';

const TutorStudySessionDetail = () => {
  // Use mock session data instead of fetching from an API
  const session = mockSession;

  return (
    <div className="flex h-screen">
      <CommonSidebar title="Tutor Portal" portal="tutor" />
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Session Details</h2>
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {session.sessionTitle}
                </h3>
                <p className="text-gray-600 mb-12">
                  {session.sessionDescription}
                </p>
              </div>
              <div>
                <button>
                  <Link
                    to={`/tutor/edit-study-session/${session._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </Link>
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-gray-700">
                  <strong>Tutor:</strong> {session.tutorName}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {session.tutorEmail}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Status:</strong>{' '}
                  <span className="text-orange-700">{session.status}</span>
                </p>
                <p className="text-gray-700">
                  <strong>Registration Fee:</strong> ${session.registrationFee}
                </p>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-gray-700">
                  <strong>Session Duration:</strong> {session.sessionDuration}{' '}
                  hours
                </p>
                <p className="text-gray-700">
                  <strong>Registration Period:</strong>{' '}
                  {new Date(session.registrationStartDate).toLocaleDateString()}{' '}
                  - {new Date(session.registrationEndDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Class Period:</strong>{' '}
                  {new Date(session.classStartDate).toLocaleDateString()} -{' '}
                  {new Date(session.classEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {session.reviews.map((review) => (
              <div key={review._id} className="mb-4">
                <p>
                  <strong>{review.user.name}</strong> - {review.rating} stars
                </p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorStudySessionDetail;
