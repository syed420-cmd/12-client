import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudySessionCard from "./cards/StudySessionCard";
import SectionTitle from "./SectionTitle";

const StudySession = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["classes"],
    queryFn: () =>
      axios
        .get("https://dressx-server.vercel.app/approve-classes")
        .then((res) => res?.data),
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {error?.message}
      </div>
    );

  // slice the data to get the first 6 items
  const slicedData = data?.slice(0, 6) || [];

  return (
    <section className="section-wrapper">
      <SectionTitle
        title="Explore Our Courses"
        description="Discover courses to boost your skills. Each session offers actionable insights and an opportunity to purchase."
      />

      <StudySessionCard data={slicedData} />
    </section>
  );
};

export default StudySession;
