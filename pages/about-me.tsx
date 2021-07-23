import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { aboutMeQuery } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { getClient } from '../lib/sanity.server';

interface AboutProps {
  aboutData: any;
}

export default function AboutMe({ aboutData }: AboutProps) {
  useEffect(
    () =>
      // <-- Now we return the useEffect teardown effect, which will be fired only after the path/search change for the first time

      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        // behavior: 'smooth',
      }),
    []
  );

  const infoWrapperStyles = css`
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--size-10) var(--size-1);
    @media (min-width: 700px) {
      padding: var(--size-10) var(--size-8);
    }
    @media (min-width: 1025px) {
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      padding: var(--size-10) var(--size-8);
      gap: var(--size-10);
    }
  `;

  const infoText = css`
    display: flex;
    flex-flow: column wrap;
    order: 2;
    flex: 100%;
    font-size: var(--size-5);
    font-family: var(--font-family-heading);
    color: var(--colour-heading);
    /* margin-bottom: var(--size-10); */
    line-height: var(--line-height-heading);
    @media (min-width: 1024px) {
      flex: 0 0 calc(60% - (var(--size-10)) / 2);
      /* margin: 0 var(--size-10) 0 0; */
    }
    @media (min-width: 1025px) {
      order: 2;
      font-size: var(--size-7);
    }
  `;
  const infoImageWrapperStyles = css`
    display: flex;
    order: 1;
    height: 50vh;
    max-height: 50vh;
    flex: 0 0 100%;
    /* width: 100%; */
    margin-bottom: var(--size-4);
    overflow: hidden;
    /* visibility: hidden; */

    * {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    @media (min-width: 1025px) {
      order: 1;
      height: auto;
      flex: 0 0 calc(40% - (var(--size-10)) / 2);
      margin-bottom: 0;
      max-height: none;
    }
  `;
  const infoImageStyles = css`
    object-fit: cover;
    width: 100%;
    height: 100%;
  `;

  const textLine = css`
    margin-bottom: var(--size-6);
    /* visibility: hidden; */
  `;

  const linkStyles = css`
    position: relative;
    color: var(--colour-heading);
    transition: color 0.2s ease-in-out;
    display: inline-block;
    font-weight: 700;
    z-index: 0;
    &:hover {
      color: var(--colour-link-highlight-text);
    }
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.25em;
      background: var(--colour-link-highlight);
      transition: height 0.2s ease-in-out;
      z-index: -1;
    }
    &:hover {
      &:before {
        height: 90%;
      }
    }
  `;

  const emailLinkStyles = css`
    font-size: var(--size-3);
    margin: 0;
    @media (min-width: 700px) {
      position: relative;
      margin: 0;
    }
    /* @media (min-width: 1025px) {
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0 var(--size-8) var(--size-8);
    } */
  `;

  const easing = [0.6, -0.05, 0.01, 0.99];

  const container = {
    exit: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        ease: easing,
      },
    },
    hidden: {
      opacity: 0,
      y: 0,
    },
  };

  const item = {
    show: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 30,
    },
  };

  return (
    <Layout>
      <Head>
        <title>About me</title>
        <meta
          name='title'
          key='title'
          content='About me - Cormac McGloin | Product Designer'
        />
        <meta
          name='description'
          key='description'
          content='Product designer based in London, helping businesses understand their customers and improve their products."'
        />

        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main
        css={css`
          /* margin-left: var(--nav-width); */
          min-height: 100vh;
        `}
      >
        <div css={infoWrapperStyles}>
          <motion.div
            css={infoText}
            variants={container}
            initial='hidden'
            animate='show'
            exit='exit'
          >
            <motion.div css={textLine} className='textLine' variants={item}>
              Hey, I’m Cormac, a <strong>product designer</strong> currently
              based in&nbsp;London.
            </motion.div>
            <motion.div css={textLine} className='textLine' variants={item}>
              I help companies <strong>understand their customers</strong> and{' '}
              <strong>improve their&nbsp;products</strong>.
            </motion.div>
            <motion.div css={textLine} className='textLine' variants={item}>
              I also enjoy{' '}
              <Link href='/photography' passHref>
                <a css={linkStyles}>photography</a>
              </Link>
            </motion.div>
            <motion.div
              css={[textLine, emailLinkStyles]}
              className='textLine'
              variants={item}
            >
              Let's chat:&#20;
              <a href='mailto:hey@cormacmcgloin.com' target='blank'>
                <span css={linkStyles}>
                  hey
                  <span
                    style={{
                      fontFamily: 'Helvetica',
                      display: 'inline-block',
                      transform: 'translateY(4px)',
                    }}
                  >
                    @
                  </span>
                  cormacmcgloin.com
                </span>
              </a>
            </motion.div>
          </motion.div>
          {aboutData?.aboutMeImage && (
            <div css={infoImageWrapperStyles}>
              <picture>
                <source
                  sizes='(min-width: 800px) 400px, 100vw,'
                  srcSet={`${
                    urlFor(aboutData.aboutMeImage.asset.url)
                      // .fit("max")
                      .width(800)
                      .url() + ` 800w`
                  },
                    ${
                      urlFor(aboutData.aboutMeImage.asset.url)
                        // .fit("max")
                        .width(400)
                        .url() + ` 400w`
                    },
          `}
                />

                <img
                  css={infoImageStyles}
                  src={
                    urlFor(aboutData.aboutMeImage.asset.url)
                      // .fit("max")
                      .width(400)
                      .url() + ` 400w`
                  }
                  alt='Portrait of Cormac McGloin '
                />
              </picture>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      aboutData: await getClient().fetch(aboutMeQuery),
    },
  };
};
