const { readdir, stat } = require('fs');
const path = require('path');
const dirPath = path.resolve(__dirname, 'secret-folder')



readdir(dirPath, { withFileTypes: true }, (error, data) => {
  if (error) {
    console.log(error)
    return
  } 
  data.forEach((e) => {
    if (e.isFile()) {
      const [name, ext] = [
        path.parse(e.name).name,
        path.parse(e.name).ext
      ]
      stat(path.join(dirPath, e.name), (error, stats) => {
        if (error) return console.log(error.message)
        const size = stats.size
        console.log(`${name} - ${ext.slice(1)} - ${(size / 1024)} kb`)
      })
    }
  })
})