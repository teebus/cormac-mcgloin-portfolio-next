import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { urlFor, PortableText } from '../../lib/sanity';
import { getClient } from '../../lib/sanity.server';
import Layout from '../../components/Layout';
import ProjectMetaData from '../../components/ProjectMetaData';
import ProjectContent from '../../components/ProjectContent';
import { projectQuery, projectSlugsQuery } from '../../lib/queries';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

const Project = ({ data }) => {
  const { pathname, search } = useRouter();

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

  const router = useRouter();

  const { project } = data;
  const {
    title,
    subtitle,
    projectDescription,
    projectHero,
    projectRole,
    projectContent,
  } = project;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const heroStyle = css`
    width: 100%;
    height: 70vh;
    overflow: hidden;
    * {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `;

  const projectInfoStyles = css`
    margin: var(--size-8) var(--size-1);
    max-width: 800px;
    @media (min-width: 700px) {
      margin: var(--size-10) var(--size-8);
    }
    @media (min-width: 896px) {
      margin: var(--size-10) auto;
    }
  `;

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

        <link rel='icon' href='/favicon.png' />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        exit={{
          opacity: 0,
        }}
        css={css`
          padding: 0 var(--size-2) 0 var(--size-1);
        `}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
            },
          }}
        >
          <ProjectMetaData
            client={title}
            subtitle={subtitle}
            description={projectDescription}
            hero={projectHero}
            role={projectRole}
          />
        </motion.div>
        <ProjectContent projectContent={projectContent} />
      </motion.div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getClient().fetch(projectSlugsQuery);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const project = await getClient().fetch(projectQuery, { slug });

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: { project } },
  };
}

export default Project;
