import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const getuserprofileById = query({
  args: {  
    id:v.id("users")
  },
  handler: async (ctx,args) => {
 
    const existingProfile = await ctx.db
      .query("userprofile")
      .filter((q) => q.eq(q.field("id"),args.id))
      .first();
    return existingProfile;
  },
});

export const getuserprofile = query({
  args: {  
  },
  handler: async (ctx) => {
  const userid=await getAuthUserId(ctx);
    const existingProfile = await ctx.db
      .query("userprofile")
      .filter((q) => q.eq(q.field("id"),userid))
      .first();
    if (existingProfile) {
      //   // Profile already exists, return the existing ID
      return existingProfile;
    }
    return null;
  },
});
export const createuserprofile = mutation({
  args: {
    username: v.string(),
    bio: v.string(),
    portifoliolink: v.string(),
    githublink: v.string(),
  },
  handler: async (ctx, args) => {
    const userid = await getAuthUserId(ctx);
    if (!userid) {
      throw new Error("unauthorized");
    }

    // Check if a user profile already exists
    const existingProfile = await ctx.db
      .query("userprofile")
      .filter((q) => q.eq(q.field("id"), userid))
      .first();
    if (existingProfile) {
      //   // Profile already exists, return the existing ID
      return existingProfile;
    }
    const userprofileid = await ctx.db.insert("userprofile", {
      id: userid,
      username: args.username,
      bio: args.bio,
      portifoliolink: args.portifoliolink,
      githublink: args.githublink,
      followers: 0,
      following: 0,
    });
    return userprofileid;
  },
});

export const updateuserprofile = mutation({
  args: { 
    id:v.id("userprofile"),
    username: v.string(),
    bio: v.string(),
    portifoliolink: v.string(),
    githublink: v.string(),
  },
  handler: async (ctx, args) => {
    const userid = await getAuthUserId(ctx);
    if (!userid) {
      throw new Error("unauthorized");
    }
   
   
    await ctx.db.patch(args.id,{
      id: userid,
      username: args.username,
      bio: args.bio,
      portifoliolink: args.portifoliolink,
      githublink: args.githublink,
     
    });
   
  },
});
