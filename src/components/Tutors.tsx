import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionTitle from "./SectionTitle";
import TutorCard from "./cards/TutorCard";

const Tutors = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tutors"],
    queryFn: () =>
      axios
        .get("https://dressx-server.vercel.app/instructors")
        .then((res) => res.data),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error?.message}
      </div>
    );

  // slice the data to get the first 6 items
  const slicedData = data?.slice(0, 6) || [];

  return (
    <section className="section-wrapper">
      <SectionTitle
        title="Meet Our Expert Tutors"
        description="Get to know our experienced tutors who will support you on your learning journey."
      />

      <TutorCard data={slicedData} />
    </section>
  );
};

export default Tutors;
