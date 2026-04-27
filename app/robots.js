export default function robots() {
  const baseUrl = 'https://ashrafadel.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'], 
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}