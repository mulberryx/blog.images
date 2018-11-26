/**
 * ali oss
 * @author Philip
 */

const fs = require("fs")
const AliOss = require("ali-oss")

module.exports = {
  /**
   * 获取阿里云 Oss 实例
   * @return {AliOss} 阿里云 Oss SDK 实例
   */
  getClient () {
    var config = this.getConfig()
    var client = null

    if (config) {
      client = new AliOss(config.ali_oss)
    }
    
    return client
  },

  /**
   * 获取部署配置
   * @return {object} 部署配置
   */
  getConfig () {
    let config = null
    
    try {
      config = JSON.parse(fs.readFileSync(".deploy.json", "utf8"))
    } catch (err) {
      console.error(err)
    }
    
    return config
  },
  
  /**
   * 上传
   * @param {string} 要上传的文件路径
   * @return none
   */
  async upload (objectname, filepath) {
    const client = this.getClient()
    const config = this.getConfig()
    
    try {
      return await client.put(objectname, filepath)
    } catch (err) {
      console.error(err)
    }
  }
}
