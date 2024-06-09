import NoteFrom from "@/components/forms/NoteFrom";

const CreateNote = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <div className="shadow rounded-md border p-8 w-full max-w-md mx-auto space-y-3.5">
        <h4 className="text-center">Note</h4>
        <NoteFrom />
      </div>
    </main>
  );
};

export default CreateNote;
