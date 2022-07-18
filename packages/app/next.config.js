/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
	cssLoaderOptions: {
		url: false,
	},
});
