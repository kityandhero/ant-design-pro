const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      proxy: {
        '/api': {
          // target: 'http://sys.pa.com/',
          target: 'http://test.pa.9gms.net/',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  },
  // externals: {
  //   '@antv/data-set': 'DataSet',
  //   bizcharts: 'BizCharts',
  //   rollbar: 'rollbar',
  // },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
