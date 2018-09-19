const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const semver = require('semver');
const chalk = require('chalk');

const packageJsonTmp = require('./../packages/package.json')
const dependenciesTmp = require('./../config/dependencies')

const resolve = (dir) => path.join(__dirname, '..', dir)
let answers;

module.exports = (appName) => {
  // 初始化根目录
  let appPath = path.resolve(appName)
  let questions = [
    {
      name: 'name',
      message: '请输入项目名称:',
      default: appName,
      validate: input => !!input || '该字段不能为空'
    },
    {
      name: 'version',
      message: '请输入项目版本号:',
      default: '0.0.1',
      validate: input => semver.valid(input) ? true : `${chalk.cyan(input)} 不是一个有效的版本号`
    },
    {
      name: 'description',
      message: '请输入项目描述:'
    },
    {
      name: 'main',
      message: '请输入项目入口:',
      default: "index.js"
    },
    {
      name: 'author',
      message: '请输入项目所属者（组织）的名字:',
      validate: input => !!input || '该字段不能为空'
    },
    {
      name: 'type',
      type: 'list',
      choices: [
        { name: '无框架依赖', value: 0 },
        { name: 'react 项目', value: 1 },
        { name: 'vue 项目', value: 2 }
      ],
      message: '请选择项目框架:',
      default: 0
    }
  ]
  inquirer
    .prompt(questions)
    .then(a => {
      answers = a
      creatApp(answers)
    });

  creatApp = (answers) => {
    // 生产package.json
    let packageJson = {
      "name": answers.name,
      "version": answers.version,
      "description": answers.description,
      "main": answers.main,
      "scripts": packageJsonTmp.scripts,
      "author": answers.author,
      "license": packageJsonTmp.license,
      ...dependenciesTmp[answers.type]
    }
    fs.ensureDirSync(appPath);
    fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(packageJson, null, 2));

    console.log('即将安装package依赖，这将花费几分钟时间...');
    console.log();
    run(appPath, appName)
  }
}

const filterFunc = (src, dest) => {
  if (src.includes(resolve('packages/node_modules')) || src.includes(resolve('packages/dist'))) return false

  if (answers.type === 0 && (src.includes(resolve('packages/vue')) || src.includes(resolve('packages/react')))) return false
  // react项目
  if (answers.type === 1 && src.includes(resolve('packages/vue'))) return false
  // vue项目
  if (answers.type === 2 && src.includes(resolve('packages/react'))) return false
  return true
}

const run = (appPath, appName) => {
  process.chdir(appPath);

  let packagePath = resolve('packages')
  if (fs.existsSync(packagePath)) {
    fs.copySync(packagePath, appPath, { filter: filterFunc });
  }

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  try {
    fs.moveSync(
      path.join(appPath, 'gitignore'),
      path.join(appPath, '.gitignore'),
      []
    );
  } catch (err) {
    // Append if there's already a `.gitignore` file there
    if (err.code === 'EEXIST') {
      const data = fs.readFileSync(path.join(appPath, 'gitignore'));
      fs.appendFileSync(path.join(appPath, '.gitignore'), data);
      fs.unlinkSync(path.join(appPath, 'gitignore'));
    } else {
      throw err;
    }
  }
  // 根据项目类型生成相应的webpack
  {
    let buildPath = path.join(appPath, 'build')
    let files = fs.readdirSync(buildPath)
    let regex;
    switch (answers.type) {
      case 1:
        regex = /(\/\/\s(vue|dev)-start[\s\S]*?\/\/\s(vue|dev)-end\s+)|(\/\/\s(react-start|react-end)\s+)/g
        break;
      case 2:
        regex = /(\/\/\s(react|dev)-start[\s\S]*?\/\/\s(react|dev)-end\s+)|(\/\/\s(vue-start|vue-end)\s+)/g
        break;
      default:
        regex = /\/\/\s(vue|react|dev)-start[\s\S]*?\/\/\s(vue|react|dev)-end\s+/g
    }
    files.forEach(file => {
      let data = fs.readFileSync(path.join(buildPath, file));
      data = data.toString().replace(regex, '')
      fs.writeFileSync(path.join(buildPath, file), data);
    })
  }

  // 修改文件名
  if (fs.existsSync(path.join(appPath, 'vue'))) fs.renameSync(path.join(appPath, 'vue'), path.join(appPath, 'src'))
  if (fs.existsSync(path.join(appPath, 'react'))) fs.renameSync(path.join(appPath, 'react'), path.join(appPath, 'src'))

}
