import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"
interface GetProjectByCommentsProps{
    projectid:Id<"projects">;
}
export const GetProjectComments=({projectid}:GetProjectByCommentsProps)=>{
    const projectcomments=useQuery(api.project.getallcomments,{projectid});
    const isLoading=projectcomments===undefined;
    return {projectcomments,isLoading};
}