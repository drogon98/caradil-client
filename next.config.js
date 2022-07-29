/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/tours",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/weddings",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/list-your-car",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/register",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/faqs",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/contact-us",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/about-us",
        destination: "/maintenance",
        permanent: false,
      },
      {
        source: "/policies",
        destination: "/maintenance",
        permanent: false,
      },
    ];
  },
};
