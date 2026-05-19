import { config, collection, fields } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: { owner: "GozyLeonardo", name: "Personal-Portfolio" },
        }
      : { kind: "local" },
  ui: { brand: { name: "Lawrence — Writing" } },
  collections: {
    series: collection({
      label: "Series",
      slugField: "title",
      path: "content/series/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/series",
          publicPath: "/images/series",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Active", value: "active" },
            { label: "Complete", value: "complete" },
          ],
          defaultValue: "active",
        }),
      },
    }),
    writing: collection({
      label: "Writing",
      slugField: "title",
      path: "content/writing/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedAt: fields.date({
          label: "Published",
          validation: { isRequired: true },
          defaultValue: { kind: "today" },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/writing",
          publicPath: "/images/writing",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ],
          defaultValue: "draft",
        }),
        series: fields.relationship({
          label: "Series",
          collection: "series",
        }),
        seriesOrder: fields.integer({
          label: "Series Order",
          description: "Position in the series (1, 2, 3…)",
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
});
