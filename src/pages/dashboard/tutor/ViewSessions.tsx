import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import useToast from "../../../hooks/useToast";
import { useAuth } from "@/providers/authProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ViewSessions = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: myclasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: () => fetchMyClasses(user?.email),
  });

  const [classes, setClasses] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!isOpen) {
      setClasses(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (classes) {
      setValue("className", classes.className);
      setValue("availableSeats", classes.availableSeats);
      setValue("price", classes.price);
      setValue("imageUrl", classes.imageUrl);
    }
  }, [classes, setValue]);

  const fetchMyClasses = async (email) => {
    try {
      const response = await axios.get(`/myclasses?email=${email}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = { ...data };

      axiosSecure
        .put(`/classes/update/${classes._id}`, updatedData, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          setIsOpen(false);
          refetch();
          showToast("Class updated successfully!");
        })
        .catch((error) => {
          console.log(error);
          showToast("Failed to update class!");
        });
    } catch (error) {
      console.log(error);
      showToast("Failed to update class!");
    }
  };

  return (
    <main className="w-full p-20">
      <h1 className="text-center pb-5">
        My Total Classes: {myclasses?.length}
      </h1>
      <div className="grid grid-cols-2 gap-10">
        {myclasses.map((item, index) => (
          <div className="shadow-xl" key={index}>
            <figure>
              <img
                className="h-[90%] w-full"
                src={item?.imageUrl}
                alt="Classes"
              />
            </figure>
            <div className="px-5 space-y-2 py-5">
              <h2>{item?.className}</h2>
              <p>Seats: {item?.availableSeats}</p>
              <p>Price: ${item?.price}</p>
              <p className="capitalize">Status: {item?.status}</p>
              {item?.enrollStudent > 0 && (
                <p>Enroll Student: {item?.enrollStudent}</p>
              )}
              {item?.feedback !== null && <p>Feedback: {item?.feedback}</p>}
              <button
                onClick={() => handleUpdate(item)}
                className="primary-button"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      <main>
        <div
          onClick={handleClose}
          className={clsx(
            "fixed w-full h-full top-0 right-0 bottom-0 left-0 z-[1000] bg-white/20 backdrop-blur-lg",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        ></div>

        <div
          className={clsx(
            "fixed w-full md:w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-white shadow-xl z-[1001]",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <div className="flex justify-end">
            <button onClick={handleClose}>❌</button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Class Name</label>
              <input
                className="w-full border-b border-[#212121] py-2 px-3 focus:outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#bg-gradient-to-r from-transparent via-lime-700 to-cyan-600]"
                {...register("className", { required: true })}
              />
              {errors.className && (
                <span className="text-red-500 text-sm">
                  Class Name is required
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Available Seats</label>
              <input
                className="w-full border-b border-[#212121] py-2 px-3 focus:outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#bg-gradient-to-r from-transparent via-lime-700 to-cyan-600]"
                type="number"
                {...register("availableSeats", { required: true })}
              />
              {errors.availableSeats && (
                <span className="text-red-500 text-sm">
                  Enter Available Seats
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Price</label>
              <input
                className="w-full border-b border-[#212121] py-2 px-3 focus:outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#bg-gradient-to-r from-transparent via-lime-700 to-cyan-600]"
                type="number"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">Price is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Image Url</label>
              <input
                className="w-full border-b border-[#212121] py-2 px-3 focus:outline-none focus:border-[#2ECC71] focus:ring-2 focus:ring-[#bg-gradient-to-r from-transparent via-lime-700 to-cyan-600]"
                {...register("imageUrl", { required: true })}
              />
              {errors.imageUrl && (
                <span className="text-red-500 text-sm">
                  ImageUrl is required
                </span>
              )}
            </div>

            <div className="text-right">
              <input className="primary-button" type="submit" value="Update" />
            </div>
          </form>
        </div>
      </main>
    </main>
  );
};

export default ViewSessions;
