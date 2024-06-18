import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const AdminAnnouncement = () => {
  const queryClient = useQueryClient();

  // State for announcement fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Mutation for creating announcement
  const createAnnouncementMutation = useMutation({
    mutationFn: async (announcement) => {
      const response = await api.post('/announcements', announcement);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Announcement created successfully');
      queryClient.invalidateQueries('announcements'); // Invalidate cache to refetch data
      setTitle('');
      setContent('');
    },
    onError: (error) => {
      console.error('Error creating announcement:', error);
      toast.error(
        error.response?.data?.message || 'Failed to create announcement',
      );
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      title,
      content,
    };

    try {
      await createAnnouncementMutation.mutateAsync(newAnnouncement);
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error(
        error.response?.data?.message || 'Failed to create announcement',
      );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Render the common sidebar */}
      <CommonSidebar title="Admin Portal" portal="admin" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Admin Announcement</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Announcement Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Announcement Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white border border-gray-300 px-4 py-2 rounded-md h-32 resize-none focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Announcement
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminAnnouncement;
