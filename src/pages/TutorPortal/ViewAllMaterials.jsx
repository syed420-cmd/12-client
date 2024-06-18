import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const fetchMaterials = async ({ queryKey }) => {
  const [, email] = queryKey;
  const { data } = await api.get(`/materials?tutorEmail=${email}`);
  return data;
};

const updateMaterial = async ({ id, updatedData }) => {
  const { data } = await api.put(`/materials/${id}`, updatedData);
  return data;
};

const deleteMaterial = async ({ id }) => {
  await api.delete(`/materials/${id}`);
};

const ViewAllMaterials = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    googleDriveLink: '',
  });

  const queryClient = useQueryClient();

  const { data: materials, isLoading } = useQuery({
    queryKey: ['materials', currentUser.email],
    queryFn: fetchMaterials,
  });

  const updateMutation = useMutation({
    mutationFn: updateMaterial,
    onSuccess: () => {
      toast.success('Material updated successfully');
      queryClient.invalidateQueries(['materials', currentUser.email]);
      setEditingMaterial(null);
      setFormData({
        title: '',
        imageUrl: '',
        googleDriveLink: '',
      });
    },
    onError: () => {
      toast.error('Failed to update material');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMaterial,
    onSuccess: () => {
      toast.success('Material deleted successfully');
      queryClient.invalidateQueries(['materials', currentUser.email]);
    },
    onError: () => {
      toast.error('Failed to delete material');
    },
  });

  const handleEdit = (material) => {
    setEditingMaterial(material._id);
    setFormData({
      title: material.title,
      imageUrl: material.imageUrl,
      googleDriveLink: material.googleDriveLink,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editingMaterial, updatedData: formData });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate({ id });
  };

  const downlaodImage = (material) => {
    const link = document.createElement('a');
    link.href = material.imageUrl;
    link.target = '_blank';
    link.setAttribute('download', 'image');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <CommonSidebar title="Tutor Portal" portal="tutor" />

      <section className="flex-1 bg-gray-200 h-screen overflow-hidden">
        <div className="pt-6 pl-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            View All Materials
          </h2>
        </div>
        <div
          className="p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto overflow-auto overflow-x-hidden scroll-0"
          style={{ height: 'calc(100% - 2rem)' }}
        >
          {isLoading ? (
            <p className="text-lg text-gray-600">Loading materials...</p>
          ) : materials.length === 0 ? (
            <p className="text-lg text-gray-600">No materials found.</p>
          ) : (
            materials.map((material) => (
              <div
                key={material._id}
                className="mb-6 p-4 bg-white rounded-md shadow-md"
              >
                {editingMaterial === material._id ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Google Drive Link
                      </label>
                      <input
                        type="text"
                        value={formData.googleDriveLink}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            googleDriveLink: e.target.value,
                          })
                        }
                        className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Update Material
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingMaterial(null)}
                      className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">{material.title}</h3>
                    <p className="text-gray-600 overflow-hidden">
                      <span>Google Drive Link:</span>{' '}
                      <a
                        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        href={material.googleDriveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </p>
                    {material.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={material.imageUrl}
                          alt={material.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => downlaodImage(material)}
                        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Downlaod
                      </button>
                      <button
                        onClick={() => handleEdit(material)}
                        className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(material._id)}
                        className="btn btn-danger bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewAllMaterials;
