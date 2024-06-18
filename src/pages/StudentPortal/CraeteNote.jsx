import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const CreateNote = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      return toast.error('Please fill in all fields');
    }
    try {
      const res = await api.post('/notes', {
        title,
        description,
      });
      console.log('res', res);
      if (res.status === 201) {
        toast.success('Note created successfully');
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Render the common sidebar */}
      <CommonSidebar title="Student Portal" portal="student" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create a New Note</h2>
          <form onSubmit={handleCreateNote}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={currentUser.email}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                placeholder="Enter note title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                placeholder="Enter note description"
                rows="6"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Create Note
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateNote;
