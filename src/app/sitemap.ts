import type { MetadataRoute } from 'next';

const BASE_URL =
process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://moket.fr';

// Active ces flags quand les routes existent réellement pour éviter les 404
const ENABLE_BLOG = false;        // /blog et /blog/[slug]

const NOW = new Date();

// Helpers
function entry(path: string, changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'], priority: number, lastModified: Date = NOW): MetadataRoute.Sitemap[0] {
return {
url: `${BASE_URL}${path}`,
lastModified,
changeFrequency,
priority,
};
}



function dedupe(list: MetadataRoute.Sitemap) {
const seen = new Set<string>();
return list.filter((e) => {
if (seen.has(e.url)) return false;
seen.add(e.url);
return true;
});
}



// Optionnel: blog — adapte la méthode de fetch à ta stack (FS, CMS, Supabase…)
async function fetchBlogEntries(): Promise<MetadataRoute.Sitemap> {
try {
// Exemple minimaliste (à remplacer par un vrai fetch de tes slugs)
// const res = await fetch(${BASE_URL}/api/blog-slugs, { next: { revalidate: 3600 } });
// const slugs: string[] = await res.json();

const slugs: string[] = []; // placeholder
const items: MetadataRoute.Sitemap = [
  entry('/blog', 'weekly', 0.6),
  ...slugs.map((slug) => entry(`/blog/${slug}`, 'monthly', 0.5)),
];
return items;
} catch {
// En cas d’échec, on ne casse pas le sitemap
return [];
}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
const staticRoutes: MetadataRoute.Sitemap = [
entry('/', 'weekly', 1.0),

];

// Blocs optionnels
const blog = ENABLE_BLOG ? await fetchBlogEntries() : [];

// Fusion + dédoublonnage
return dedupe([...staticRoutes, ...blog]);
}