import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import urlBuilder from '@sanity/image-url';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { urlFor, PortableText } from '../lib/sanity';
import { getClient } from '../lib/sanity.server';
import { photographyQuery } from '../lib/queries';
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/react';

// import "react-medium-image-zoom/dist/styles.css"

const Photography = ({ data }) => {
  const { photography } = data;
  const { title, galleryItems } = photography;

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const galleryMap = galleryItems.map((image) => {
    return {
      src: urlFor(image.galleryImage.url).auto('format').url(),
      srcSet: [
        // urlFor(image.asset)
        //   .width(1600)
        //   .url() + ` 1600w`,
        urlFor(image.galleryImage.url).auto('format').width(800).url() +
          ` 800w`,
        urlFor(image.galleryImage.url).auto('format').width(400).url() +
          ` 400w`,
      ],
      sizes: ['(min-width: 800px) 400px, 100vw'],
      width: image.galleryImage.metadata.dimensions.width,
      height: image.galleryImage.metadata.dimensions.height,
      title: image.imageDescription,
      alt: image.imageDescription,
    };
  });

  return (
    <Layout>
      <Head>
        <title>{title} - Cormac McGloin | Product Designer</title>
        <meta
          name='title'
          key='title'
          content='Cormac McGloin | Product Designer'
        />
        <meta
          name='description'
          content='Product designer based in London, helping businesses understand their customers and improve their products."'
        />

        <link rel='icon' type='image/png' href='/favicon.png' />
      </Head>

      <div
        css={{
          // mixBlendMode: "difference",
          // background: '#FAF8F6',
          overflow: 'hidden',
        }}
      >
        <Gallery
          photos={galleryMap}
          direction='column'
          onClick={openLightbox}
        />

        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                styles={{
                  view: () => ({
                    textAlign: 'center',
                    '& > img': {
                      display: 'initial',
                      maxHeight: '100vh',
                    },
                  }),
                }}
                currentIndex={currentImage}
                views={galleryMap.map((image) => {
                  return {
                    ...image,
                    // srcset: image.srcSet,
                    caption: image.title,
                  };
                })}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const photography = await getClient().fetch(photographyQuery);
  console.log(photography);

  if (!photography?.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: { photography } },
  };
}

export default Photography;
