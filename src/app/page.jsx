import { notFound } from "next/navigation";
import { Hero } from "../components/Hero.jsx";
import { Stats } from "../components/Stats.jsx";
import { getPageFromSlug } from "../utils/content.js";

const componentMap = {
  hero: Hero,
  stats: Stats,
};

export default async function ComposablePage() {
  try {
    const page = await getPageFromSlug("/");

    // If page does not exist
    if (!page) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Page Not Found</h1>
        </div>
      );
    }

    return (
      <div data-sb-object-id={page.id}>
        {(page.sections || []).map((section, idx) => {
          const Component = componentMap[section.type];

          // If component type not found, skip it
          if (!Component) return null;

          return <Component key={idx} {...section} />;
        })}
      </div>
    );
  } catch (error) {
    console.error("Error loading page:", error);

    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Something went wrong</h1>
      </div>
    );
  }
}
