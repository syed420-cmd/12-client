import { Controller, FieldValues, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  SelectLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";

const CourseForm = () => {
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
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-start justify-between gap-10">
        <div className="w-full space-y-3.5">
          <div className="space-y-2.5">
            <Label className="font-medium">User Id</Label>
            <Input type="text" {...register("userId", { required: true })} />
            {errors?.userId && (
              <span className="text-red-500 text-sm">User ID is required</span>
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
            <Textarea
              rows={5}
              {...register("description", { required: true })}
            />
            {errors?.description && (
              <span className="text-red-500 text-sm">
                Description is required
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Banner Image URL</Label>
            <Input
              type="text"
              {...register("bannerImages", {
                required: true,
              })}
            />
            {errors?.bannerImages && (
              <span className="text-red-500 text-sm">
                Banner Image URL is required
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Category</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field?.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="artsHumanities">
                        Arts & Humanities
                      </SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="healthMedicine">
                        Health & Medicine
                      </SelectItem>
                      <SelectItem value="socialSciences">
                        Social Sciences
                      </SelectItem>
                      <SelectItem value="languageLearning">
                        Language Learning
                      </SelectItem>
                      <SelectItem value="personalDevelopment">
                        Personal Development
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.category && (
              <span className="text-red-500 text-sm">
                Please select a category
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Level</Label>
            <Controller
              name="level"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field?.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Level</SelectLabel>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.level && (
              <span className="text-red-500 text-sm">
                Please select a level
              </span>
            )}
          </div>
        </div>

        <div className="w-full space-y-3.5">
          <div className="space-y-2.5">
            <Label className="font-medium">Registration Start Date</Label>
            <Input
              type="date"
              {...register("registrationStartDate", {
                required: true,
              })}
            />
            {errors?.registrationStartDate && (
              <span className="text-red-500 text-sm">
                Registration Start Date is required
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Registration End Date</Label>
            <Input
              type="date"
              {...register("registrationEndDate", {
                required: true,
              })}
            />
            {errors?.registrationEndDate && (
              <span className="text-red-500 text-sm">
                Registration End Date is required
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Course Start Date</Label>
            <Input
              type="date"
              {...register("courseStartDate", {
                required: true,
              })}
            />
            {errors?.courseStartDate && (
              <span className="text-red-500 text-sm">
                Course Start Date is required
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Course End Date</Label>
            <Input
              type="date"
              {...register("courseEndDate", {
                required: true,
              })}
            />
            {errors?.courseEndDate && (
              <span className="text-red-500 text-sm">
                Course End Date is required
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Course Duration</Label>
            <Input
              type="text"
              {...register("courseDuration", {
                required: "Course Duration is required",
              })}
            />
            {errors?.courseDuration && (
              <span className="text-red-500 text-sm">
                Course Duration is required
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="font-medium">Registration Fee</Label>
            <Input
              type="number"
              defaultValue={0}
              readOnly
              {...register("registrationFee", {
                required: "Registration Fee is required",
              })}
            />
            {errors?.registrationFee && (
              <span className="text-red-500 text-sm">
                Registration Fee is required
              </span>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default CourseForm;
