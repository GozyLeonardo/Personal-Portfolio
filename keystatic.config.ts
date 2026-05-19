import { config, collection, fields, component } from "@keystatic/core";

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
          components: {
            Verdict: component({
              label: "Verdict",
              schema: {
                children: fields.child({
                  kind: "block",
                  placeholder: "Lawrence's ruling…",
                  formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
                }),
              },
              preview: () => null,
            }),
            Signal: component({
              label: "Signal",
              schema: {
                type: fields.select({
                  label: "Type",
                  options: [
                    { label: "Intel", value: "intel" },
                    { label: "Risk", value: "risk" },
                  ],
                  defaultValue: "intel",
                }),
                children: fields.child({
                  kind: "block",
                  placeholder: "Signal content…",
                  formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
                }),
              },
              preview: () => null,
            }),
            Chi: component({
              label: "Chi",
              schema: {
                children: fields.child({
                  kind: "inline",
                  placeholder: "A truth that carries weight…",
                  formatting: { inlineMarks: "inherit" },
                }),
              },
              preview: () => null,
            }),
            Unfold: component({
              label: "Unfold",
              schema: {
                title: fields.text({ label: "Section title" }),
                children: fields.child({
                  kind: "block",
                  placeholder: "Deep-dive content…",
                  formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
                }),
              },
              preview: () => null,
            }),
            Frame: component({
              label: "Frame",
              schema: {
                src: fields.image({
                  label: "Image",
                  directory: "public/images/writing",
                  publicPath: "/images/writing",
                }),
                alt: fields.text({ label: "Alt text" }),
                caption: fields.text({ label: "Caption (optional)" }),
                gold: fields.checkbox({
                  label: "Gold corner ornaments",
                  defaultValue: false,
                }),
              },
              preview: () => null,
            }),
          },
        }),
      },
    }),
  },
});
