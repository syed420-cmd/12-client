import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin";
import SignupFrom from "@/components/forms/SignupFrom";

const Signup = () => {
  return (
    <main className="flex justify-center items-center my-10 xl:my-20">
      <div className="shadow rounded-md border p-8 w-full max-w-md mx-auto space-y-3.5">
        <h3 className="text-center">Signup</h3>
        <SignupFrom />

        <SocialLogin />

        <div className="flex items-center gap-x-1.5">
          <p>Already Have An Account?</p>
          <Link to="/signin" className="text-blue-500">
            Signin
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
