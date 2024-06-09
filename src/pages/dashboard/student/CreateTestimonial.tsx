import TestimonialFrom from "@/components/forms/TestimonialFrom";

const CreateTestimonial = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <div className="shadow rounded-md border p-8 w-full max-w-md mx-auto space-y-3.5">
        <h4 className="text-center">Testimonial</h4>
        <TestimonialFrom />
      </div>
    </main>
  );
};

export default CreateTestimonial;
