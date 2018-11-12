const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const utils = require('./../config/utils')
const packageJsonTmp = require('./../packages/package.json')
const dependenciesTmp = require('./../config/dependencies')
const spawn = require('cross-spawn');

const spinner = ora();
const resolve = (dir) => path.join(__dirname, '..', dir)
const oldPath = process.cwd();

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
  // 获取更新项目下的packageJson
  packageJson = require(packageJsonPath);

  const questions = [
    {
      name: 'upgrade',
      type: 'confirm',
      message: `请确定是否将${chalk.green(packageJson.name)}项目升级到最新版本？\n  1. ${chalk.green('package.json')}中更新\n  2. ${chalk.green('build')}目录更新\n`,
      default: true
    },
    {
      name: 'type',
      type: 'list',
      choices: [
        { name: '无框架依赖', value: 0 },
        { name: 'react 项目', value: 1 },
        { name: 'vue 项目', value: 2 }
      ],
      message: '请选择升级项目类型:',
      default: 0
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
  // 变更Node.js进程的当前工作目录
  process.chdir(appPath);

  const tmp = Object.assign(packageJsonTmp, {
    ...dependenciesTmp[answers.type]
  })
  packageJson = Object.assign(packageJson, tmp)

  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(packageJson, null, 2));
  spinner.succeed('package.json中依赖配置已更新！');

  // 覆盖build目录
  const filterFunc = (src, dest) => utils.filter(src, dest, answers.type)

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
  let command = utils.shouldUseYarn() ? 'yarn' : 'npm'

  const result = spawn.sync(command, ['install'], {
    stdio: 'inherit'
  })
  if (result.status !== 0) {
    console.error(`${command} install failed`);
    return;
  }
  console.log('success')

  console.log();
  console.log(`项目${chalk.green(answers.name)}升级成功! 路径为${chalk.green(appPath)}`);
  console.log('在该项目中, 你可以运行以下命令:');
  console.log();
  console.log(chalk.cyan(`  ${command} run dev`));
  console.log('    启动本地服务进行开发.');
  console.log();
  console.log(chalk.cyan(`  ${command} run build`));
  console.log('    生产环境打包App.');
  console.log();
  console.log('运行下面的命令切换到项目目录开始工作:');
  console.log(`  ${chalk.cyan(`cd ${path.relative(oldPath, appPath)}`)}`);
  console.log(`  ${chalk.cyan(`${command} run dev`)}`);
  console.log();
  console.log('Happy hacking!');
}
