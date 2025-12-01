import { PortableTextBlock } from 'sanity'

// Calculate estimated reading time from portable text content
// Average reading speed: ~200 words per minute
export function calculateReadingTime(content: PortableTextBlock[]): number {
    if (!content || content.length === 0) return 1

    const wordsPerMinute = 200
    let wordCount = 0

    content.forEach((block) => {
        if (block._type === 'block' && 'children' in block && Array.isArray(block.children)) {
            block.children.forEach((child: any) => {
                if (child.text) {
                    wordCount += child.text.split(/\s+/).filter(Boolean).length
                }
            })
        }
    })

    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return minutes || 1 // Minimum 1 minute
}

// Format reading time for display
export function formatReadingTime(minutes?: number): string {
    if (!minutes) return '1 min read'
    return `${minutes} min read`
}
