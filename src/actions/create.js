const inquirer = require('inquirer');
const chalk = require('chalk');
const isDirExist = require('../utils/isDirExists.js');
const template = require('./methods/cloneTemplate')
const createTemplates = [{
    name: 'Koa2.js + Jwt',
    description: 'Koa2 basic template',
}, {
    name: 'Express + Jwt',
    description: 'Express basic template',
}, {
    name: 'Nest.js + Jwt',
    description: 'Nest basic template',
}]
const create = async (ProjectName) => {
    let isDirExistRes = await isDirExist(ProjectName)
    if (isDirExistRes) {
        console.log(chalk.redBright(`\n项目文件夹 ${ProjectName} 已存在，请更换项目名称\n`));
    } else {
        inquirer
            .prompt([
                {
                    type: 'rawlist',
                    name: 'projectType',
                    message: chalk.yellowBright('请选择项目类型'),
                    choices: createTemplates.map(item => item.name)
                }
            ])
            .then((answers) => {
                chooseTemplate(answers.projectType, ProjectName);
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            });
    }
}

function chooseTemplate(answerName, ProjectName) {
    switch (answerName) {
        case 'Koa2.js + Jwt':
            template.cloneTemplate('koa2-jwt-template', answerName, ProjectName);
            break;
        case 'Express.js + Jwt':
            noTemplate(answerName);
            break;
        case 'Nest.js + Jwt':
            noTemplate(answerName);
            break;
    }
}
function noTemplate(answerName) {
    console.log(`\n暂无 ${chalk.redBright(answerName)} ，请选择其他选项\n`);
}
module.exports = create