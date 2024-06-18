import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

// Fetch all materials
const fetchMaterials = async () => {
  const { data } = await api.get('/materials');
  return data;
};

// Delete a material
const deleteMaterial = async (materialId) => {
  const { data } = await api.delete(`/materials/${materialId}`);
  return data;
};

const ViewAllAdminMaterials = () => {
  const queryClient = useQueryClient();

  const { data: materials, isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: fetchMaterials,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMaterial,
    onSuccess: () => {
      toast.success('Material deleted successfully');
      queryClient.invalidateQueries(['materials']);
    },
    onError: () => {
      toast.error('Failed to delete material');
    },
  });

  const handleDelete = (materialId) => {
    deleteMutation.mutate(materialId);
  };

  return (
    <div className="flex h-screen">
      <CommonSidebar title="Admin Portal" portal="admin" />
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            View All Admin Materials
          </h2>
          {isLoading ? (
            <p className="text-lg text-gray-600">Loading materials...</p>
          ) : materials.length === 0 ? (
            <p className="text-lg text-gray-600">No materials found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <h3 className="text-xl font-semibold">{material.title}</h3>
                  <p className="text-gray-600">
                    Tutor Email: {material.tutorEmail}
                  </p>
                  <div className="my-2">
                    <img
                      src={material.imageUrl}
                      alt={material.title}
                      className="rounded-md max-w-full h-auto"
                      style={{ maxWidth: '100%', maxHeight: '200px' }} // Adjust dimensions as needed
                    />
                  </div>
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
                  <p className="text-gray-600">
                    Created At: {new Date(material.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(material._id)}
                    className="btn btn-secondary bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewAllAdminMaterials;
