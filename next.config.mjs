/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		HUME_API_KEY: process.env.HUME_API_KEY,
		HUME_SECRET_KEY: process.env.HUME_SECRET_KEY,
	},
};

export default nextConfig;
