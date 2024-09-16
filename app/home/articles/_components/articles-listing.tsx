"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { GetUser } from "@/features/auth/api/get-user";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReturnUser from "./get-user";
import Renderer from "./renderer";

const ArticlesListing = () => {
  const router = useRouter();
  const articlesdata = useQuery(api.articles.listallarticles);
  console.log(articlesdata, "art");
  if (articlesdata?.length == 0) {
    return (
      <div className="h-full flex items-center justify-center">
        no article found
      </div>
    );
  }

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

  return (
    <div className="mt-10">
      <div className="w-[1200px] grid grid-cols-4 pb-4">
        {articlesdata?.map((val) => (
          <div
            className="w-[290px] border-b h-[200px] cursor-pointer hover:border-sky-500 rounded-md"
            key={val.id}
            onClick={() => {
              router.push(`/home/project/${val._id}`);
            }}
          >
            <div className="h-[100px]  w-full overflow-hidden p-3 ">
              <p className="text-bold truncate flex">
                <Renderer value={val.article} />
              </p>
              <p className="">...</p>
            </div>
            <div className=" my-4 w-1/2">
              <ReturnUser id={val.id} />
            </div>
            <div className="">
              <h2 className="text-sm">
                created at {convertTimestampToDate(val._creationTime)}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesListing;
