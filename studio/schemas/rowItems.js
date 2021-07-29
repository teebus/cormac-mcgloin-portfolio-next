export default {
  name: 'rowItems',
  title: 'Row',
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
    },
  ],

  preview: {
    select: {
      title: 'itemArray.0.imageDescription',
      media: 'itemArray.0.rowImage',
      videoTitle: 'itemArray.0.title',
    },
    prepare: ({ title, videoTitle, media }) => {
      const titleCheck = Boolean(title);
      const videoTitleCheck = Boolean(videoTitle);

      return {
        title: titleCheck ? title : videoTitle,
        media,
      };
    },
  },
};
