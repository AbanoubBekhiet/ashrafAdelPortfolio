export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ashrafadel.com'; // Adjust to your real domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
