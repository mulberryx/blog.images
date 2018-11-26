/**
 * 部署配置
 * @author muffin
 */

module.exports = {
  contents: [{
    portal: "./prod/fonts",
    type: "font",
  }, {
    portal: "./prod/images",
    type: "image",
  }],
  dependencies: [],
  portals: false,
  build: "optimize",
  manifest: "./prod/manifest.json",
}
