import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  async rewrites() {
    const apiHost = process.env.API_HOST
    const apiPort = process.env.API_PORT

    if (!apiHost || !apiPort) {
      throw new Error('API_HOST and API_PORT environment variables are required')
    }

    const apiUrl = `http://${apiHost}:${apiPort}`

    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
