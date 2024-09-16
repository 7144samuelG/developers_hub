
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"
interface GetUserProps{
    id:Id<"users">
}
export const GetUserWhoCommeted=({id}:GetUserProps)=>{
    const cdata=useQuery(api.users.getuserbyid,{id});
    const isLoading=cdata===undefined;
    return {cdata,isLoading};
}