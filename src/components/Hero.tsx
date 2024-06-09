import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

const Hero = () => {
  return (
    <section className="hero-banner bg-fixed min-h-[calc(100dvh-64px)] flex items-center justify-center">
      <div className="section-wrapper text-center text-white/90 space-y-5">
        <h1>Empowering Minds, Connecting Learners</h1>
        <p>
          "Empowering Minds, Connecting Learners" - Transform your educational
          journey at EduFusion, where students, tutors, and administrators come
          together to inspire and achieve academic excellence. Join us and be a
          part of a dynamic learning community.
        </p>
        <Link to="/classes" className={buttonVariants()}>
          Get Classes
        </Link>
      </div>
    </section>
  );
};

export default Hero;
