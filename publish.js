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
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI2PBQSdfLOUme',
    accessKeySecret: 'uMuFXEuK06PGTEmHRiFCvoCNtgx8nb',
    bucket: 'raddeana-materials'
  },
}

const filtersReg = /(\.DS_Store|\.gitkeep)/

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
          await ergodicFolder(`${folderPath}/${fof}`, handler)
      } else {
          await handler(`${folderPath}/${fof}`, `${folderPath}/${fof}`)
      }
  }
}

/**
 * 获取阿里云 Oss 实例
 * @return {AliOss} 阿里云 Oss SDK 实例
 */
function getClient () {
  return new AliOss(config.ali_oss)
}

/**
 * 上传
 * @param {string} 要上传的文件路径
 * @return none
 */
function upload (objectName, filepath) {
  let client = getClient()
  
  try {
    return client.put(objectName, filepath)
  } catch (err) {
    console.error(err)
  }
}

// 遍历 font 文件目录
ergodicFolder('fonts', (fof, filepath) => {
  if (!filtersReg.test(fof)) {
    console.info(`start upload task: ${fof} to ${filepath}`)
    upload(fof, filepath).then(() => {
      console.info(`finish upload task: ${fof} to ${filepath}`)
    }, (err) => {
      console.info(err)
    })
  }
})

// 遍历图片文件目录
ergodicFolder('images', (fof, filepath) => {
  if (!filtersReg.test(fof)) {
    console.info(`start upload task: ${fof} to ${filepath}`)
    upload(fof, filepath).then(() => {
      console.info(`finish upload task: ${fof} to ${filepath}`)
    }, (err) => {
      console.info(err)
    })
  }
})