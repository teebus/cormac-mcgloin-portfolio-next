export default {
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Video title',
      type: 'string',
    },
    {
      name: 'videoURL',
      title: 'Video URL',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
