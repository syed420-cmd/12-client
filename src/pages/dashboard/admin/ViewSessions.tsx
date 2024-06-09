import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import useToast from "../../../hooks/useToast";
import { AiFillCloseSquare } from "react-icons/ai";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ViewSessions = () => {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [axiosSecure] = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: classes = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios.get("/classes");
      return res.data;
    },
  });

  console.log(classes);

  const approveClass = useMutation((itemId) =>
    axiosSecure.put(`/classes/approve/${itemId}`)
  );

  const denyClass = useMutation((itemId) =>
    axiosSecure.put(`/classes/deny/${itemId}`)
  );

  const submitFeedback = useMutation((data) =>
    axiosSecure.put(`/classes/feedback/${selectedItem._id}`, {
      feedback: data.feedback,
    })
  );

  const handleMakeApprove = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do You Want To Approve ${item.className}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        approveClass
          .mutateAsync(item._id)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.className} Approved Successfully!`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          })
          .catch((error) => {
            console.error("Failed to approve class:", error);
            showToast("Failed to approve class", "error");
          });
      }
    });
  };

  const handleMakeDeny = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do You Want To Deny ${item.className}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deny!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        denyClass
          .mutateAsync(item._id)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.className} Denied Successfully!`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          })
          .catch((error) => {
            console.error("Failed to deny class:", error);
            showToast("Failed to deny class", "error");
          });
      }
    });
  };

  const handleSelectChange = (event, itemId) => {
    const selectedOption = event.target.value;
    if (selectedOption === "Approve") {
      const item = classes.find((classItem) => classItem._id === itemId);
      if (item.status === "approved") return;
      handleMakeApprove(item);
    } else if (selectedOption === "Deny") {
      const item = classes.find((classItem) => classItem._id === itemId);
      if (item.status === "denied") return;
      handleMakeDeny(item);
    } else if (selectedOption === "Feedback") {
      const item = classes.find((classItem) => classItem._id === itemId);
      setSelectedItem(item);
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await submitFeedback
        .mutateAsync(data)
        .then(() => {
          showToast("Feedback Added Successfully!", "success");
          reset();
          handleClose();
        })
        .catch((error) => {
          console.error("Failed to submit feedback:", error);
          showToast("Failed to submit feedback", "error");
        });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      showToast("Failed to submit feedback", "error");
    }
  };

  if (isLoading) return <span className="loading loading-dots loading-md" />;
  if (error) return <span className="loading loading-dots loading-md" />;

  return (
    <main className="w-full py-20">
      <h1 className="text-center pb-20">Available Classes: {classes.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.imageUrl} alt="Classes Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.className}</td>
                <td>{item.instructorName}</td>
                <td>{item.instructorEmail}</td>
                <td>{item.availableSeats}</td>
                <td>${item.price}</td>
                <td>
                  <select
                    className="w-full py-2 focus:outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#bg-gradient-to-r from-transparent via-lime-700 to-cyan-600]"
                    onChange={(event) => handleSelectChange(event, item._id)}
                  >
                    <option>Select</option>
                    <option
                      disabled={
                        item.status === "approved" || item.status === "denied"
                      }
                    >
                      Approve
                    </option>
                    <option
                      disabled={
                        item.status === "approved" || item.status === "denied"
                      }
                    >
                      Deny
                    </option>
                    <option>Feedback</option>
                  </select>
                </td>
                <td className="capitalize">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <>
          <div
            onClick={handleClose}
            className={clsx(
              "fixed w-full h-full top-0 right-0 bottom-0 left-0 z-[1000] bg-white/20 backdrop-blur-lg",
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )}
          />

          <div
            className={clsx(
              "fixed w-full md:w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-white shadow-xl z-[1001]",
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )}
          >
            <div className="flex justify-end">
              <button onClick={handleClose}>
                <AiFillCloseSquare />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-[70%] mx-auto">
              <div className="mb-4">
                <label className="block mb-1 font-medium">Feedback</label>
                <textarea
                  rows="4"
                  className="w-full border-b border-[#212121] py-2 px-3 focus:outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#bg-gradient-to-r from-transparent via-lime-700 to-cyan-600]"
                  {...register("feedback", { required: true })}
                />
                {errors.feedback && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <input
                className="primary-button w-full"
                type="submit"
                value="Feedback"
              />
            </form>
          </div>
        </>
      )}
    </main>
  );
};

export default ViewSessions;
