const TutorCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {data?.map((item) => (
        <div key={item._id} className="shadow rounded-md border">
          <img
            className="h-[220px] w-full object-cover rounded-t-md"
            src={item?.picture}
            alt="Tutor Image"
          />

          <div className="p-5 space-y-1.5">
            <h5>{item?.name}</h5>
            <p>{item?.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TutorCard;
