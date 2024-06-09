import TutorCard from "@/components/cards/TutorCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      <main className="flex items-center justify-center min-h-screen">
        Loading...
      </main>
    );

  if (error)
    return (
      <main className="flex items-center justify-center min-h-screen">
        Error: {error?.message}
      </main>
    );

  return (
    <main className="section-wrapper py-10">
      <TutorCard data={data} />
    </main>
  );
};

export default Tutors;
