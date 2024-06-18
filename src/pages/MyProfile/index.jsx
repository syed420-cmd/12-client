import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/config';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [name, setName] = useState(currentUser?.name || '');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/user/update/${currentUser?.id}`, {
        name,
      });
      if (res.status === 200) {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section pt-0">
      <div className="container">
        <div className="relative w-full h-96 mb-10">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src={currentUser.image}
            alt="Profile Banner"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Your Profile
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              Manage your account information and settings
            </p>
          </div>
        </div>
        <h2 className="h4 mb-4">Profile Information</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Is Admin
              </label>
              <div>
                {currentUser.isAdmin ? (
                  <span className="text-green-500 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-500 font-semibold">No</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
