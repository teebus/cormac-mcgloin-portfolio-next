export default {
  name: 'rowTwoItems',
  title: 'Row - Two items',
  type: 'object',
  fields: [
    {
      name: 'itemArray',
      title: 'Add item',
      type: 'array',
      of: [
        {
          name: 'imageItem',
          title: 'Image',
          type: 'object',
          fields: [
            {
              name: 'rowImage',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'imageDescription',
              title: 'Image description',
              type: 'string',
            },
          ],
        },
        { type: 'video' },
      ],
      validation: (Rule) => Rule.length(2),
    },
  ],

  preview: {
    select: {
      title: 'imageDescription',
      media: 'rowImage',
    },
  },
};
