"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "@/convex/_generated/dataModel";
import { GetUser } from "@/features/auth/api/get-user";

const ReturnUser = ({ id }: { id: Id<"users"> }) => {
 //const id=id<"users">
  const { data } = GetUser({ id });
  if (!data) {
    return null;
  }
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="w-[20px] h-[20px]">
        <AvatarImage src={data?.image} />
        <AvatarFallback>{data?.name?.substring(0,1)}</AvatarFallback>
      </Avatar>
      <h1 className="text-sm text-muted-foreground">{data?.name}</h1>
    </div>
  );
};

export default ReturnUser;
