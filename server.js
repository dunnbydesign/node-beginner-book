var http = require('http')
var url = require('url')

function start (route, handle) {
  var server = http.createServer(function (req, res) {
    // var postData = ''
    var pathname = url.parse(req.url).pathname
    console.log('Request for ' + pathname + ' received.')
    route(handle, pathname, res, req)

    // req.setEncoding('utf8')

    // req.addListener('data', function (postDataChunk) {
    //   postData += postDataChunk
    //   console.log('Received POST data chunk "' + postDataChunk + '".')
    // })

    // req.addListener('end', function () {
    //   route(handle, pathname, res, postData)
    // })

    // res.writeHead(200, {'Content-Type': 'text/plain'})
    // res.write('Hello World')
    // res.end()
  })

  server.listen(8888)
  console.log('Server has started.')
}

module.exports.start = start
