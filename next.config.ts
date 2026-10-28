import type {NextConfig} from 'next';

// Allow self-signed TLS certs when calling local backend in development only
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [{ pathname: '/assets/img/**' }],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.nevaobjects.id',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    'https://9000-firebase-studio-1769597153934.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev',
  ],
};

export default nextConfig;
