import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { urlFor } from '../lib/sanity';

const ProjectMeta = ({ client, subtitle, description, role, hero }) => {
  const ProjectSubtitleWrapper = styled.div`
    display: flex;
    margin: var(--size-2) auto;
    max-width: 1200px;
    justify-content: flex-start;
    @media (min-width: 800px) {
      margin: var(--size-10) auto;
    }
  `;

  const Subtitle = styled.h2`
    /* font-size: var(--size-10); */
    font-size: clamp(2.75rem, 9vw, 4rem);
    font-weight: 300;
    /* @media(min-width: 800px) */
  `;

  const ProjectOverview = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    max-width: 1200px;
    margin: 0 auto;
    @media (min-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

  const ProjectDescription = styled.h2`
    font-size: var(--project-description);
    font-weight: 500;
    line-height: var(--line-height-body);
  `;

  const MetaWrapper = styled.div``;
  const MetaContainer = styled.div``;
  const Label = styled.span`
    font-size: var(--size-1);
    display: block;
    text-transform: uppercase;
  `;
  const Value = styled.h2`
    font-size: var(--size-5);
    font-weight: 600;
  `;

  const HeroImage = styled.img`
    margin: 0 auto;
  `;

  return (
    <>
      <ProjectSubtitleWrapper>
        <Subtitle>{subtitle}</Subtitle>
      </ProjectSubtitleWrapper>
      <ProjectOverview>
        <MetaWrapper>
          <MetaContainer>
            <Label>Client</Label>
            <Value>{client}</Value>
          </MetaContainer>
          <MetaContainer>
            <Label>Role</Label>
            <Value>{role}</Value>
          </MetaContainer>
        </MetaWrapper>
        <ProjectDescription>{description}</ProjectDescription>
      </ProjectOverview>
      <HeroImage
        sizes='(min-width: 800px) 1200px, 100vw'
        srcSet={[
          urlFor(hero.projectHeroImage).auto('format').width(3200).url() +
            ` 3200w`,
          urlFor(hero.projectHeroImage).auto('format').width(1600).url() +
            ` 1600w`,
          urlFor(hero.projectHeroImage).auto('format').width(800).url() +
            ` 800w`,
        ]}
        src={urlFor(hero.projectHeroImage).url()}
      />
    </>
  );
};

export default ProjectMeta;
