require('dotenv').config();

const htmlmin = require('html-minifier')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
// const esbuild = require("esbuild");
// const { sassPlugin } = require("esbuild-sass-plugin");

module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('env', process.env);
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
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

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

  return {
    dir: {
      input: "src",
      data: "../_data"
    }
  };
};
