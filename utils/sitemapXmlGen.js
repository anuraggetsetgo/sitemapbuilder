const fs = require('fs')
const xml = require('xml')

 function buildSiteMapXML(outputFilename, pages, hostname) {
  //Preparing Object from pages
  const temp_xmlObj = {
    urlset: [
      //eg <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {
        _attr: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
        }
      },

      // For every page from the DB, generate a <url> object
      ...pages.map((page) => {
        return {
          // <url>
          url: [
            // <loc>http://www.example.com/</loc>
            { loc: hostname + page.slug },
            // <lastmod>2005-01-01</lastmod>
            { lastmod: page.lastModified },
            // <changefreq>monthly</changefreq>
            { changefreq: 'monthly' },
            // <priority>0.8</priority>
            { priority: 1 },
            //<slug></slug>
          ]
        }
      })
    ]
  }
  fs.writeFileSync(outputFilename, '<?xml version="1.0" encoding="UTF-8"?>' + xml(temp_xmlObj))    // XML the file to disk
console.log('done')


}
module.exports = {buildSiteMapXML}