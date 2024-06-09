import { Link } from "react-router-dom";
import SocialLogin from "@/components/SocialLogin";
import SigninFrom from "@/components/forms/SigninFrom";

const Signin = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="shadow rounded-md border p-8 w-full max-w-md mx-auto space-y-3.5">
        <h3 className="text-center">Signin</h3>
        <SigninFrom />

        <SocialLogin />

        <div className="flex items-center gap-x-1.5">
          <p>Don't Have An Account Yet?</p>
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signin;
