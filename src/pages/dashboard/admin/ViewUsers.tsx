import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  handleMakeStudent,
  handleMakeTutor,
  handleMakeAdmin,
} from "@/handlers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ViewUsers = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedValue] = useDebounce(searchText, 1000);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/users?searchTerm=${debouncedValue}&limit=10`
      );
      return res?.data?.data;
    },
    enabled: !!debouncedValue || searchText === "", // Enable the query if debouncedValue is not empty or searchText is empty
  });

  useEffect(() => {
    if (debouncedValue !== undefined) {
      refetch();
    }
  }, [debouncedValue, refetch]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <main className="space-y-3.5">
      <div className="flex justify-end">
        <Input
          type="text"
          placeholder="Search by Name or Email..."
          className="w-1/4"
          onChange={(e) => {
            setSearchText(e?.target?.value);
          }}
        />
      </div>

      <div className="w-full max-lg:overflow-x-scroll">
        <table className="w-full">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Profile</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item: IUser, index: number) => (
              <tr key={item?._id} className="text-sm">
                <td>{index + 1}</td>

                <td className="flex items-center gap-5">
                  <Avatar className="size-14">
                    <AvatarImage
                      src={item?.avatar}
                      alt={item?.fullName}
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start gap-1">
                    <p className="whitespace-nowrap">{item?.fullName}</p>
                  </div>
                </td>

                <td>
                  <p>{item?.email}</p>
                </td>

                <td>
                  <p className="capitalize">{item?.role}</p>
                </td>

                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="rounded-full" size="sm">
                        Toggle Role
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleMakeStudent(item, refetch)}
                      >
                        Student
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleMakeTutor(item, refetch)}
                      >
                        Tutor
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleMakeAdmin(item, refetch)}
                      >
                        Admin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ViewUsers;
