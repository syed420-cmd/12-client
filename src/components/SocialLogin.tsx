import { useAuth } from "@/providers/authProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleSignin = async () => {
    try {
      const res = await googleSignIn();
      const singedInUser = res?.user;
      console.log(singedInUser);

      navigate(from, { replace: true });
      toast.success("User Signed In Successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message);
        console.error(err);
      } else {
        toast.error("An unknown error occurred");
        console.error("An unknown error occurred", err);
      }
    }
  };

  const handleGithubSignin = async () => {
    try {
      const res = await githubSignIn();
      const singedInUser = res?.user;
      console.log(singedInUser);

      navigate(from, { replace: true });
      toast.success("User Signed In Successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message);
        console.error(err);
      } else {
        toast.error("An unknown error occurred");
        console.error("An unknown error occurred", err);
      }
    }
  };

  return (
    <div className="pt-1 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={handleGoogleSignin}
          className="flex gap-x-1.5 items-center justify-center"
        >
          <FcGoogle className="size-6" />
          <p className="font-semibold">Google</p>
        </button>

        <button
          onClick={handleGithubSignin}
          className="flex gap-x-1.5 items-center justify-center"
        >
          <FaGithub className="size-6" />
          <p className="font-semibold">Github</p>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
