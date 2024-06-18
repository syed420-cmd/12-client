import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const EditStudySession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.user);

  // Fetch session details using useQuery
  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      const response = await api.get(`/sessions/${id}`);
      return response.data;
    },
  });

  // Define mutation for updating session
  const updateSessionMutation = useMutation({
    mutationFn: async (updatedSession) => {
      const response = await api.put(`/sessions/${id}`, updatedSession);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Session updated successfully');
      navigate('/tutor/dashboard');
      queryClient.invalidateQueries(['session', id]); // Invalidate cache to refetch data
    },
    onError: (error) => {
      console.error('Error updating session:', error);
      toast.error(error.response?.data?.message || 'Failed to update session');
    },
  });

  // State for session fields
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [registrationStartDate, setRegistrationStartDate] = useState('');
  const [registrationEndDate, setRegistrationEndDate] = useState('');
  const [classStartDate, setClassStartDate] = useState('');
  const [classEndDate, setClassEndDate] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectFeedback, setRejectFeedback] = useState('');

  // Effect to initialize session fields
  useEffect(() => {
    if (session) {
      setSessionTitle(session.sessionTitle);
      setSessionDescription(session.sessionDescription);
      setRegistrationStartDate(
        formatISODateForInput(session.registrationStartDate),
      );
      setRegistrationEndDate(
        formatISODateForInput(session.registrationEndDate),
      );
      setClassStartDate(formatISODateForInput(session.classStartDate));
      setClassEndDate(formatISODateForInput(session.classEndDate));
      setSessionDuration(session.sessionDuration.toString()); // Convert to string for input type number
      setRejectReason(session.rejectReason || '');
      setRejectFeedback(session.feedback || '');
    }
  }, [session]);

  // Function to format ISO date for input (YYYY-MM-DDTHH:MM)
  const formatISODateForInput = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 16); // Truncate milliseconds and timezone
  };

  // Handle update session submit
  const handleUpdateSession = async (e) => {
    e.preventDefault();

    const updatedSession = {
      sessionTitle,
      tutorName: currentUser.name,
      tutorEmail: currentUser.email,
      sessionDescription,
      registrationStartDate: new Date(registrationStartDate).toISOString(),
      registrationEndDate: new Date(registrationEndDate).toISOString(),
      classStartDate: new Date(classStartDate).toISOString(),
      classEndDate: new Date(classEndDate).toISOString(),
      sessionDuration: parseInt(sessionDuration), // Convert to integer for consistency
      registrationFee: 0, // Default to 0, only admin can modify
      status: 'pending', // Default status
    };

    try {
      await updateSessionMutation.mutateAsync(updatedSession);
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error(error.response?.data?.message || 'Failed to update session');
    }
  };

  if (isLoading) return <p>Loading session details...</p>;
  if (error) return <p>Error fetching session details: {error.message}</p>;

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      {/* Render the common sidebar */}
      <CommonSidebar title="Tutor Portal" portal="tutor" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Study Session</h2>
          <form onSubmit={handleUpdateSession} className="w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Session Title
              </label>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Session Description
              </label>
              <textarea
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md h-32 resize-none focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Registration Start Date
                </label>
                <input
                  type="datetime-local"
                  value={registrationStartDate}
                  onChange={(e) => setRegistrationStartDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Registration End Date
                </label>
                <input
                  type="datetime-local"
                  value={registrationEndDate}
                  onChange={(e) => setRegistrationEndDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Class Start Date
                </label>
                <input
                  type="datetime-local"
                  value={classStartDate}
                  onChange={(e) => setClassStartDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Class End Date
                </label>
                <input
                  type="datetime-local"
                  value={classEndDate}
                  onChange={(e) => setClassEndDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Session Duration (hours)
                </label>
                <input
                  type="number"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update Session
            </button>
          </form>
        </div>
      </section>

      {/* Right side section */}
      <section className="flex-1 bg-gray-100 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          {session.status === 'rejected' && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md mb-4">
              <h3 className="text-lg font-semibold mb-2">Reject Reason</h3>
              <p>{rejectReason}</p>
            </div>
          )}

          {session.status === 'rejected' && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md mb-4">
              <h3 className="text-lg font-semibold mb-2">Reject Feedback</h3>
              <p>{rejectFeedback}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditStudySession;
