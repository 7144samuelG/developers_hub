import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"
interface GetUserProps{
    id:Id<"users">
}
export const GetUser=({id}:GetUserProps)=>{
    const data=useQuery(api.users.getuserbyid,{id});
    const isLoading=data===undefined;
    return {data,isLoading};
}