import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const fetchNotes = async () => {
  const res = await api.get('/notes');
  return res.data;
};

const ManagePersonalNotes = () => {
  const queryClient = useQueryClient();
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ noteId, title, description }) => {
      const res = await api.put(`/notes/${noteId}`, { title, description });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Note updated successfully');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setEditingNote(null);
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'Failed to update note');
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId) => {
      await api.delete(`/notes/${noteId}`);
    },
    onSuccess: () => {
      toast.success('Note deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'Failed to delete note');
    },
  });

  const handleUpdateNote = (noteId) => {
    updateNoteMutation.mutate({ noteId, title, description });
  };

  const handleDeleteNote = (noteId) => {
    deleteNoteMutation.mutate(noteId);
  };

  const startEditing = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setTitle('');
    setDescription('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render the common sidebar */}
      <CommonSidebar title="Student Portal" portal="student" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 pb-16 h-screen overflow-hidden">
        <div className="pt-6 pl-6">
          <h2 className="text-2xl font-semibold text-gray-700">Manage Notes</h2>
        </div>
        <div
          className="overflow-y-auto overflow-auto overflow-x-hidden scroll-0"
          style={{ height: 'calc(100% - 3rem)' }}
        >
          <div className="p-10">
            {notes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id}
                  className="mb-4 p-4 bg-white rounded-md shadow-md"
                >
                  {editingNote?._id === note._id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateNote(note._id);
                      }}
                    >
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
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="btn btn-secondary mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Update Note
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">{note.title}</h3>
                      <p className="mt-2">{note.description}</p>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => startEditing(note)}
                          className="btn btn-secondary mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note._id)}
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
        </div>
      </section>
    </div>
  );
};

export default ManagePersonalNotes;
