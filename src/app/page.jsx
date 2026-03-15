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

    if (!page) {
      return <h1>No page data found</h1>;
    }

    return (
      <div>
        {(page.sections || []).map((section, idx) => {
          const Component = componentMap[section.type];
          if (!Component) return null;
          return <Component key={idx} {...section} />;
        })}
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Error:</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }
}
