"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "@/convex/_generated/dataModel";
import { GetUser } from "@/features/auth/api/get-user";
import { Loader } from "lucide-react";

const ReturnUserProfile = ({iid}:any) => {
    const getuserid=iid as Id<"users">
    const {data,isLoading}=GetUser({id:getuserid});
    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />;
      }
      if (!data) {
        return null;
      }
      const { image, name,_id } = data;
      const avatarfallback = name!.charAt(0).toUpperCase();

      
    return ( 
        <div className="flex items-center space-x-4">
            <Avatar className="w-[20px] h-[20px]">
                <AvatarImage alt={name} src={image}/>
                <AvatarFallback>{avatarfallback}</AvatarFallback>
            </Avatar>
            <div className="">
            <p className="text-muted-foreground">{name}</p>
              
            </div>
        </div>
     );
}
 
export default ReturnUserProfile;