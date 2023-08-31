/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
	experimental: {
		serverActions: true,
	},
	headers: [
		{
			key: "cross-origin-opener-policy",
			value: "same-origin",
		},
		{
			key: "cross-origin-embedder-policy",
			value: "require-corp",
		},
	],
};

export default withPlaiceholder(nextConfig);
