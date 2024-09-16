"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { GetProjectById } from "@/features/auth/api/get-project-by-id";
import { GetUser } from "@/features/auth/api/get-user";
import { X } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaDiscord, FaGithub, FaTelegram, FaYoutube } from "react-icons/fa";
import { AddComment } from "../_components/comment-modal";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReturnUserProfile from "../_components/get-user-who-commented";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const ProjectId = () => {
  const router = useRouter();
  const params = useParams();
  const projectid = params.projectid as Id<"projects">;
  const { projectdata } = GetProjectById({ projectid });
  const { data } = GetUser({ id: projectdata?.id as Id<"users"> });
  const pcomments = useQuery(api.project.getallcomments, { projectid });

  function convertTimestampToDate(timestamp?: number): string {
    if (typeof timestamp !== "number" || isNaN(timestamp)) {
      return "Invalid timestamp";
    }

    const msPrecision = Math.floor(timestamp);
    const date = new Date(msPrecision);

    const now = new Date().getTime();
    const diffMs = now - msPrecision;

    if (diffMs < 86400000) {
      // Less than 24 hours
      const diffHours = Math.floor(diffMs / 3600000);
      const diffMinutes = Math.floor((diffMs % 3600000) / 60000);

      if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
      } else {
        return "Just now";
      }
    } else if (diffMs < 2592000000) {
      // Between 24 hours and 30 days
      const diffDays = Math.floor(diffMs / 86400000);
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffMs < 31536000000) {
      // Between 30 days and 365 days
      const diffMonths = Math.floor(diffMs / 2592000000);
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Create a new Date object
  //  const date = new Date(msPrecision);
  return (
    <div className="w-full h-full mt-10 pb-10">
      <div className="flex space-x-10 ">
        <div className="flex-1 border-r pr-3 ">
          <div className="border h-[400px]">
            <Image
              src={
                projectdata?.coverimageurl ||
                (typeof projectdata?.coverimageurl === "string"
                  ? projectdata?.coverimageurl
                  : "")
              }
              alt=""
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
          <div className="mt-5">
            <div className="flex justify-between">
              <div className="">
                <h1 className="text-4xl font-bold">
                  {projectdata?.nameofproject}
                </h1>
                <h2 className="text-orange-400"> {projectdata?.category}</h2>
              </div>
              <div className="">
                <div className="space-x-2 flex items-center">
                  <Avatar>
                    <AvatarImage src={data?.image} alt="" />
                    <AvatarFallback>{data?.name}</AvatarFallback>
                  </Avatar>
                  <p className="text-bold text-xl">
                    created_by <span>{data?.name}</span>
                  </p>
                  <Button>Follow</Button>
                </div>
                <p className="">
                  created at{" "}
                  {convertTimestampToDate(projectdata?._creationTime)}
                </p>
              </div>
            </div>

            <div className="">
              {" "}
              <h3 className="text-muted-foreground underline">
                project description
              </h3>
              <p className="text-sm leading-5">
                {projectdata?.decriptionofproject}
              </p>
              <h3 className="text-muted-foreground underline mt-5 pb-3">
                vison of the project
              </h3>
              <p className="text-sm leading-5">
                {projectdata?.challengeamitosolve}
              </p>
              <div className="my-4">
                <h1 className="text-bold text-2xl underline">
                  Developer contacts
                </h1>

                <div className="pl-4 flex space-x-4 items-center text-muted-foreground cursor-pointer">
                  <FaDiscord />
                  <p
                    onClick={() => {
                      router.push(`${projectdata?.githublink}`);
                    }}
                  >
                    {projectdata?.githublink}
                  </p>
                </div>
                {/* <div className="pl-4 flex space-x-4 items-center text-muted-foreground cursor-pointer">
                  <FaTelegram />
                  <p
                    onClick={() => {
                      router.push(`${projectdata?.githublink}`);
                    }}
                  >
                    {projectdata?.telegramhandle}
                  </p>
                </div> */}
                <div className="pl-4 flex space-x-4 items-center text-muted-foreground cursor-pointer">
                  <X />
                  <p
                    onClick={() => {
                      router.push(`${projectdata?.githublink}`);
                    }}
                  >
                    {projectdata?.xhandle}
                  </p>
                </div>
                <div className="pl-4 flex space-x-4 items-center text-muted-foreground cursor-pointer">
                  <FaYoutube />
                  <p
                    onClick={() => {
                      router.push(`${projectdata?.githublink}`);
                    }}
                  >
                    {projectdata?.youtubelinkoftheproject}
                  </p>
                </div>
                <div className="flex space-x-4 items-center pl-4 text-muted-foreground cursor-pointer">
                  <FaGithub />
                  <p
                    onClick={() => {
                      router.push(`${projectdata?.githublink}`);
                    }}
                  >
                    {projectdata?.githublink}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="  h-full w-[300px] comm">
          <div className="flex justify-between items-center">
            <h1 className="text-bold tetx-xl ">comment section</h1>
            <AddComment />
          </div>
          <div className="">
            {pcomments?.length == 0 ? (
              <div className="h-full flex items-center justify-center">
                no comment
              </div>
            ) : (
              <ScrollArea className="h-[80vh] w-full rounded-md ">
                <div className="h-full flex flex-col items-start  w-full my-2 justify-start">
                  {pcomments?.map((val) => (
                    <div className="border-b my-3 p-3" key={val._id}>
                      <div className="flex flex-col">
                        <p className="mb-1">
                          <ReturnUserProfile iid={val.userid} />
                        </p>
                        <p className="text-sm">{val.comment}</p>
                        <p className="text-sm">
                          {convertTimestampToDate(val._creationTime)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectId;
