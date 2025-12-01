import { PortableTextBlock } from 'sanity'

export interface Blog {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    content: PortableTextBlock[]
    publishedAt: string
    author?: string
    readingTime?: number
    tags?: string[]
    featured: boolean
}

export interface BlogListItem {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    publishedAt: string
    author?: string
    readingTime?: number
    tags?: string[]
    featured: boolean
}
