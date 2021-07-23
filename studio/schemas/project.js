export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'projectHero',
      title: 'Project hero',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'projectDescription',
      title: 'Project description',
      type: 'text',
    },
    {
      name: 'projectRole',
      title: 'Role in project',
      type: 'string',
    },
    {
      name: 'projectContent',
      title: 'Project content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'galleryItem' },
        { type: 'video' },
        { type: 'rowTwoItems' },
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
  ],

  //TODO play with previews
};
