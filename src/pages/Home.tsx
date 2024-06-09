import Hero from "@/components/Hero";
import StudySession from "@/components/StudySession";
import Tutors from "@/components/Tutors";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  return (
    <main className="space-y-10 lg:space-y-20 mb-10 lg:mb-20">
      <Hero />
      <StudySession />
      <Tutors />
      <Testimonials />
    </main>
  );
};

export default Home;
