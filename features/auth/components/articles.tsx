import Renderer from "@/app/home/articles/_components/renderer";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const Articles = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.profile as Id<"users">;
    const getallallarticle = useQuery(api.userprofile.getAllArticles, { id });
    const deletearticle = useMutation(api.userprofile.detetearticle);
    if (!getallallarticle) {
      return (
        <div className="h-full mt-[100px] flex justify-center items-center">
          you havent created any article
        </div>
      );
    }
  
    const handledeletearticle = async (articleid: Id<"articles">) => {

        try{
        await deletearticle({
            articleid,
        });
        toast.success("project deleted")
    }catch(error){}
      };
      return (
        <div className="grid gap-3 grid-cols-3">
          {getallallarticle.map((val) => (
            <div
              className="mt-2 w-[300px] border bg-white rounded-md p-2 flex flex-col justify-between"
              key={val._id}
            >
              
              <div className="">
                <p className=""><Renderer value={val.article}/></p>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="link"
                  onClick={() => router.push(`/home/project/${val._id}`)}
                >
                  View
                </Button>
                <Button
                  className="size-"
                  onClick={() => handledeletearticle(val._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      );
    };
    
 
export default Articles;