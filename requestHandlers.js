// var exec = require('child_process').exec
var querystring = require('querystring')
var fs = require('fs')
var formidable = require('formidable')

function start (res) { // PREVIOUSLY: function start (res, postData)
  console.log('Request handler "start" was called.')

  var body =
    `<html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body>
        <form action="/upload" enctype="multipart/form-data" method="post">
          <input type="file" name="upload" />
          <input type="submit" value="Upload file" />
        </form>
      </body>
    </html>`

  // var body =
  //   `<html>
  //     <head>
  //       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  //     </head>
  //     <body>
  //       <form action="/upload" method="post">
  //         <textarea name="text" rows="20" cols="60"></textarea>
  //         <input type="submit" value="Submit text" />
  //       </form>
  //     </body>
  //   </html>`

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(body)
  res.end()

  // exec('ls -lah', function (error, stdout, stderr) {
  //   if (error) console.error(error)
  //   res.writeHead(200, {'Content-Type': 'text/plain'})
  //   res.write(stdout)
  //   res.end()
  // })
}

function upload (res, req) { // PREVIOUSLY: function upload (res, postData)
  console.log('Request handler "upload" was called.')

  var form = new formidable.IncomingForm()
  console.log('about to parse')
  form.parse(req, function (error, fields, files) {
    if (error) console.error(error)
    console.log('parsing done')

    // Possible error when trying to rename a file that already exists
    fs.rename(files.upload.path, '/tmp/test.png', function (error) {
      if (error) {
        fs.unlink('/tmp/test.png')
        fs.rename(files.upload.path, '/tmp/test.png')
      }
    })

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('received image:<br/>')
    res.write('<img src="/show" />')
    res.end()
  })

  // res.writeHead(200, {'Content-Type': 'text/plain'})
  // res.write('You\'ve sent: ' + querystring.parse(postData).text)
  // res.end()
}

function show (res) {
  console.log('Request handler "show" was called.')
  res.writeHead(200, {'Content-Type': 'image/png'})
  fs.createReadStream('/tmp/test.png').pipe(res)
}

module.exports.start = start
module.exports.upload = upload
module.exports.show = show
