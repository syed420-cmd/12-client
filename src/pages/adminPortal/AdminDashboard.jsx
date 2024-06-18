import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const fetchUsers = async (searchTerm) => {
  const { data } = await api.get('/user/getusers', {
    params: { search: searchTerm },
  });
  return data.users;
};

const updateUserRole = async ({ id, newRole }) => {
  const { data } = await api.put(`/user/update/${id}`, { role: newRole });
  return data;
};

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => fetchUsers(searchTerm),
  });

  const updateMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      toast.success('User role updated successfully');
      queryClient.invalidateQueries(['users']);
      setEditingUserId(null);
      setNewRole('');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Failed to update user role');
    },
  });

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setNewRole(user.role);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editingUserId, newRole });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    refetch();
  };

  return (
    <div className="flex h-screen">
      <CommonSidebar title="Admin Portal" portal="admin" />
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md mb-4"
          />
          {isLoading ? (
            <p className="text-lg text-gray-600">Loading users...</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  {editingUserId === user._id ? (
                    <form onSubmit={handleUpdate}>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Role
                        </label>
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                        >
                          <option value="admin">Admin</option>
                          <option value="tutor">Tutor</option>
                          <option value="student">Student</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
                      >
                        Update Role
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUserId(null)}
                        className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-2 ml-2"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-600">Email: {user.email}</p>
                      <p className="text-gray-600">Role: {user.role}</p>
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
                      >
                        Edit Role
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
