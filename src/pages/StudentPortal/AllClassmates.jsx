import { useQuery } from '@tanstack/react-query';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const fetchClassmates = async () => {
  const response = await api.get('/sessions/book/classmates');
  return response.data;
};

const AllClassmates = () => {
  const {
    data: classmates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['classmates'],
    queryFn: fetchClassmates,
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render the common sidebar */}
      <CommonSidebar title="Student Portal" portal="student" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 pb-16 h-screen overflow-hidden">
        <div className="pt-6 pl-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            All Classmates
          </h2>
        </div>
        <div className="pt-6 px-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading classmates: {error.message}</p>
          ) : classmates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                      Session
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classmates?.map((classmate) => (
                    <tr key={classmate._id}>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {classmate.student.name}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {classmate.student.email}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {classmate.session.sessionTitle}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No classmates found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllClassmates;
