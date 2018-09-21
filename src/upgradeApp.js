const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const utils = require('./../config/utils')
const packageJsonTmp = require('./../packages/package.json')
const dependenciesTmp = require('./../config/dependencies')

const spinner = ora();
const resolve = (dir) => path.join(__dirname, '..', dir)

let appPath, answers, packageJson;

module.exports = (appName) => {
  appPath = path.resolve(appName)

  if (!fs.existsSync(appPath)) {
    spinner.fail(`${chalk.red(appPath)} 不存在`)
    console.log('  请使用创建命令创建项目');
    process.exit(1);
  }

  let packageJsonPath = path.resolve(appPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    spinner.fail(`项目目录下${chalk.red('package.json')}不存在！`)
    console.log('  请选择正确的项目');
    process.exit(1);
  }

  packageJson = require(packageJsonPath);

  const questions = [
    {
      name: 'upgrade',
      type: 'confirm',
      message: `请确定是否将${chalk.green(packageJson.name)}项目升级到最新版本？\n  1. ${chalk.green('package.json')}更新\n  2. ${chalk.green('build')}目录更新`,
      default: true
    }
  ]

  inquirer
  .prompt(questions)
  .then(a => {
    answers = a
    if (answers.upgrade) {
      upgradeApp(appPath, appName)
    } else {
      spinner.fail('项目升级取消！');
    }
  });
}

const upgradeApp = (appPath, appName) => {
  let appType = 0;
  if (packageJson.dependencies.react) appType = 1;
  if (packageJson.dependencies.vue) appType = 2;

  // 覆盖package.json相关依赖
  let newDep = dependenciesTmp[appType]
  packageJson.dependencies = Object.assign(packageJson.dependencies, newDep.dependencies)
  packageJson.devDependencies = Object.assign(packageJson.devDependencies, newDep.devDependencies)
  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(packageJson, null, 2));
  spinner.succeed('package.json中依赖配置已更新！');

  // 覆盖build目录
  const filterFunc = (src, dest) => utils.filter(src, dest, appType)

  fs.copySync(resolve('packages/build'), path.resolve(appPath, 'build'), {
    overwrite: true,
    filter: filterFunc
  });

  let buildPath = path.join(appPath, 'build')
  utils.fileModify(buildPath, answers.type)

  // 安装相关依赖
  install(appPath, appName)
}

const install = (appPath, appName) => {

}
