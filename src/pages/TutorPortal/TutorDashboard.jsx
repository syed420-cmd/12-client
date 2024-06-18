import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/config';
import StudySessionCard from '../../components/blogs/StudySessionCard';
import CommonSidebar from '../../components/common/CommonSidebar';

// Fetch study sessions with pagination for the tutor
const fetchTutorSessions = async ({ pageParam = 1, email }) => {
  const { data } = await api.get(`/sessions`, {
    params: {
      limit: 6,
      page: pageParam,
      tutorEmail: email,
    },
  });
  return {
    sessions: data,
    nextPage: data.length === 6 ? pageParam + 1 : undefined,
  };
};

const TutorDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['tutorSessions', currentUser.email],
    queryFn: ({ pageParam = 1 }) =>
      fetchTutorSessions({ pageParam, email: currentUser.email }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    onError: (err) => {
      toast.error(`Error fetching sessions: ${err.message}`);
    },
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render the common sidebar */}
      <CommonSidebar title="Tutor Portal" portal="tutor" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 h-screen overflow-hidden">
        <div className="pt-6 pl-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Study sessions
          </h2>
        </div>
        <div
          className="overflow-y-auto overflow-auto overflow-x-hidden scroll-0"
          style={{ height: 'calc(100vh - 6rem)' }} // Adjust height as needed
        >
          <div className="row p-10 overflow-hidden">
            {isLoading ? (
              <p className="text-lg text-gray-600">Loading sessions...</p>
            ) : isError ? (
              <p className="text-lg text-red-600">
                Error loading sessions: {error.message}
              </p>
            ) : (
              <>
                {data.pages.map((page, pageIndex) => (
                  <Fragment key={pageIndex}>
                    {page.sessions.map((session) => (
                      <StudySessionCard
                        key={session._id}
                        session={session}
                        role={currentUser.role}
                        isPortal
                      />
                    ))}
                  </Fragment>
                ))}
              </>
            )}
            {hasNextPage && (
              <div className="w-full text-center mt-4">
                <button
                  className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mx-auto mt-4"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : 'Load More Sessions'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorDashboard;
