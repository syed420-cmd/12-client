export const sessions = [
  {
    _id: 1,
    sessionTitle: 'Mathematics Basics',
    sessionDescription:
      'An introductory session on algebra and geometry fundamentals.',
    status: 'ongoing',
  },
  {
    _id: 2,
    sessionTitle: 'Physics Principles',
    sessionDescription:
      'Understanding the basic laws of physics and their applications.',
    status: 'closed',
  },
  {
    _id: 3,
    sessionTitle: 'Chemistry Fundamentals',
    sessionDescription: 'Exploring the elements and basic chemical reactions.',
    status: 'ongoing',
  },
  {
    _id: 4,
    sessionTitle: 'History of the World',
    sessionDescription:
      'A look into the significant historical events and their impacts.',
    status: 'ongoing',
  },
  {
    _id: 5,
    sessionTitle: 'Literature Analysis',
    sessionDescription:
      'Analyzing classic and modern literature. their applications.',
    status: 'closed',
  },
  {
    _id: 6,
    sessionTitle: 'Computer Science 101',
    sessionDescription:
      'Introduction to programming and computational thinking.',
    status: 'ongoing',
  },
  {
    _id: 7,
    sessionTitle: 'Computer Science 101',
    sessionDescription:
      'Introduction to programming and computational thinking.',
    status: 'ongoing',
  },
  {
    _id: 8,
    sessionTitle: 'Computer Science 101',
    sessionDescription:
      'Introduction to programming and computational thinking.',
    status: 'ongoing',
  },
  {
    _id: 9,
    sessionTitle: 'Computer Science 101',
    sessionDescription:
      'Introduction to programming and computational thinking.',
    status: 'ongoing',
  },
  {
    _id: 10,
    sessionTitle: 'Computer Science 101',
    sessionDescription:
      'Introduction to programming and computational thinking.',
    status: 'ongoing',
  },
];

export const mockSession = {
  _id: '666aa7ad6147c28bf689ecb2',
  sessionTitle: 'Mathematics Basics',
  tutorName: 'Mahedi Hasan',
  tutorEmail: 'mahedi@gmail.com',
  sessionDescription:
    'An introductory session on algebra and geometry fundamentals.',
  registrationStartDate: '2024-06-03T08:02:00.000Z',
  registrationEndDate: '2024-07-06T08:02:00.000Z',
  classStartDate: '2024-07-08T08:02:00.000Z',
  classEndDate: '2024-08-02T08:02:00.000Z',
  sessionDuration: 4,
  registrationFee: 0,
  status: 'pending',
  createdAt: '2024-06-13T08:02:53.505Z',
  updatedAt: '2024-06-13T08:02:53.505Z',
  __v: 0,
  reviews: [
    {
      _id: '1',
      user: { name: 'John Doe' },
      rating: 5,
      comment: 'Great session! Learned a lot.',
    },
    {
      _id: '2',
      user: { name: 'Jane Smith' },
      rating: 4,
      comment: 'Very informative, but could be more interactive.',
    },
  ],
};

export const tutors = [
  {
    id: 1,
    name: 'John Doe',
    subject: 'Mathematics',
    description: 'Expert in algebra, geometry, and calculus.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    subject: 'Physics',
    description: 'Specializes in mechanics and thermodynamics.',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    subject: 'Chemistry',
    description: 'Focuses on organic and inorganic chemistry.',
  },
  {
    id: 4,
    name: 'Michael Brown',
    subject: 'History',
    description: 'Experienced in world history and historical analysis.',
  },
  {
    id: 5,
    name: 'Sarah Davis',
    subject: 'Literature',
    description: 'Loves to explore classic and contemporary literature.',
  },
  {
    id: 6,
    name: 'David Wilson',
    subject: 'Computer Science',
    description: 'Passionate about programming and software development.',
  },
];
