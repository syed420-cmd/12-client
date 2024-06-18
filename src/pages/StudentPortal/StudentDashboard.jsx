import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import api from '../../api/config';
import StudySessionCard from '../../components/blogs/StudySessionCard';
import CommonSidebar from '../../components/common/CommonSidebar';

const StudentDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const {
    data: bookedSessions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookedSessions'],
    queryFn: async () => {
      const response = await api.get('/sessions/book/approved');
      return response.data;
    },
    enabled: !!currentUser,
  });

  if (isLoading)
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Render the common sidebar */}
        <CommonSidebar title="Student Portal" portal="student" />
        {/* Main content */}
        <div className="flex-1 bg-gray-200 h-screen overflow-hidden">
          <div className="pt-6 pl-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              Booked Study Sessions
            </h2>
          </div>
          <div className="row p-10 overflow-hidden">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Render the common sidebar */}
        <CommonSidebar title="Student Portal" portal="student" />
        {/* Main content */}
        <section className="flex-1 bg-gray-200 h-screen overflow-hidden">
          <div className="pt-6 pl-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              Booked Study Sessions
            </h2>
          </div>
          <div className="row p-10 overflow-hidden">
            <p>Error loading booked sessions</p>
          </div>
        </section>
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render the common sidebar */}
      <CommonSidebar title="Student Portal" portal="student" />
      {/* Main content */}
      <section className="flex-1 bg-gray-200 h-screen overflow-hidden">
        <div className="pt-6 pl-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Booked Study Sessions
          </h2>
        </div>
        <div
          className="overflow-y-auto overflow-auto overflow-x-hidden scroll-0"
          style={{ height: '100%' }}
        >
          <div className="row p-10 overflow-hidden">
            {bookedSessions?.length > 0 ? (
              bookedSessions.map((sessionBook) => (
                <StudySessionCard
                  key={sessionBook.session._id}
                  session={sessionBook.session}
                  isPortal
                  role={currentUser.role}
                />
              ))
            ) : (
              <p>No booked sessions found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
