const axios = require('axios');
const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
function cloneTemplate(templateName, descriptionName, ProjectName) {
    axios.get('https://api.github.com/users/Bluex-xx/repos').then(res => {
        res.data.forEach(item => {
            if (item.name == templateName) {
                const spinner = ora(`Downloadinging ${templateName}`).start();
                download("direct:" + item.clone_url, ProjectName, { clone: true }, (err) => {
                    spinner.stop();
                    fs.access(path.resolve(process.cwd(), ProjectName), fs.constants.F_OK, (err) => {
                        if (err) {
                            cloneTemplateFailed(ProjectName);
                        } else {
                            fs.readdir(path.resolve(process.cwd(), ProjectName), {
                                encoding: 'utf-8'
                            }, (err, files) => {
                                if (files.length == 0) {
                                    cloneTemplateFailed(ProjectName);
                                } else {
                                    console.log(chalk.greenBright(`\n create project successfully✨✨`));
                                    console.log(chalk.green(`\n1. cd ${ProjectName}`));
                                    console.log(chalk.green(`\n2. npm install `));
                                    console.log(chalk.green(`\n3. Execute project startup command`));
                                }
                            })
                        }
                    });
                })
            }
        });
    })
}
function cloneTemplateFailed(ProjectName) {
    console.log(chalk.redBright(`\n项目创建失败，请检查网络设置并重试\n`));

    inquirer.prompt({
        type: 'confirm',
        message: '是否重试？',
        name: 'isRetry',
        default: true
    })
        .then((answers) => {
            if (answers.isRetry) {
                if (isDirExist(ProjectName)) {
                    fs.rmdir(path.resolve(process.cwd(), ProjectName), (err) => {
                        create(ProjectName);
                    })
                }
            } else {
                console.log(`\n你可以检查网络设置后手动重试\n`);
            }
        })
}
module.exports = {cloneTemplate,cloneTemplateFailed}