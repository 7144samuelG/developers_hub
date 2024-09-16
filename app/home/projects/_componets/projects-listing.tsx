"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProjectsListing = () => {
  const router = useRouter();
  const data = useQuery(api.project.listProjects);
  if (data?.length == 0) {
    return (
      <div className="h-full flex items-center justify-center">
       <p> no project found</p>
        <Button onClick={()=>router.push("/home/create-project")}>Create a project</Button>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-3 pb-4">
        {data?.map((val) => (
          <div
            className="w-[400px] border h-[400px] cursor-pointer hover:border-sky-500 rounded-md"
            key={val.id}
            onClick={() => {
              router.push(`/home/project/${val._id}`);
            }}
          >
            <div className="w-full h-[200px] border">
                <Image src={val.coverimageurl || (typeof val.coverimageurl === 'string' ? val.coverimageurl : '')} alt="" width={200} height={200} className="w-full h-full"/>
            </div>
            <div className="">
              <div className="flex justify-between items-center">
                <h1 className="text-muted-foreground p-2">
                  <span className="text-red-400">by</span> {val.nameofproject}
                </h1>
                <h2 className="text-sky-400 text-sm pr-4">{val.category}</h2>
              </div>
              <p className="p-2">
                {val.challengeamitosolve.substring(0, 100)}....
              </p>
              <div className="flex justify-end my-3 mr-4">
                <Button variant="outline">View Project</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsListing;
