import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import api from '../../api/config';
import StudySessionCardHome from '../../components/blogs/StudySessionCardHome';
import TutorCard from '../../components/blogs/TutorCard';

const Index = () => {
  const maxSessionsToShow = 6;

  const fetchSessions = async ({ pageParam = 1 }) => {
    const response = await api.get(
      `/sessions?limit=${maxSessionsToShow}&page=${pageParam}&status=approved`,
    );
    return {
      sessions: response.data,
      nextPage: pageParam + 1,
      hasMore: response.data.length === maxSessionsToShow,
    };
  };

  const fetchTutors = async () => {
    const response = await api.get('/user/all/tutors');
    return response.data;
  };

  const {
    data: tutors,
    isLoading: tutorsLoading,
    error: tutorsError,
  } = useQuery({
    queryKey: ['tutors'],
    queryFn: fetchTutors,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useInfiniteQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  if ((sessionsLoading && !data) || (tutorsLoading && !tutors)) {
    return (
      <section className="section pt-0">
        <div className="container">
          <div className="row">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton height={200} />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="60%" />
                <Skeleton height={20} width="40%" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sessionsError) {
    return <p>Error loading sessions: {sessionsError.message}</p>;
  }

  if (tutorsError) {
    return <p>Error loading tutors: {tutorsError.message}</p>;
  }

  return (
    <section className="section pt-0">
      <div className="container">
        {/* Banner Section */}
        <div className="relative w-full h-96 mb-10">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="/images/post-11.png"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Welcome to Study Portal
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              Learn and Share your knowledge with others
            </p>
            <a
              className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              href="#recent-blogs"
            >
              Explore Now
            </a>
          </div>
        </div>
        <h2 className="h4 mb-4">Study session</h2>
        <div className="row">
          {data.pages.length > 0 ? (
            data.pages.map((page, pageIndex) => (
              <Fragment key={pageIndex}>
                {page.sessions.length > 0 ? (
                  page.sessions.map((session, index) => (
                    <StudySessionCardHome
                      session={session}
                      index={index}
                      key={index}
                      isPortal={false}
                    />
                  ))
                ) : (
                  <p>No sessions found.</p>
                )}
              </Fragment>
            ))
          ) : (
            <p>No sessions found.</p>
          )}

          {/* See all session button */}
          {hasNextPage && (
            <div className="w-full text-center mt-4">
              <button
                className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mx-auto mt-4"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading more...' : 'Load More Sessions'}
              </button>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">Tutors</h2>
        <div className="row">
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor, index) => (
              <TutorCard key={index} tutor={tutor} index={index} />
            ))
          ) : (
            <p>No tutors found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Index;
