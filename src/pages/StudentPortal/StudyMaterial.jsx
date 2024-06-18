import CommonSidebar from '../../components/common/CommonSidebar';
const CreateNote = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Render the common sidebar */}
      <CommonSidebar title="Student Portal" portal="student" />

      {/* Main content */}
      <section className="flex-1 bg-gray-200 pb-16 h-screen overflow-hidden">
        <div className="pt-6 pl-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Study Material
          </h2>
        </div>
        <div
          className="overflow-y-auto overflow-auto overflow-x-hidden scroll-0"
          style={{ height: 'calc(100% - 3rem)' }}
        >
          <div className="row p-10 overflow-hidden">Study Material</div>
        </div>
      </section>
    </div>
  );
};

export default CreateNote;
