import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getProjectById = query({
  args: {
    projectid: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const existingProject = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), args.projectid))
      .first();
    if (!existingProject) {
      throw new Error("failed");
    }
    return {
      ...existingProject,
      coverimageurl: existingProject.coverimageurl
        ? await ctx.storage.getUrl(existingProject.coverimageurl)
        : undefined,
    };
  },
});

export const listProjects = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").order("desc").collect();

    return Promise.all(
      projects.map(async (project) => ({
        ...project,
        coverimageurl: project.coverimageurl
          ? await ctx.storage.getUrl(project.coverimageurl)
          : undefined,
      }))
    );
  },
});

export const createnewproject = mutation({
  args: {
    nameofproject: v.string(),
    decriptionofproject: v.string(),
    githublink: v.string(),
    coverimageurl: v.optional(v.id("_storage")),
    challengeamitosolve: v.string(),
    xhandle: v.string(),
    discordhandle: v.string(),
    youtubelinkoftheproject: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const userid = await getAuthUserId(ctx);
    if (!userid) {
      throw new Error("unauthorized");
    }

    const newproject = await ctx.db.insert("projects", {
      id: userid,
      nameofproject: args.nameofproject,
      decriptionofproject: args.decriptionofproject,
      githublink: args.githublink,
      coverimageurl: args.coverimageurl,
      challengeamitosolve: args.challengeamitosolve,
      xhandle: args.xhandle,
      discordhandle: args.discordhandle,
      youtubelinkoftheproject: args.youtubelinkoftheproject,
      category: args.category,
    });
    return newproject;
  },
});
export const addcomment = mutation({
  args: {
    id: v.id("projects"),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const userid = await getAuthUserId(ctx);
    if (!userid) {
      throw new Error("unauthorized");
    }
    const newcomment = await ctx.db.insert("projectcomments", {
      id: args.id,
      userid,
      comment: args.comment,
    });
    return newcomment;
  },
});
export const getallcomments = query({
  args: {
    projectid: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userid = await getAuthUserId(ctx);
    if (!userid) {
      throw new Error("unauthorized");
    }
    const allcomments = await ctx.db
      .query("projectcomments")
      .filter((q) => q.eq(q.field("id"), args.projectid))
      .collect();

    return allcomments;
  },
});
