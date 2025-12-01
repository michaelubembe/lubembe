import { defineField, defineType } from 'sanity'
import React from 'react'

const BlockquotePreview = (props: any) => {
    return (
        <blockquote style={{ borderLeft: '2px solid #ccc', paddingLeft: '1em', margin: '1em 0' }}>
            {props.children}
        </blockquote>
    )
}

export default defineType({
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'Short description for the blog list page',
            rows: 3,
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote', component: BlockquotePreview },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            initialValue: 'Michael Lubembe',
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            description: 'Estimated reading time in minutes',
            initialValue: 5,
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Display this post prominently',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'excerpt',
            date: 'publishedAt',
        },
        prepare({ title, subtitle, date }) {
            return {
                title,
                subtitle: subtitle || new Date(date).toLocaleDateString(),
            }
        },
    },
})
