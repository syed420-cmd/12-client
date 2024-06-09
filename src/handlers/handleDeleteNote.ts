import { IUser } from "@/types";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

export const handleDeleteNote = async (user: IUser, refetch: () => void) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Make ${user?.fullName} an Admin?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Make Admin",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result?.isConfirmed) {
      try {
        await axios.patch(
          `http://localhost:5000/api/v1/users/update-role/${user?._id}`,
          {
            role: "admin",
          }
        );
        refetch();
        toast.success(`${user?.fullName} is now an Admin!`);
      } catch (error) {
        console.error("Error updating user role:", error);
        toast.error("Failed to update role. Try again.");
      }
    }
  });
};
