import { FieldValues, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const NoteFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2.5">
        <Label className="font-medium">User Id</Label>
        <Input type="text" {...register("userId", { required: true })} />
        {errors?.userId && (
          <span className="text-red-500 text-sm">User Id is required</span>
        )}
      </div>

      <div className="space-y-2.5">
        <Label className="font-medium">Title</Label>
        <Input type="text" {...register("title", { required: true })} />
        {errors?.title && (
          <span className="text-red-500 text-sm">Title is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-2.5">
        <Label className="font-medium">Description</Label>
        <Textarea rows={5} {...register("description", { required: true })} />
        {errors?.description && (
          <span className="text-red-500 text-sm">Description is required</span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default NoteFrom;
