# Michael Lubembe's Blog

A minimalistic blog site built with Next.js and Sanity CMS to showcase projects. Manage your content through a beautiful, no-code dashboard.

## Features

- 🎨 **Beautiful UI** - Clean, modern design with smooth animations
- 📝 **No-Code CMS** - Manage projects through Sanity Studio dashboard
- 🖼️ **Image Support** - Upload and optimize project images
- 🏷️ **Technology Tags** - Showcase technologies used in each project
- ⚡ **Fast & Optimized** - Built with Next.js 16 and optimized images

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

#### Create a Sanity Account

1. Visit [sanity.io](https://www.sanity.io/) and create a free account
2. Once logged in, you'll be prompted to create a new project when you first run the studio

#### Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

You'll add your Sanity credentials after the initial setup.

### 3. Initialize Sanity Studio

Run the development server:

```bash
npm run dev
```

Then visit `http://localhost:3000/studio` in your browser. You'll be prompted to:

1. **Log in** to your Sanity account
2. **Create a new project** or select an existing one
3. **Choose a dataset name** (use "production" for simplicity)

After completing this, Sanity will provide you with:
- **Project ID** - A unique identifier for your project
- **Dataset** - The name of your dataset (e.g., "production")

### 4. Add Credentials to Environment Variables

Update your `.env.local` file with the credentials from Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Important:** Restart your development server after updating environment variables.

### 5. Start Adding Projects

1. Visit `http://localhost:3000/studio`
2. Click **"Project"** in the sidebar
3. Click **"Create new"**
4. Fill in the project details:
   - **Title** - Name of your project
   - **Slug** - Auto-generated URL-friendly version
   - **Description** - Brief description of the project
   - **Project Link** - URL to live project or repository
   - **Featured Image** - Upload a screenshot or banner
   - **Technologies** - Add technology tags (e.g., "React", "TypeScript")
   - **Featured** - Toggle to highlight important projects
   - **Display Order** - Lower numbers appear first
5. Click **"Publish"**

Your project will immediately appear on the homepage at `http://localhost:3000`!

## Project Structure

```
lubembe_blog/
├── app/
│   ├── page.tsx              # Homepage (fetches from Sanity)
│   ├── page.module.css       # Homepage styles
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx      # Sanity Studio route
├── lib/
│   ├── sanity.ts             # Sanity client configuration
│   └── sanity.queries.ts     # GROQ queries for data fetching
├── schemas/
│   ├── index.ts              # Schema exports
│   └── project.ts            # Project content type definition
├── sanity.config.ts          # Sanity Studio configuration
├── sanity.cli.ts             # Sanity CLI configuration
└── .env.local                # Environment variables (not committed)
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run sanity` - Run Sanity CLI commands

## Sanity Studio

Access the Sanity Studio dashboard at `http://localhost:3000/studio` to:

- ✏️ Add, edit, and delete projects
- 🖼️ Upload and manage images
- 👁️ Preview content changes
- 🔍 Query your data with GROQ (via Vision plugin)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import your repository
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy!

Your Sanity Studio will be available at `https://your-domain.com/studio`

### Deploy Sanity Studio (Optional)

You can also deploy Sanity Studio separately:

```bash
npm run sanity deploy
```

This creates a standalone studio at `https://your-project.sanity.studio`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## Support

For issues or questions, refer to:
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Sanity Community](https://www.sanity.io/community)

