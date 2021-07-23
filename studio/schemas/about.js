export default {
  name: 'aboutMe',
  title: 'About me',
  type: 'document',
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'aboutMeImage',
      title: 'About me image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
