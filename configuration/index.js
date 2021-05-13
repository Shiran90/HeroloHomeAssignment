
const nconf = require('nconf');

// use file configuration first, then take values from env if available.
const configFilePath = `${__dirname}\\config.json`
nconf.env().file({ file:configFilePath });


const configuration = {
    database_conecting_string: nconf.get('database_conecting_string')
};
console.log(JSON.stringify(configuration, null, 2))

module.exports  = configuration;