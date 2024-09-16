"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"
import { toast } from "sonner";

const Projects = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.profile as Id<"users">;
  const getalluserproject = useQuery(api.userprofile.getprojects, { id });
  const deleteproject = useMutation(api.userprofile.deteteproject);
  if (!getalluserproject) {
    return (
      <div className="h-full mt-[100px] flex justify-center items-center">
        you havent created any project
      </div>
    );
  }

  const handledeleteproject = async (projectid: Id<"projects">) => {

    try{
    await deleteproject({
      projectid,
    });
    toast.success("project deleted")
}catch(error){}
  };
  return (
    <div className="grid gap-3 grid-cols-3">
      {getalluserproject.map((val) => (
        <div
          className="mt-2 w-[300px] border bg-white rounded-md p-2"
          key={val._id}
        >
          <div className="">
            <Image
              src={
                val.coverimageurl ||
                (typeof val.coverimageurl === "string" ? val.coverimageurl : "")
              }
              alt=""
              width={200}
              height={200}
              className="w-full"
            />
          </div>
          <div className="">
            <p className="">{val.nameofproject}</p>
          </div>
          <div className="flex justify-between items-center">
            <Button
              variant="link"
              onClick={() => router.push(`/home/project/${val._id}`)}
            >
              View
            </Button>
            <Button
              className="size-"
              onClick={() => handledeleteproject(val._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
