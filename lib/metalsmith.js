const config = require('./../config/metalsmith');
const debug = require('./debug');
const Metalsmith = require('metalsmith');
const ignore = require('metalsmith-ignore');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const metaData = require('metalsmith-metadata');
const moveUp = require('metalsmith-move-up');
const sitemap = require('metalsmith-mapsite');

// import handlebars helpers
const helpers = require('./handlebars-helpers');

// invoke necessary handlebars helpers here
helpers.ifModulus();

// metalsmith build
module.exports = (callback) => {
  Metalsmith(config.src)
    .clean(config.clean)
    .use(metaData(config.metaData))
    .use(ignore(config.ignore))
    .use(markdown(config.markdown))
    .use(layouts(config.layouts))
    .use(moveUp(config.transforms))
    .destination(config.dest)
    // TODO pass 'true' to debug to console
    .use(debug(false))
    .use(sitemap(config.sitemap))
    .build((err) => {
      if (err) return callback(err);
      return callback(null);
    });
};
