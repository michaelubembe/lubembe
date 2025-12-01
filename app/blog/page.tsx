import { client } from '@/lib/sanity'
import { blogsQuery } from '@/lib/sanity.queries'
import { BlogListItem } from '../types/blog'
import { formatRelativeTime } from '../utils/formatDate'
import { formatReadingTime } from '../utils/readingTime'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'
import styles from './blog.module.css'
import Link from 'next/link'

async function getBlogs(): Promise<BlogListItem[]> {
    try {
        const blogs = await client.fetch(blogsQuery)
        return blogs || []
    } catch (error) {
        console.error('Error fetching blogs:', error)
        return []
    }
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function BlogPage() {
    const blogs = await getBlogs()

    return (
        <div className={styles.container}>
            <ThemeToggle />
            <header className={styles.header}>
                <h1 className={styles.title}>Blog</h1>
                <p className={styles.subtitle}>Thoughts, ideas, and reflections</p>
                <Navigation />
            </header>

            <main className={styles.blogList}>
                {blogs.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No blog posts yet. Check back soon!</p>
                    </div>
                ) : (
                    <ul className={styles.list}>
                        {blogs.map((blog) => (
                            <li key={blog._id} className={styles.listItem}>
                                <Link href={`/blog/${blog.slug.current}`} className={styles.blogLink}>
                                    <div className={styles.blogHeader}>
                                        <h2 className={styles.blogTitle}>{blog.title}</h2>
                                        <div className={styles.blogMeta}>
                                            <time className={styles.date}>
                                                {formatRelativeTime(blog.publishedAt)}
                                            </time>
                                            <span className={styles.separator}>•</span>
                                            <span className={styles.readingTime}>
                                                {formatReadingTime(blog.readingTime)}
                                            </span>
                                        </div>
                                    </div>
                                    {blog.excerpt && (
                                        <p className={styles.excerpt}>{blog.excerpt}</p>
                                    )}
                                    {blog.tags && blog.tags.length > 0 && (
                                        <div className={styles.tags}>
                                            {blog.tags.map((tag, idx) => (
                                                <span key={idx} className={styles.tag}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    )
}
