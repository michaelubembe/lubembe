import styles from "./page.module.css";
import { client, urlForImage } from "@/lib/sanity";
import { projectsQuery } from "@/lib/sanity.queries";
import Image from "next/image";
import ThemeToggle from "./components/ThemeToggle";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  link?: string;
  image?: any;
  technologies?: string[];
  featured: boolean;
  publishedAt: string;
}

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery);
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <header className={styles.header}>
        <h1 className={styles.title}>Michael Lubembe</h1>
        <p className={styles.subtitle}>Building tools for today.</p>
      </header>

      <main className={styles.grid}>
        {projects.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No projects yet. Add your first project in the Sanity Studio!</p>
            <a href="/studio" className={styles.studioLink}>
              Open Studio →
            </a>
          </div>
        ) : (
          projects.map((project) => {
            const imageUrl = project.image ? urlForImage(project.image) : null;

            return (
              <a
                key={project._id}
                href={project.link || "#"}
                className={styles.card}
                target={project.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                {imageUrl && (
                  <div className={styles.cardImage}>
                    <Image
                      src={imageUrl}
                      alt={project.image.alt || project.title}
                      width={400}
                      height={250}
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <h2>
                    {project.title}
                  </h2>
                  <p>{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className={styles.technologies}>
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className={styles.tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            );
          })
        )}
      </main>
    </div>
  );
}

