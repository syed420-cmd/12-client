import { Link } from 'react-router-dom';

const CommonSidebar = ({ title, portal }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full flex-shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-200">{title}</h2>
        {/* Student */}
        {portal === 'student' && (
          <ul className="mt-6">
            <li className="py-2">
              <Link
                to="/student/dashboard"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                View Booked Sessions
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/student/create-note"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Create Note
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/student/personal-notes"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Manage Personal Notes
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/student/show-all-classmates"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                View All Classmates
              </Link>
            </li>
          </ul>
        )}
        {/* Tutor */}
        {portal === 'tutor' && (
          <ul className="mt-6">
            <li className="py-2">
              <Link
                to="/tutor/create-study-session"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Create Study Session
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/tutor/dashboard"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                View All Sessions
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/tutor/upload-material"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Upload Materials
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/tutor/view-all-materials"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                View All Materials
              </Link>
            </li>
          </ul>
        )}
        {/* Tutor */}
        {portal === 'admin' && (
          <ul className="mt-6">
            <li className="py-2">
              <Link
                to="/admin/dashboard"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                View All Users
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/admin/view-all-study-session"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                View All Study Sessions
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/admin/view-all-materials"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                View All Materials
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/admin/announcement"
                className="block hover:bg-gray-700 px-4 py-2 rounded"
              >
                Create Announcement
              </Link>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default CommonSidebar;
