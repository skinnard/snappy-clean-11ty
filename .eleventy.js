const htmlmin = require('html-minifier')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const esbuild = require("esbuild");
// const { sassPlugin } = require("esbuild-sass-plugin");

module.exports = function(eleventyConfig) {
  /**
   * Upgrade helper
   * Uncomment if you need help upgrading to new major version.
   */
  //eleventyConfig.addPlugin(UpgradeHelper);

  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('vendor')

  /**
   * HTML Minifier for production builds
   */
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_ENV == 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  // eleventyConfig.on("afterBuild", () => {
  //   return esbuild.build({
  //     entryPoints: ["src/css/style.scss", "src/js/main.js"],
  //     outdir: "_site",
  //     minify: process.env.ELEVENTY_ENV === "production",
  //     sourcemap: process.env.ELEVENTY_ENV !== "production",
  //     plugins: [sassPlugin()]
  //   });
  // });
  // eleventyConfig.addWatchTarget("src/css/");
  // eleventyConfig.addWatchTarget("src/js/");

  return {
    dir: {
      input: "src",
      data: "../_data"
    }
  };
};
