import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '../../api/config';

const Announcement = () => {
  // Fetch announcements using useQuery
  const {
    data: announcements,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const response = await api.get('/announcements');
      return response.data;
    },
  });

  // Effect to refetch announcements on mount (optional)
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Function to determine border color based on time gap
  const getBorderStyle = (createdAt) => {
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDiff = now.getTime() - createdAtDate.getTime();

    let borderColor = 'border-l-4'; // Default border style
    if (timeDiff <= ONE_DAY_MS) {
      borderColor += ' border-green-500'; // Green border for announcements within the last day
    } else if (timeDiff <= 7 * ONE_DAY_MS) {
      borderColor += ' border-blue-500'; // Blue border for announcements within the last week
    } else {
      borderColor += ' border-gray-400'; // Gray border for older announcements
    }
    return borderColor;
  };

  if (isLoading)
    return <p className="text-center mt-8">Loading announcements...</p>;
  if (error)
    return (
      <p className="text-center mt-8 text-red-500">
        Error fetching announcements: {error.message}
      </p>
    );

  return (
    <section className="section pt-8 pb-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Announcements from admin
        </h2>
        {announcements && announcements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${getBorderStyle(announcement.createdAt)}`}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{announcement.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Created by: {announcement.createdBy}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created at:{' '}
                    {new Date(announcement.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4 text-center">
            No announcements available
          </p>
        )}
      </div>
    </section>
  );
};

export default Announcement;
