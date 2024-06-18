import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import api, { setAuthorizationHeader } from './api/config.js';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import useAxiosInterceptors from './hooks/useAxiosInterceptors';
import NotFound from './pages/404/index.jsx';
import Announcement from './pages/Announcement/Announcement.jsx';
import BookStudySession from './pages/BookStudySession/BookStudySession.jsx';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage.jsx';
import Home from './pages/Home';
import Login from './pages/SignIn/index.jsx';
import SignUp from './pages/SignUp/index.jsx';
import AllClassmates from './pages/StudentPortal/AllClassmates.jsx';
import CraeteNote from './pages/StudentPortal/CraeteNote.jsx';
import ManagePersonalNotes from './pages/StudentPortal/ManagePersonalNotes.jsx';
import StudentDashboard from './pages/StudentPortal/StudentDashboard.jsx';
import StudyMaterial from './pages/StudentPortal/StudyMaterial.jsx';
import StudySessionDetail from './pages/StudentPortal/StudySessionDetail.jsx';
import StudySessionDetails from './pages/StudySessionDetails/StudySessionDetails.jsx';
import CreateStudySession from './pages/TutorPortal/CreateStudySession.jsx';
import EditStudySession from './pages/TutorPortal/EditStudySession.jsx';
import TutorDashboard from './pages/TutorPortal/TutorDashboard.jsx';
import UploadMaterials from './pages/TutorPortal/UploadMaterials.jsx';
import ViewAllMaterials from './pages/TutorPortal/ViewAllMaterials.jsx';
import AdminDashboard from './pages/adminPortal/AdminDashboard.jsx';
import AdminAnnouncement from './pages/adminPortal/Announcement.jsx';
import ViewAllAdminMaterials from './pages/adminPortal/ViewAllAdminMaterials.jsx';
import ViewAllStudySession from './pages/adminPortal/ViewAllStudySession.jsx';
import PrivateRoute from './pages/protected/index.jsx';
import { signInSuccess } from './redux/user/userSlice.js';

const App = () => {
  const dispatch = useDispatch();
  useAxiosInterceptors();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get('/user/whoami');
        if (res.data) {
          dispatch(signInSuccess(res.data));
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      setAuthorizationHeader(token);
      getUser();
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<p>loading...</p>}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-session/:id" element={<StudySessionDetails />} />
        <Route path="/study-session/:id/book" element={<BookStudySession />} />
        <Route
          path="/study-session/:id/confirmation"
          element={<ConfirmationPage />}
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/announcement" element={<Announcement />} />
        {/* Authenticated */}
        <Route path="student" element={<PrivateRoute />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="create-note" element={<CraeteNote />} />
          <Route path="personal-notes" element={<ManagePersonalNotes />} />
          <Route path="study-material" element={<StudyMaterial />} />
          <Route path="show-all-classmates" element={<AllClassmates />} />
          <Route path="study-session">
            <Route path=":id" element={<StudySessionDetail />} />
          </Route>
        </Route>
        <Route path="tutor" element={<PrivateRoute />}>
          <Route path="dashboard" element={<TutorDashboard />} />
          <Route path="create-study-session" element={<CreateStudySession />} />
          <Route path="upload-material" element={<UploadMaterials />} />
          <Route path="view-all-materials" element={<ViewAllMaterials />} />
          <Route path="study-session">
            <Route path=":id" element={<EditStudySession />} />
          </Route>
        </Route>
        <Route path="admin" element={<PrivateRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route
            path="view-all-study-session"
            element={<ViewAllStudySession />}
          />
          <Route
            path="view-all-materials"
            element={<ViewAllAdminMaterials />}
          />
          <Route path="announcement" element={<AdminAnnouncement />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default App;
