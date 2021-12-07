module.exports = {
  plugins: {
    /*     'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
    'postcss-pxtorem': {
      // 常规下应该是按照设计稿750的宽度/10 赋值给rootValue，但是咱们项目用的是vant，是按照37.5设计的啊， 所以在适配时候设计稿的尺寸/2
      // rootValue可以是number也可以是function
      rootValue ({ file }) {
        return file.includes('vant') ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
