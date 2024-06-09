import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudySessionCard from "@/components/cards/StudySessionCard";

const StudySession = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["courses"],
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

  return (
    <main className="section-wrapper py-10">
      <StudySessionCard data={data} />
    </main>
  );
};

export default StudySession;
