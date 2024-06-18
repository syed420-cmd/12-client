import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const CreateStudySession = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [registrationStartDate, setRegistrationStartDate] = useState('');
  const [registrationEndDate, setRegistrationEndDate] = useState('');
  const [classStartDate, setClassStartDate] = useState('');
  const [classEndDate, setClassEndDate] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');

  const handleCreateSession = async (e) => {
    e.preventDefault();

    if (
      !sessionTitle ||
      !sessionDescription ||
      !registrationStartDate ||
      !registrationEndDate ||
      !classStartDate ||
      !classEndDate ||
      !sessionDuration
    ) {
      return toast.error('All fields are required');
    }
    try {
      const res = await api.post('/sessions', {
        sessionTitle,
        tutorName: currentUser.name,
        tutorEmail: currentUser.email,
        sessionDescription,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        sessionDuration,
        registrationFee: 0, // Default to 0, only admin can modify
        status: 'pending', // Default status
      });
      if (res.status === 201) {
        toast.success('Session created successfully');
        // Reset form fields after successful creation
        setSessionTitle('');
        setSessionDescription('');
        setRegistrationStartDate('');
        setRegistrationEndDate('');
        setClassStartDate('');
        setClassEndDate('');
        setSessionDuration('');
        navigate('/tutor/dashboard');
      }
    } catch (error) {
      console.log('errot', error);
      toast.error(error.response.data.message || 'Failed to create session');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      {/* Render the common sidebar */}
      <CommonSidebar title="Tutor Portal" portal="tutor" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Study Session</h2>
          <form onSubmit={handleCreateSession} className="w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Session Title
              </label>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Session Description
              </label>
              <textarea
                value={sessionDescription}
                onChange={(e) => setSessionDescription(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
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
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
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
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
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
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
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
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
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
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Session
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateStudySession;
