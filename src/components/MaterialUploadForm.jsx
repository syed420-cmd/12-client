import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/config';

const MaterialUploadForm = ({ sessionId, tutorEmail, onMaterialUploaded }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [googleDriveLink, setGoogleDriveLink] = useState('');

  const handleUpdloadImage = async (e) => {
    try {
      const file = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      return toast.error('Title and Image are required');
    }
    try {
      // Example: Uploading image using FormData
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);
      formData.append('googleDriveLink', googleDriveLink);
      formData.append('sessionId', sessionId);
      formData.append('tutorEmail', tutorEmail);

      console.log('title', title);
      console.log('googleDriveLink', googleDriveLink);
      console.log('sessionId', sessionId);
      console.log('tutorEmail', tutorEmail);
      console.log('image', image);
      const response = await api.post(`materials`, formData);

      if (response.status === 201) {
        toast.success('Material uploaded successfully');
        // Optional: Implement callback to refresh data or navigate to a new page
        if (onMaterialUploaded) {
          onMaterialUploaded();
        }
      }
    } catch (error) {
      console.error('Error uploading material:', error);
      toast.error('Failed to upload material');
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Image
          </label>
          <input
            type="file"
            onChange={handleUpdloadImage}
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Google Drive Link
          </label>
          <input
            type="text"
            value={googleDriveLink}
            onChange={(e) => setGoogleDriveLink(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Upload Material
        </button>
      </form>
    </div>
  );
};

export default MaterialUploadForm;
