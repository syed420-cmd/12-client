import { Controller, FieldValues, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TestimonialFrom = () => {
  const {
    register,
    control,
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
        <Label className="font-medium">Rating</Label>
        <Controller
          name="rating"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field?.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rating</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.rating && (
          <span className="text-red-500 text-sm">Please select a rating</span>
        )}
      </div>

      <div className="flex flex-col space-y-2.5">
        <Label className="font-medium">Message</Label>
        <Textarea rows={5} {...register("review", { required: true })} />
        {errors?.review && (
          <span className="text-red-500 text-sm">Please enter your review</span>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default TestimonialFrom;
