import { z } from "zod";
import { UrlObject } from "url";
import { icons } from "./nav-links";

export interface CustomLink {
  name: string;
  href: string | UrlObject;
  icon: string;
}

export const customLinkSchema = z.object({
  name: z.string(),
  href: z.union([z.string(), z.object({})]),
  icon: z.any(),
});
