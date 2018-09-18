const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const semver = require('semver');
const chalk = require('chalk');

const packageJsonTmp = require('./../packages/package.json')
const dependenciesTmp = require('./../config/dependencies')

module.exports = (name) => {
  // 初始化根目录
  let root = path.resolve(name)
  let questions = [
    {
      name: 'name',
      message: '请输入项目名称:',
      default: name,
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
    .then(answers => {
      creatApp (answers)
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
    fs.ensureDirSync(root);
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
  }
}
