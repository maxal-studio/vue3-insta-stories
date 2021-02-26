module.exports = {
	configureWebpack: {
		output: {
			libraryExport: "default",
		},
		resolve: {
			symlinks: false,
		},
	},
	publicPath:
		process.env.NODE_ENV === "production" ? "/vue3-insta-stories/" : "/",
	css: {
		extract: false,
	},
};
