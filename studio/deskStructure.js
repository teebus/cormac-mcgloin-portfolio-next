// deskStructure.js
import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .id('Homepage')
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .title('Photography')
        .child(
          S.document()
            .id('Photography')
            .schemaType('photography')
            .documentId('photography')
        ),
      S.listItem()
        .title('About me')
        .child(
          S.document().id('aboutMe').schemaType('aboutMe').documentId('aboutMe')
        ),

      // Add a visual divider (optional)
      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['homepage', 'photography', 'aboutMe'].includes(listItem.getId())
      ),
    ]);
