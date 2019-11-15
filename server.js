//server.js
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
// const favicon = require('serve-favicon');

const { createBundleRenderer } = require('vue-server-renderer')
const template = fs.readFileSync("./src/index.template.html", "utf-8")
const bundle =  require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

// 創建一個 renderer
const renderer = createBundleRenderer(bundle, {
  template,
  clientManifest
})

app.use('/dist', express.static(path.join(__dirname, './dist')));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
 

app.get('/favicon.ico', (req, res) => {
  res.end()
})

app.get('/news', (req, res) => {
	res.send("Hello NEWS");
});

//start server
app.get('*', (req, res) => { 
    
  const context = {
    url: req.url,
    title: 'Vue JS - Server Render',
    meta: `
      <meta description="vuejs server side render">
    `
  }

  res.writeHead(200, {
    "Content-Type":"text/html;charset=UTF-8" // 避免亂碼
  })

  renderer.renderToString(context, function (err, html) {
    if(err) {
      if(err.code == 404) {
        res.status(404).end('Page not found')
      }
      else {
        res.status(500).end('Internal Server Error')
      }
    }
    else {
      res.end(html)
    }
  })
  
}); 

let port = (process.env.NODE_ENV == 'development') ? 8889 : 8888;

app.listen(port, function(){
  console.log("Start")
});