import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  userprofile: defineTable({
    id: v.id("users"),
    username: v.string(),
    bio: v.string(),
    portifoliolink: v.string(),
    githublink: v.string(),
    followers: v.number(),
    following: v.number(),
  })
    .index("username", ["username"])
    .index("user_id", ["id"]),
  projects: defineTable({
    id: v.id("users"),
    nameofproject: v.string(),
    decriptionofproject: v.string(),
    githublink: v.string(),
    coverimageurl: v.optional(v.id("_storage")),
    challengeamitosolve: v.string(),
    xhandle: v.string(),
    discordhandle: v.string(),
    youtubelinkoftheproject: v.string(),
    category:v.string()
  }).index("project_id",["id"]),
  projectcomments:defineTable({
    id:v.id("projects"),
    userid:v.id("users"),
    comment:v.string()
  }),
  articles:defineTable({
    id:v.id("users"),
    article:v.string(),
    image:v.optional(v.id("_storage"))
  })
});

export default schema;
