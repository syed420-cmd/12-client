import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const StudySessionCard = ({ session, index, isPortal, role }) => {
  // Determine the session status color and text
  let statusColorClass = '';
  let statusText = '';

  // Check if the registration is closed
  const isRegistrationClosed =
    new Date(session.registrationEndDate) < new Date();
  const closedStatusColorClass = 'bg-red-200 text-red-800';

  if (isRegistrationClosed) {
    statusColorClass = closedStatusColorClass;
    statusText = 'Closed';
  } else {
    statusColorClass = 'bg-blue-200 text-blue-800';
    statusText = 'Ongoing';
  }

  return (
    <div className="mb-8 md:col-6 lg:col-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.3 }}
      >
        <div className="card border border-gray-200 rounded-lg overflow-hidden shadow-sm relative">
          <div className="absolute top-3 right-2">
            <div
              className={twMerge(
                'px-2 py-1 rounded capitalize',
                statusColorClass,
              )}
            >
              {statusText}
            </div>
          </div>
          <div className="card-content p-4">
            <h3 className="h4 card-title text-xl font-semibold mb-2">
              {session.sessionTitle}
            </h3>
            <p className="text-gray-600 mb-4">{session.sessionDescription}</p>
            <div className="card-footer flex justify-between items-center">
              {isRegistrationClosed ? (
                <div
                  className={twMerge(
                    'inline-flex items-center px-3 py-2 bg-gray-400 text-white text-sm font-medium rounded cursor-not-allowed opacity-50',
                  )}
                  aria-disabled
                >
                  {isPortal ? 'View Details' : 'Read More'}
                </div>
              ) : (
                <Link
                  to={
                    isPortal && role
                      ? `/${role}/study-session/${session._id}`
                      : `/study-session/${session._id}`
                  }
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                >
                  {isPortal ? 'View Details' : 'Read More'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudySessionCard;
