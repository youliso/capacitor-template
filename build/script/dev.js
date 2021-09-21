const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

async function start() {
  let port = 0;
  try {
    port = fs.readFileSync(path.resolve('.port'), 'utf8');
  } catch (e) {
    throw 'not found .port';
  }
  const config = require('./webpack.config')('development');
  const options = {
    host: 'localhost',
    port: port,
    hot: true,
    liveReload: false,
    historyApiFallback: true,
    static: path.resolve('dist')
  };
  const compiler = webpack(config);
  const server = new webpackDevServer(options, compiler);
  server.start();
}

start().then();