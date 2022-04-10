
const db = require('./utils/dbutils')
const sm = require('./utils/sitemapXmlGen')


const pages = [
  {
    url: "www.google.com",
    title: "Sample Page One",
    created: "Dec 22 2020",
    slug: "sample-page-one",
  },
  {
    url: "www.google.com",
    title: "Sample Page Two",
    created: "Feb 1 2021",
    lastModified: "Feb 2 2021",
    slug: "sample-page-two",
  },
  {
    url: "www.google.com",
    title: "Sample Page Three",
    created: "Mar 2 2021",
    lastModified: "Mar 5 2021",
    slug: "sample-page-three",
  },
  {
    url: "www.google.com",
    title: "Sample Page Four",
    created: "Mar 20 2021",
    slug: "sample-page-four",
  },
];




// db.executeSQLQuery('SELECT * FROM seo_master').then(pages => 
//   sm.buildSiteMapXML("./sitemap.xml",JSON.parse(pages), "http://getsetgo.fitness/"))



  sm.buildSiteMapXML("./sitemap.xml",pages, "http://getsetgo.fitness/")