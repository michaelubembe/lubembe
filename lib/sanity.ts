import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false, // Disable CDN to avoid CORS issues and get fresh data
    token: process.env.SANITY_API_TOKEN, // Optional: only needed for private datasets
    perspective: 'published', // Only fetch published documents
})

// Helper to build image URLs
export function urlForImage(source: any) {
    if (!source?.asset?._ref) {
        return undefined
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

    // Extract image ID from reference
    const [, id, dimensions, format] = source.asset._ref.split('-')

    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}
