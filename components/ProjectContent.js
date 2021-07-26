import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { urlFor, PortableText } from '../lib/sanity';
import ReactPlayer from 'react-player';

const ProjectContent = ({ projectContent }) => {
  const ProjectContentWrapper = styled.div`
    margin-top: var(--size-8);
  `;

  const projectHeaderStyles = css`
    font-size: var(--size-5);
    color: var(--colour-heading);
  `;

  const projectImageStyle = css`
    margin: var(--size-4) var(--size-1);
    max-width: 1200px;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    justify-content: center;

    @media (min-width: 700px) {
      margin: var(--size-4) var(--size-8);
    }
    @media (min-width: 896px) {
      margin: var(--size-8) auto;
    }
  `;
  const projectContentStyle = css`
    margin: 0 auto;
    /* max-width: 800px; */
  `;

  const projectContentText = css`
    margin: 0 var(--size-1);
    max-width: 800px;
    @media (min-width: 700px) {
      margin: 0 auto;
    }
  `;

  const rowTwoItemsStyle = css`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: flex-start;
    @media (min-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

  const rowTwoItemsImageStyle = css`
    width: 100%;
    @media (min-width: 800px) {
      width: auto;
    }
  `;

  const ReactPlayerStyles = styled(ReactPlayer)``;

  const rowTwoItemsRenderer = ({ node }) => {
    return (
      <div css={rowTwoItemsStyle}>
        {node.itemArray.map((item) => {
          const key = item._key;
          return (
            <React.Fragment key={item._key}>
              {item._type === 'imageItem' ? (
                <div key={item._key}>
                  <img
                    sizes='(min-width: 800px) 800px, 100vw'
                    srcSet={[
                      urlFor(item.rowImage.asset)
                        .auto('format')
                        .width(3200)
                        .url() + ` 3200w`,
                      urlFor(item.rowImage.asset)
                        .auto('format')
                        .width(1600)
                        .url() + ` 1600w`,
                      urlFor(item.rowImage.asset)
                        .auto('format')
                        .width(800)
                        .url() + ` 800w`,
                    ]}
                    src={urlFor(item.rowImage.asset)
                      .auto('format')
                      .width(800)
                      .url()}
                    alt={item.rowImage.imageDescription}
                    css={rowTwoItemsImageStyle}
                    key={key}
                  />
                </div>
              ) : (
                <div
                  css={css`
                    position: relative;
                    display: flex;
                    justify-content: center;
                  `}
                  key={key}
                >
                  <ReactPlayerStyles
                    url={item.videoURL}
                    width='400px'
                    height='auto'
                    playing={true}
                    loop={true}
                    muted
                    controls={true}
                    css={css`
                      border-radius: 16px;
                      overflow: hidden;
                      & video {
                        display: block;
                      }
                    `}
                    key={key}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const imageWidthCheck = ({ node }) => {
    const imageWidth = node.metadata.dimensions.width;
    const imageKey = node._key;

    return (
      <div css={projectImageStyle}>
        {imageWidth > 800 ? (
          <img
            sizes='(min-width: 800px) 1600px, 100vw'
            srcSet={[
              urlFor(node.galleryImage.asset).auto('format').width(3200).url() +
                ` 3200w`,
              urlFor(node.galleryImage.asset).auto('format').width(1600).url() +
                ` 1600w`,
              urlFor(node.galleryImage.asset).auto('format').width(800).url() +
                ` 800w`,
            ]}
            src={urlFor(node.galleryImage.asset)
              .auto('format')
              .width(800)
              .url()}
            alt={node.imageDescription}
            key={imageKey}
          />
        ) : (
          <img
            sizes='(min-width: 800px) 400px, 100vw'
            srcSet={[
              urlFor(node.galleryImage.asset).auto('format').width(1600).url() +
                ` 1600w`,
              urlFor(node.galleryImage.asset).auto('format').width(800).url() +
                ` 800w`,
            ]}
            src={urlFor(node.galleryImage.asset)
              .auto('format')
              .width(800)
              .url()}
            alt={node.imageDescription}
            key={imageKey}
          />
        )}
      </div>
    );
  };

  const blockRenderer = ({ node, children }) => {
    switch (node.style) {
      case 'h1':
        return (
          <div css={projectContentText}>
            <h1>{children}</h1>
          </div>
        );
      case 'h2':
        return (
          <div css={projectContentText}>
            <h2 css={projectHeaderStyles}>{children}</h2>
          </div>
        );
      case 'h3':
        return (
          <div css={projectContentText}>
            <h3 css={projectHeaderStyles}>{children}</h3>
          </div>
        );
      case 'h4':
        return (
          <div css={projectContentText}>
            <h4 css={projectHeaderStyles}>{children}</h4>
          </div>
        );
      case 'h5':
        return (
          <div css={projectContentText}>
            <h5 css={projectHeaderStyles}>{children}</h5>
          </div>
        );
      case 'h6':
        return (
          <div css={projectContentText}>
            <h6 css={projectHeaderStyles}>{children}</h6>
          </div>
        );
      case 'blockquote':
        return (
          <div css={projectContentText}>
            <blockquote>{children}</blockquote>
          </div>
        );
      default:
        return (
          <div css={projectContentText}>
            <p>{children}</p>
          </div>
        );
    }
  };

  const videoRenderer = ({ node }) => {
    return (
      <div
        css={css`
          position: relative;
          display: flex;
          justify-content: center;
        `}
      >
        <ReactPlayerStyles
          url={node.videoURL}
          width='400px'
          height='auto'
          playing={true}
          loop={true}
          muted
          controls={true}
          css={css`
            border-radius: 16px;
            overflow: hidden;
            & video {
              display: block;
            }
          `}
        />
      </div>
    );
  };

  return (
    <ProjectContentWrapper>
      <PortableText
        blocks={projectContent}
        serializers={{
          types: {
            galleryItem: (props) => imageWidthCheck(props),
            rowTwoItems: rowTwoItemsRenderer,
            block: blockRenderer,
            video: videoRenderer,
          },
        }}
      />
    </ProjectContentWrapper>
  );
};

export default ProjectContent;
