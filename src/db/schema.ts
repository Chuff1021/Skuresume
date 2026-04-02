import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  jsonb,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { ResumeData } from "@/types/resume";

// === RESUMES ===

export const resumes = pgTable(
  "resumes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    tags: text("tags").array().default([]),
    isPublic: boolean("is_public").default(false),
    isLocked: boolean("is_locked").default(false),
    password: text("password"),
    data: jsonb("data").$type<ResumeData>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_resumes_slug").on(table.slug),
  ]
);

// === RESUME STATISTICS ===

export const resumeStatistics = pgTable("resume_statistics", {
  id: uuid("id").primaryKey().defaultRandom(),
  resumeId: uuid("resume_id")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" })
    .unique(),
  views: integer("views").default(0),
  downloads: integer("downloads").default(0),
  lastViewedAt: timestamp("last_viewed_at", { withTimezone: true }),
  lastDownloadedAt: timestamp("last_downloaded_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// === TYPES ===

export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;
export type ResumeStatistic = typeof resumeStatistics.$inferSelect;
