import { groq } from 'next-sanity';

export const projectQuery = groq`
*[_type == "project" && slug.current == $slug][0]{
  title,
  slug,
  subtitle,
  projectDescription,
  projectRole,
  'projectHero': projectHero{
...,
  'projectHeroImage': asset->url
},
  'projectContent': projectContent[]{
...,
// 'metadata': galleryImage.asset->metadata, 
galleryImage {...,'metadata':asset->metadata},
itemArray[]{..., 'metadataRow': rowImage.asset->metadata}
},
  }
`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)]{
  "params": {
    "slug": slug.current
  }
}`;

export const projectBySlugQuery = groq`
*[_type == "project" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  subtitle,
  projectDescription,
  projectRole,
  'projectHero': projectHero{
...,
  'projectHeroImage': asset->url
},
  'projectContent': projectContent[]{
...,
'metadata': galleryImage.asset->metadata, 
},
  }
`;

export const photographyQuery = groq`
*[_type == "photography"][0]{
  title,
  slug,
  galleryItems[]{
    ...,
'galleryImage': galleryImage.asset->{
    url,
    metadata{dimensions}
  }
  }
  }
`;

export const aboutMeQuery = groq`
*[_type == "aboutMe"][0]{
  title,
  slug,
	aboutMeImage
  {
  asset->{url}
}

  }
`;
