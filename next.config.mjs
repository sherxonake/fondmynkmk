import createNextIntlPlugin from 'next-intl/plugin';
 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
 
const remotePatterns = [
  {
    protocol: "https",
    hostname: "fondnkmk.uz",
    pathname: "/wp-content/uploads/**",
  }
];
 
if (supabaseUrl) {
  remotePatterns.push({
    protocol: "https",
    hostname: "*.supabase.co",
    pathname: "/storage/v1/object/public/**",
  });
}
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns,
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
      {
        source: '/api/admin/:path*',
        destination: '/api/admin/:path*',
      },
    ];
  },
};
 
export default withNextIntl(nextConfig);