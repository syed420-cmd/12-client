import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';
import CommonSidebar from '../../components/common/CommonSidebar';

const fetchSessionDetails = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await api.get(`/sessions/${id}`);
  return data;
};

const addReview = async ({ id, newReview }) => {
  const { data } = await api.post(`/sessions/${id}/review`, newReview);
  return data;
};

const StudySessionDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['session', id],
    queryFn: fetchSessionDetails,
  });

  const addReviewMutation = useMutation({
    mutationFn: ({ id, newReview }) => addReview({ id, newReview }),
    onSuccess: () => {
      toast.success('Review added successfully');
      queryClient.invalidateQueries(['session', id]);
      setRating('');
      setComment('');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add review');
    },
  });

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();
    addReviewMutation.mutate({ id, newReview: { rating, comment } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching session details</div>;
  }

  return (
    <div className="flex h-screen">
      <CommonSidebar title="Student Portal" portal="student" />
      <section className="flex-1 bg-gray-200 p-6 h-screen overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Session Details</h2>
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h3 className="text-xl font-semibold">{session.sessionTitle}</h3>
            <p className="mt-2">{session.sessionDescription}</p>
            <p className="mt-2">
              Date: {new Date(session.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            <form onSubmit={handleAddReview} className="mb-5">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                >
                  <option value="">Select rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Review
              </button>
            </form>

            {session.reviews && session.reviews.length > 0 ? (
              session.reviews.map((review) => (
                <div key={review._id} className="mb-4">
                  <p>
                    <strong>{review.createdBy}</strong> - {review.rating} stars
                  </p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudySessionDetail;
