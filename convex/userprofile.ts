import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getprojects = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const allprojects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("id"), args.id))
      .collect();

      if (!allprojects) {
        throw new Error("failed");
      }
      return Promise.all(
        allprojects.map(async (project) => ({
          ...project,
          coverimageurl: project.coverimageurl
            ? await ctx.storage.getUrl(project.coverimageurl)
            : undefined,
        }))
      );

   
  },
});

export const getAllArticles = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const allarticles = await ctx.db
      .query("articles")
      .filter((q) => q.eq(q.field("id"), args.id))
      .collect();

    return allarticles;
  },
});

//delete a project
export const deteteproject = mutation({
  args: {
    projectid: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectid);
  },
});

//delete article
export const detetearticle = mutation({
  args: {
    articleid: v.id("articles"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.articleid);
  },
});
