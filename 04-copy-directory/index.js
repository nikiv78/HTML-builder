const fs = require('fs')
const path = require('path')


const dirName = path.resolve(__dirname, 'files')

const newDirName = path.join(__dirname, 'files-copy')

fs.rm(newDirName, { recursive: true, force: true }, () => {
  fs.mkdir(newDirName, { recursive: true }, error => {
    if (error) console.log(error)
  })
  copyFromFolderToFolder(dirName, newDirName)
})


function copyFromFolderToFolder(fromFolder, toFolder) {
  fs.readdir(fromFolder, { withFileTypes: true}, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      data.forEach((e) => {
        if (e.isDirectory()) {
          fs.mkdir(
            path.resolve(toFolder, e.name),
            {recursive: true},
            (error) => {if (error) console.log(error)
            }
          )
          copyFromFolderToFolder(
            path.resolve(fromFolder, e.name),
            path.resolve(toFolder, e.name)
          )
        } 
        else {
          fs.createReadStream(
            path.resolve(fromFolder, e.name), 'utf-8'
          ).pipe(fs.createWriteStream(path.resolve(toFolder, e.name)))
        }
      }
      )
    }
  }
  )}


