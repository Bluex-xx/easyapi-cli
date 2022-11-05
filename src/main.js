const commander = require('commander');
const path = require('path')
const versionTips = require('./actions/copyright')
const commandList = {
    name: 'create',
    type: '<ProjectName>',
    alias: 'c',
    descripition:"create koa template"
}
let actions = require(path.resolve(__dirname,`./actions/${commandList.name}`));
commander.version('1.0.0');
commander.command(commandList.name)
        .action(actions)
        .alias(commandList.alias)
        .description(commandList.descripition)
        .argument(commandList.type);
commander.command('copyright').action(versionTips).description('something wrong');        
commander.parse(process.argv);   

     