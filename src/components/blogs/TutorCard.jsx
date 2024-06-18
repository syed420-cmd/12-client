import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TutorCard = ({ tutor, index }) => {
  return (
    <div className="mb-8 md:col-6 lg:col-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.3 }}
      >
        <div className="card border border-gray-200 rounded-lg overflow-hidden shadow-sm relative">
          <div className="card-content p-4">
            <h3 className="h4 card-title text-xl font-semibold mb-2">
              {tutor.name}
            </h3>
            <p className="text-gray-600 mb-2">{tutor.expertise}</p>
            <p className="text-gray-600 mb-4">{tutor.bio}</p>
            <div className="card-footer flex justify-between items-center">
              <Link
                to="#"
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorCard;
