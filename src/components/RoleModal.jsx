import { useState } from 'react';

const RoleModal = ({ isOpen, onClose, onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleConfirm = () => {
    onSelectRole(selectedRole);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h3 className="text-xl font-semibold mb-4">Select Your Role</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={handleConfirm}
            className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default RoleModal;
