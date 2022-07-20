module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://epic-nginx:8000/:path*', // Proxy to Backend
      },
    ];
  },
};
