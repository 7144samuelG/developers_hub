import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export const UseCurrentUser=()=>{
    const data2=useQuery(api.users.current);
    const isLoading=data2===undefined;
    return {data2,isLoading};
}