import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/config';
import MaterialUploadForm from '../../components/MaterialUploadForm';
import CommonSidebar from '../../components/common/CommonSidebar';

const UploadMaterials = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [approvedSessions, setApprovedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const fetchApprovedSessions = async () => {
    try {
      const response = await api.get(
        `/sessions?tutorEmail=${currentUser.email}`,
      );
      setApprovedSessions(response.data);
    } catch (error) {
      console.error('Error fetching approved sessions:', error);
      toast.error('Failed to fetch approved sessions');
    }
  };

  useEffect(() => {
    fetchApprovedSessions();
  }, [currentUser.email]);

  const handleSessionSelect = (sessionId) => {
    const session = approvedSessions.find(
      (session) => session._id === sessionId,
    );
    setSelectedSession(session);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <CommonSidebar title="Tutor Portal" portal="tutor" />
      <section className="flex-1 bg-gray-200 h-screen overflow-hidden">
        <div className="pt-6 pl-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Upload Materials
          </h2>
        </div>
        <div className="p-6">
          {approvedSessions.length === 0 ? (
            <p className="text-lg text-gray-600">No approved sessions found.</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Session to Upload Materials
                </label>
                <select
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                  onChange={(e) => handleSessionSelect(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a session...
                  </option>
                  {approvedSessions.map((session) => (
                    <option key={session._id} value={session._id}>
                      {session.sessionTitle}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSession && (
                <div key={selectedSession._id} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedSession.sessionTitle}
                  </h3>
                  <MaterialUploadForm
                    sessionId={selectedSession._id}
                    tutorEmail={currentUser.email}
                    onMaterialUploaded={() => {
                      fetchApprovedSessions();
                      setSelectedSession(null);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default UploadMaterials;
