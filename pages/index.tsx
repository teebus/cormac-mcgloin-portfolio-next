import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { groq } from 'next-sanity';
import { usePreviewSubscription, urlFor, PortableText } from '../lib/sanity';
import { getClient } from '../lib/sanity.server';

interface HomeProps {
  homeData: any;
}

export default function Home({ homeData }: HomeProps) {
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

  const variants = {
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    messageShow: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0,
        ease: 'easeInOut',
      },
    },
    imageShow: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        ease: 'easeInOut',
      },
    },
    initial: {
      opacity: 0,
      y: 20,
    },
  };

  const IntroTextWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    /* grid-template-rows: repeat(4, 1fr); */
    column-gap: var(--size-3);
    margin-top: var(--size-10);
  `;

  const IntroTextItem = styled(motion.h1)`
    font-size: clamp(3.75rem, 9vw, 7.5rem);
    margin-bottom: 0;
    text-transform: uppercase;
    color: #e4dec6;
    font-weight: 700;
    line-height: calc(0.65 * var(--line-height-heading));
  `;

  const ImageWrapper = styled(motion.div)`
    /* max-width: 600px; */
  `;

  const ImageStyle = styled.img`
    width: 100%;
    height: 600px;
    object-fit: cover;
    border-radius: 8px;
    position: relative;
  `;

  const Projects = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: var(--size-10);
    margin-top: var(--size-10);
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
  `;
  const Project = styled.div`
    display: flex;
    gap: var(--size-1);
    flex-flow: row wrap;
    @media (min-width: 800px) {
      flex-flow: column nowrap;
    }
    > * {
      flex: 1 1 50%;
      /* @media (min-width: 800px) {
        width: 50%;
      } */
    }
  `;
  const ProjectInfoWrapper = styled(motion.div)`
    display: flex;
    align-items: center;
  `;

  const ProjectTitle = styled.h2`
    font-size: var(--size-4);
  `;

  return (
    <Layout>
      <Head>
        <title>Cormac McGloin | Product Designer</title>
        <meta
          name='title'
          key='title'
          content='Cormac McGloin | Product Designer'
        />
        <meta
          name='description'
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
        <IntroTextWrapper>
          <IntroTextItem
            exit='exit'
            animate='messageShow'
            initial='initial'
            variants={variants}
            css={css`
              grid-column: 1/-1;
              @media (min-width: 600px) {
                grid-column: 5/-1;
              }
            `}
          >
            Cormac
          </IntroTextItem>
          <IntroTextItem
            exit='exit'
            animate='messageShow'
            initial='initial'
            variants={variants}
            css={css`
              grid-column: 2/-1;
              @media (min-width: 600px) {
                grid-column: 7/-1;
              }
            `}
          >
            {/* {homeData.introText.introText} */}
            McGloin
          </IntroTextItem>
          <IntroTextItem
            exit='exit'
            animate='messageShow'
            initial='initial'
            variants={variants}
            css={css`
              grid-column: 1/-1;
              font-weight: 300;
              @media (min-width: 600px) {
                grid-column: 2/-1;
              }
            `}
          >
            Product
          </IntroTextItem>
          <IntroTextItem
            exit='exit'
            animate='messageShow'
            initial='initial'
            variants={variants}
            css={css`
              grid-column: 2/-1;
              font-weight: 300;
              @media (min-width: 600px) {
                grid-column: 4/-1;
              }
            `}
          >
            Designer
          </IntroTextItem>
        </IntroTextWrapper>
        <Projects>
          {homeData.projects.map((project: any) => {
            return (
              <Project key={project.title}>
                <Link
                  href={`/project/${project.slug.current}`}
                  passHref
                  key={project.projectHero.asset._ref}
                  scroll={false}
                >
                  <a key={project.projectHero.asset._ref}>
                    <ImageWrapper
                      key={project.projectHero.asset._ref}
                      exit='exit'
                      animate='imageShow'
                      initial='initial'
                      variants={variants}
                    >
                      <ImageStyle
                        key={project.projectHero.asset._ref}
                        src={`${urlFor(project.projectHeroImage).url()}`}
                      />
                    </ImageWrapper>
                  </a>
                </Link>
                <ProjectInfoWrapper
                  key={project.title}
                  exit='exit'
                  animate='messageShow'
                  initial='initial'
                  variants={variants}
                >
                  <ProjectTitle>{project.title}</ProjectTitle>
                </ProjectInfoWrapper>
              </Project>
            );
          })}
        </Projects>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      homeData: await getClient().fetch(groq`
// *[_type == "project"]{
// title,
// slug{current}
// }
{'projects': *[_type == "project"]{
title,
subTitle,
slug{current},
projectHero,
'projectHeroImage':projectHero.asset->url
},
'introText':*[_type == "homepage"][0]{
  introText
}
}
  `),
    },
  };
};
