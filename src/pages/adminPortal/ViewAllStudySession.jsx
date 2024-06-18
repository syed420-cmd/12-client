import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/config';
import Modal from '../../components/Modal';
import CommonSidebar from '../../components/common/CommonSidebar';

// Fetch study sessions with pagination
const fetchSessions = async ({ pageParam = 1 }) => {
  const { data } = await api.get(`/sessions?limit=6&page=${pageParam}`);
  return {
    sessions: data,
    nextPage: data.length === 6 ? pageParam + 1 : undefined,
  };
};

// Approve a session
const approveSession = async ({ sessionId, isFree, amount }) => {
  const { data } = await api.put(`/sessions/${sessionId}`, {
    status: 'approved',
    registrationFee: isFree ? 0 : amount,
    rejectReason: '',
    feedback: '',
  });
  return data;
};

// Reject a session with reason and feedback
const rejectSession = async ({ sessionId, rejectReason, feedback }) => {
  const { data } = await api.put(`/sessions/${sessionId}`, {
    status: 'rejected',
    rejectReason,
    feedback,
  });
  return data;
};

const ViewAllStudySession = () => {
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState(null);
  const [isFree, setIsFree] = useState(true);
  const [amount, setAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [feedback, setFeedback] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const approveMutation = useMutation({
    mutationFn: approveSession,
    onSuccess: () => {
      toast.success('Session approved successfully');
      queryClient.invalidateQueries(['sessions']);
      setSelectedSession(null);
    },
    onError: () => {
      toast.error('Failed to approve session');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectSession,
    onSuccess: () => {
      toast.success('Session rejected successfully');
      queryClient.invalidateQueries(['sessions']);
      setSelectedSession(null);
      setRejectReason('');
      setFeedback('');
    },
    onError: () => {
      toast.error('Failed to reject session');
    },
  });

  const handleApprove = () => {
    if (!selectedSession) return;
    approveMutation.mutate({ sessionId: selectedSession._id, isFree, amount });
  };

  const handleReject = (session) => {
    setSelectedSession(session);
  };

  const handleRejectConfirm = () => {
    if (!selectedSession) return;
    rejectMutation.mutate({
      sessionId: selectedSession._id,
      rejectReason,
      feedback,
    });
  };

  const openUpdateModal = (session) => {
    setSelectedSession(session);
    setIsEditing(true);
    setIsFree(session.registrationFee === 0);
    setAmount(session.registrationFee);
  };

  return (
    <div className="flex h-screen">
      <CommonSidebar title="Admin Portal" portal="admin" />
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            View All Study Sessions
          </h2>
          {isLoading ? (
            <p className="text-lg text-gray-600">Loading sessions...</p>
          ) : isError ? (
            <p className="text-lg text-red-600">Error loading sessions: {error.message}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                  {page.sessions.map((session) => (
                    <div
                      key={session._id}
                      className={`bg-white p-4 rounded-md shadow-md ${
                        session.status === 'approved'
                          ? 'border-l-4 border-green-500'
                          : session.status === 'pending'
                            ? 'border-l-4 border-yellow-500'
                            : 'border-l-4 border-red-500'
                      }`}
                    >
                      <h3 className="text-xl font-semibold">
                        {session.sessionTitle}
                      </h3>
                      <p className="text-gray-600">Tutor: {session.tutorEmail}</p>
                      <p
                        className={`text-gray-600 font-semibold ${
                          session.status === 'approved'
                            ? 'text-green-500'
                            : session.status === 'pending'
                              ? 'text-yellow-500'
                              : 'text-red-500'
                        }`}
                      >
                        Status: {session.status}
                      </p>
                      {session.status === 'pending' && (
                        <>
                          <button
                            onClick={() => openUpdateModal(session)}
                            className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(session)}
                            className="btn btn-secondary bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2 ml-2"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {session.status === 'approved' && (
                        <>
                          <button
                            onClick={() => openUpdateModal(session)}
                            className="btn btn-primary bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mt-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleReject(session)}
                            className="btn btn-secondary bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2 ml-2"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          )}
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
      </section>

      {selectedSession && (
        <Modal onClose={() => setSelectedSession(null)}>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? 'Update Session' : 'Reject Session'}
            </h3>
            {!isEditing ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Rejection Reason
                  </label>
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                  />
                </div>
                <button
                  onClick={handleRejectConfirm}
                  className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
                >
                  Reject Session
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Is the session free or paid?
                  </label>
                  <select
                    value={isFree ? 'free' : 'paid'}
                    onChange={(e) => setIsFree(e.target.value === 'free')}
                    className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                {!isFree && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                    />
                  </div>
                )}
                <button
                  onClick={handleApprove}
                  className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
                >
                  Approve Session
                </button>
              </>
            )}
            <button
              onClick={() => {
                setSelectedSession(null);
                setIsEditing(false);
              }}
              className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-2 ml-2"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ViewAllStudySession;
