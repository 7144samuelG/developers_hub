import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listallarticles = query({
    handler: async (ctx) => {
      const articles = await ctx.db.query("articles").order("desc").collect();
  
      return Promise.all(
        articles.map(async (article) => ({
          ...article,
          image: article.image
            ? await ctx.storage.getUrl(article.image)
            : undefined,
        }))
      );
    },
  });

export const createarticle=mutation({
    args:{
        article:v.string(),
        image:v.optional(v.id("_storage"))
    },
    handler:async(ctx,args)=>{
        const userid=await getAuthUserId(ctx);
        if(!userid){
            throw new Error("unauthorized");
        }

        const newArticle=await ctx.db.insert("articles",{
            id:userid,
            article:args.article,
            image:args.image
        })

        return newArticle
    }
})