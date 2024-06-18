import { format } from 'date-fns';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMinutes = (now - date) / (1000 * 60);

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minutes ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.round(diffInMinutes / 60)} hours ago`;
  } else {
    return format(date, 'do MMM, yyyy');
  }
};

export const calculateReadTime = (content) => {
  // Assuming average reading speed of 200 words per minute
  if (!content) {
    return 0;
  }
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(words / wordsPerMinute);
  return readTimeMinutes;
};

export const getisWislistedOrNot = (postId, currentUser) => {
  if (!currentUser) {
    return false;
  }
  return currentUser?.wishlist?.includes(postId);
};
