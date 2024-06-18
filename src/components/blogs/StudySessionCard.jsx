import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const StudySessionCard = ({ session, index, isPortal, role }) => {
  let statusColorClass = '';

  switch (session.status) {
    case 'approved':
      statusColorClass = 'bg-green-200 text-green-800';
      break;
    case 'pending':
      statusColorClass = 'bg-yellow-200 text-yellow-800';
      break;
    case 'rejected':
      statusColorClass = 'bg-red-200 text-red-800';
      break;
    default:
      statusColorClass = 'bg-blue-200 text-blue-800';
      break;
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
              {session.status}
            </div>
          </div>
          <div className="card-content p-4">
            <h3 className="h4 card-title text-xl font-semibold mb-2">
              {session.sessionTitle}
            </h3>
            <p className="text-gray-600 mb-4">{session.sessionDescription}</p>
            <div className="card-footer flex justify-between items-center">
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudySessionCard;
