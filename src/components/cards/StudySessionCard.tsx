import { BsFillPeopleFill } from "react-icons/bs";
import { Button } from "../ui/button";
import useAdmin from "@/hooks/useAdmin";
import useInstructor from "@/hooks/useInstructor";

const StudySessionCard = ({ data }) => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10">
      {data?.map((item) => (
        <div key={item?._id} className="shadow rounded-md border">
          <img
            className="h-[250px] w-full rounded-t-md"
            src={item?.imageUrl}
            alt={item?.className}
          />

          <div className="p-5 space-y-2.5">
            <h5>{item?.className}</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              similique quam dolor praesentium consequatur consequuntur.
              Cupiditate doloribus labore totam excepturi.
            </p>

            <div className="flex items-center justify-between gap-5">
              <h6 className="font-semibold">${item?.price}</h6>

              <p className="flex items-center gap-x-1.5">
                <BsFillPeopleFill className="size-5" />
                {item?.availableSeats}
              </p>
            </div>

            {!(isAdmin || isInstructor) && (
              <div className="flex justify-between items-center gap-5">
                <Button>Ongoing</Button>

                <Button>Read More</Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudySessionCard;
