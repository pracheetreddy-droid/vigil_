const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';

if (isGithubActions) {
  const repository = process.env.GITHUB_REPOSITORY || '';
  repo = repository.split('/')[1] || '';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubActions && repo ? `/${repo}` : '',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
