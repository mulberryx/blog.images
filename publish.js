/**
 * ali oss
 * @author Philip
 */

const fs = require("fs")
const AliOss = require("ali-oss")

const config = {
  name: 'materials',
  description: 'blog materials libs',
  ali_oss: {
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: ''
  },
}

/**
 * 遍历文件夹
 * @param {string} 文件夹路径
 * @param {function} 处理函数
 * @return none
 */
async function ergodicFolder (folderPath, handler) {
  let files = fs.readdirSync(folderPath)
  
  for (let i = 0, len = files.length; i < len; i++) {
      let fof = files[i]
      let stat = fs.lstatSync(folderPath + '/' + fof)

      if (stat.isDirectory() === true) { 
          await ergodicFolder(folderPath + '/' + fof, handler)
      } else {
          await handler(fof, folderPath + '/' + fof)
      }
  }
}

/**
 * 获取阿里云 Oss 实例
 * @return {AliOss} 阿里云 Oss SDK 实例
 */
function getClient () {
  let config = this.getConfig()
  let client = null

  if (config) {
    client = new AliOss(config.ali_oss)
  }
  
  return client
}

/**
 * 上传
 * @param {string} 要上传的文件路径
 * @return none
 */
async function upload (objectName, filepath) {
  let client = getClient()
  
  try {
    return await client.put(objectName, filepath)
  } catch (err) {
    console.error(err)
  }
}

// 遍历 font 文件目录
ergodicFolder('font', (fof, filepath) => {
  fof = fof.replace(/(ttf|otf|ttc)/, '')

  upload(fof, filepath)
})

// 遍历图片文件目录
ergodicFolder('images', (fof, filepath) => {
  fof = fof.replace(/(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp)/, '')

  upload(fof, filepath)
})