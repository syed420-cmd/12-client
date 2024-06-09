import { IUser } from "@/types";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

export const handleMakeTutor = async (user: IUser, refetch: () => void) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Make ${user?.fullName} an Tutor?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Make Tutor",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result?.isConfirmed) {
      try {
        await axios.patch(
          `http://localhost:5000/api/v1/users/update-role/${user?._id}`,
          {
            role: "tutor",
          }
        );
        refetch();
        toast.success(`${user?.fullName} is now an Tutor!`);
      } catch (error) {
        console.error("Error updating user role:", error);
        toast.error("Failed to update role. Try again.");
      }
    }
  });
};
