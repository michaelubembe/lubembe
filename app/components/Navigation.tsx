'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

export default function Navigation() {
    const pathname = usePathname()

    // Don't show navigation on studio pages
    if (pathname?.startsWith('/studio')) {
        return null
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li>
                    <Link
                        href="/"
                        className={pathname === '/' ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        Projects
                    </Link>
                </li>
                <li>
                    <Link
                        href="/blog"
                        className={pathname?.startsWith('/blog') ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        Blog
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className={pathname === '/about' ? `${styles.navLink} ${styles.active}` : styles.navLink}
                    >
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
