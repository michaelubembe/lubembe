import { groq } from 'next-sanity'

// Get all projects, ordered by display order and published date
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    link,
    image,
    technologies,
    featured,
    publishedAt
  }
`

// Get featured projects only
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    link,
    image,
    technologies,
    publishedAt
  }
`

// Get a single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    link,
    image,
    technologies,
    featured,
    publishedAt
  }
`

// Get all blog posts, ordered by published date
export const blogsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    readingTime,
    tags,
    featured
  }
`

// Get a single blog post by slug with full content
export const blogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    author,
    readingTime,
    tags,
    featured
  }
`

