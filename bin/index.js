#!/usr/bin/env node

const process = require('process')
const path = require('path')
const yargs = require('yargs')
const chalk = require('chalk')
const ora = require('ora')
const semver = require('semver')
const utils = require('./../config/utils')
const createApp = require('./../src/createApp')
const upgradeApp = require('./../src/upgradeApp')

const spinner = ora();

const currentNodeVersion = process.versions.node
const minNodeVersion = '4.0.0'

let appName;

// node版本判断，支持ES6部分语法
if (semver.lt(currentNodeVersion, minNodeVersion)) {
  spinner.fail(
    `你当前node版本为 ${chalk.red(currentNodeVersion)}。\n  该项目要求node版本必须 ${chalk.cyan(`>= ${minNodeVersion}`)}。\n  请升级你的node！`
  );
  process.exit(1);
}
// 参数处理
const program = yargs
  .usage(`$0 [dir]`, '创建项目', (yargs) => {
    yargs
      .positional('dir', {
        describe: '项目目录'
      })
  }, (argv) => {
    appName = argv.dir
  })
  .option('u', {
    alias: 'upgrade',
    describe: '升级项目到最新版本'
  })
  .version()
  .help()
  .argv;

if (typeof appName === 'undefined') {
  spinner.fail(`请指定要${program.upgrade ? '升级' : '创建'}的项目目录名:`);
  console.log(`  ${chalk.cyan(program.$0)}${chalk.green(' <项目目录>')}`);
  console.log()
  console.log('例如:');
  console.log(`  ${chalk.cyan(program.$0)}${chalk.green(' my-app')}`);
  console.log()
  process.exit(1);
}

if (program.upgrade) {
  upgradeApp(appName)
} else if (!utils.isSafeToCreateProjectIn(path.resolve(appName))) {
  spinner.fail(`该文件夹（${chalk.green(appName)}）已经存在，且存在导致冲突的文件.`);
  console.log('  请使用一个新的文件夹名，或者使用升级命令将项目构建方式升级到最新版本：');
  console.log();
  console.log(`   ${chalk.cyan(program.$0)} ${chalk.green(appName)}${chalk.cyan(' --upgrade')}`);
  console.log();
  process.exit(1);
} else {
  createApp(appName)
}
