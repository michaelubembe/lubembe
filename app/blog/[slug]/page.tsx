import { client } from '@/lib/sanity'
import { blogBySlugQuery } from '@/lib/sanity.queries'
import { Blog } from '@/app/types/blog'
import { formatRelativeTime } from '@/app/utils/formatDate'
import { formatReadingTime } from '@/app/utils/readingTime'
import { PortableText } from '@portabletext/react'
import styles from '../blog.module.css'
import Link from 'next/link'

interface PageProps {
    params: Promise<{ slug: string }>
}

async function getBlog(slug: string): Promise<Blog | null> {
    try {
        const blog = await client.fetch(blogBySlugQuery, { slug })
        return blog
    } catch (error) {
        console.error('Error fetching blog:', error)
        return null
    }
}

// Revalidate every 60 seconds
export const revalidate = 60

// Portable Text components for custom rendering
const portableTextComponents = {
    block: {
        h2: ({ children }: any) => <h2 className={styles.contentH2}>{children}</h2>,
        h3: ({ children }: any) => <h3 className={styles.contentH3}>{children}</h3>,
        normal: ({ children }: any) => <p className={styles.contentP}>{children}</p>,
        blockquote: ({ children }: any) => <blockquote className={styles.contentBlockquote}>{children}</blockquote>,
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = value.href.startsWith('/') ? undefined : 'noopener noreferrer'
            const target = value.href.startsWith('/') ? undefined : '_blank'
            return (
                <a href={value.href} rel={rel} target={target} className={styles.contentLink}>
                    {children}
                </a>
            )
        },
        strong: ({ children }: any) => <strong className={styles.contentStrong}>{children}</strong>,
        em: ({ children }: any) => <em className={styles.contentEm}>{children}</em>,
        code: ({ children }: any) => <code className={styles.contentCode}>{children}</code>,
    },
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params
    const blog = await getBlog(slug)

    if (!blog) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>
                    <h1>Blog post not found</h1>
                    <Link href="/blog" className={styles.backLink}>
                        ← Back to blog
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <article className={styles.article}>
                <Link href="/blog" className={styles.backLink}>
                    ← Back to blog
                </Link>

                <header className={styles.articleHeader}>
                    <h1 className={styles.articleTitle}>{blog.title}</h1>
                    <div className={styles.articleMeta}>
                        {blog.author && <span className={styles.author}>{blog.author}</span>}
                        <span className={styles.separator}>•</span>
                        <time className={styles.date}>
                            {formatRelativeTime(blog.publishedAt)}
                        </time>
                        <span className={styles.separator}>•</span>
                        <span className={styles.readingTime}>
                            {formatReadingTime(blog.readingTime)}
                        </span>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                        <div className={styles.articleTags}>
                            {blog.tags.map((tag, idx) => (
                                <span key={idx} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                <div className={styles.articleContent}>
                    <PortableText value={blog.content} components={portableTextComponents} />
                </div>
            </article>
        </div>
    )
}
