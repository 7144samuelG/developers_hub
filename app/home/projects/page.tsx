"use client"
import { useQuery } from "convex/react";
import { FilterProjects } from "./_componets/filter";
import IntroPage from "./_componets/intropage";
import ProjectsListing from "./_componets/projects-listing";
import Search from "./_componets/search";
import { api } from "@/convex/_generated/api";

const ProjectsPage = () => {
  const data = useQuery(api.project.listProjects);
  return (
    <div className="">
      <IntroPage />
      <div className="flex space-x-10">
      {data?.length === 0 ? (
            <></>
          ) : (
            <>
             <FilterProjects />
            </>
          )}
        
        <div className="flex-1 w-1/2">
          {data?.length === 0 ? (
            <></>
          ) : (
            <>
              <Search />
            </>
          )}
        </div>
      </div>
      <ProjectsListing />
    </div>
  );
};

export default ProjectsPage;
