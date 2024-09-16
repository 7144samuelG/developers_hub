import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"

export const UseCurrentUserProfile=()=>{
    const userdata=useQuery(api.profile.getuserprofile);
    const isLoading=userdata===undefined;
    return {userdata,isLoading};
}