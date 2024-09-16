"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetUser } from "@/features/auth/api/get-user";
import { Target, WholeWord } from "lucide-react";
import { useParams } from "next/navigation";
import BioModal from "./modals/bio-moadl";
import { UseCurrentUserProfileById } from "@/features/auth/api/get-user-profile-by-id";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { UseCurrentUser } from "@/features/auth/api/verify-user";

const SideBarUserAvatar = () => {
  const { data2 } = UseCurrentUser();
  const params = useParams();
  //const{}=GetUser(params.profile)
  const id = params.profile as Id<"users">;
  const { userdata } = UseCurrentUserProfileById({ id });
  const { data } = GetUser({ id });
  return (
    <div className="w-[250px] mx-10 h-full border-r-2">
      <div className="relative">
        <Avatar className="w-[200px] h-[200px]">
          <AvatarImage src={data?.image} />
          <AvatarFallback>{data?.name}</AvatarFallback>
        </Avatar>
      </div>

      <div className="my-10">
        <p className="text-sm">@{data?.name}</p>
        {!!userdata && (
          <>
            <p className="text-muted-foreground text-sm">{userdata?.bio}</p>
            <div className="flex space-x-2 items-center my-4">
              <FaGithub className="size-3" />
              <Link
                href={`/${userdata?.githublink}`}
                className="truncate cursor-pointer overflow-hidden"
              >
                {userdata?.githublink.substring(0, 30)}
              </Link>
            </div>
            <div className="flex space-x-2 items-center my-4">
              <WholeWord className="size-3" />
              <Link
                href={`/${userdata?.portifoliolink}`}
                className="truncate cursor-pointer overflow-hidden"
              >
                {userdata?.githublink.substring(0, 30)}
              </Link>
            </div>
          </>
        )}
        {data?._id === data2?._id && (
          <>
            <BioModal />
          </>
        )}
      </div>
    </div>
  );
};

export default SideBarUserAvatar;
