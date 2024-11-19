/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    logger: {
      warn: () => {},
      debug: () => {},
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
