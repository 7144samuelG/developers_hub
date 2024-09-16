"use client";

import { useQuery } from "convex/react";
import IntroPage from "./_components/intro-page";
import { api } from "@/convex/_generated/api";
import Search from "./_components/search";
import ArticlesListing from "./_components/articles-listing";

const ArticlesPage = () => {
  const data = useQuery(api.articles.listallarticles);
  return (
    <div className="w-full">
      <IntroPage />
      <div className="flex justify-center w-1/2">
        {data?.length === 0 ? (
          <></>
        ) : (
          <>
            <Search />
          </>
        )}
      </div>
      <ArticlesListing/>
    </div>
  );
};

export default ArticlesPage;
