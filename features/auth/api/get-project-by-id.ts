import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"
interface GetProjectByIdProps{
    projectid:Id<"projects">;
}
export const GetProjectById=({projectid}:GetProjectByIdProps)=>{
    const projectdata=useQuery(api.project.getProjectById,{projectid});
    const isLoading=projectdata===undefined;
    return {projectdata,isLoading};
}