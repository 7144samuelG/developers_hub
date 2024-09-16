import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"
interface UseCurrentUserProfileByIdProps{
    id:Id<"users">;
}
export const UseCurrentUserProfileById=({id}:UseCurrentUserProfileByIdProps)=>{
    const userdata=useQuery(api.profile.getuserprofileById,{id});
    const isLoading=userdata===undefined;
    return {userdata,isLoading};
}