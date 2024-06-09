import { ReactNode } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  SelectLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { useAuth } from "@/providers/authProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupFrom = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data: FieldValues) => {
    try {
      await createUser(data?.email, data?.password);
      await updateUserProfile(data?.fullName, data?.avatar);

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
    <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2.5">
        <Label className="font-medium">Full Name</Label>
        <Input type="text" {...register("fullName", { required: true })} />
        {errors?.fullName && (
          <span className="text-red-500 text-sm">Name is required</span>
        )}
      </div>

      <div className="space-y-2.5">
        <Label className="font-medium">Email</Label>
        <Input type="email" {...register("email", { required: true })} />
        {errors?.email && (
          <span className="text-red-500 text-sm">Email is required</span>
        )}
      </div>

      <div className="space-y-2.5">
        <Label className="font-medium">Join As</Label>
        <Controller
          name="role"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field?.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="tutor">Tutor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.role && (
          <span className="text-red-500 text-sm">Please select a Role</span>
        )}
      </div>

      <div className="space-y-2.5">
        <Label className="font-medium">Image URL</Label>
        <Input type="url" {...register("avatar", { required: true })} />
        {errors?.avatar && (
          <span className="text-red-500 text-sm">Image URL is required</span>
        )}
      </div>

      <div className="space-y-2.5">
        <Label className="font-medium">Password</Label>
        <Input
          type="password"
          {...register("password", {
            required: "Password is required",
            validate: {
              minLength: (value) =>
                value?.length >= 8 ||
                "Password must be at least 6 characters long!",
              capitalLetter: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain at least one capital letter!",
              specialCharacter: (value) =>
                /[!@#$%^&*]/.test(value) ||
                "Password must contain at least one special character!",
            },
          })}
        />
        {errors?.password && (
          <span className="text-red-500 text-sm">
            {errors?.password?.message as ReactNode}
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        <Label className="font-medium">Confirm Password</Label>
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === password || "Passwords do not match!",
          })}
        />
        {errors?.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors?.confirmPassword?.message as ReactNode}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Signup
      </Button>
    </form>
  );
};

export default SignupFrom;
