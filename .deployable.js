/**
 * 部署配置
 * @author muffin
 */

module.exports = {
  contents: [{
    portal: "./dist/fonts",
    type: "font",
  }, {
    portal: "./dist/images",
    type: "image",
  }],
  dependencies: [],
  portals: false,
  build: "optimize",
  manifest: "./dist/manifest.json",
}
