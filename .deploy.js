/**
 * 部署配置
 * @author Philip
 */

module.exports = {
  name: 'deploy',
  project: 'deploy',
  type: 'self',
  ali_oss: {
    accessKeyId: 'LTAI2PBQSdfLOUme',
    accessKeySecret: 'uMuFXEuK06PGTEmHRiFCvoCNtgx8nb',
    bucket: 'raddeana',
    region: 'oss-cn-beijing'
  },
  publish: 'npm run publish'
}
