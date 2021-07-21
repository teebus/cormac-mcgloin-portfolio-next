import { object } from "prop-types"

export default {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "pageImage",
      title: "Page image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: "gallery",
    //   title: "Gallery",
    //   type: "array",
    //   of: [{ type: "galleryItem" }],
    // },
    {
      name: "galleryItems",
      title: "Gallery Items",
      type: "array",
      of: [{ type: "galleryItem" }],
    },
    // {
    //   name: "pageContent",
    //   title: "Page content",
    //   type: "array",
    //   of: [{ type: "block" }, { type: "image" }],
    // },
  ],
}
