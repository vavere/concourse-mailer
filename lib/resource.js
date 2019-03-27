const nodemailer = require('nodemailer');

module.exports = {

  check: async function({source, version} = {}) {
    return [];
  },
  
  in: async function({source, params, version = {}} = {}, dest) {
    return {version};
  },
  
  out: async function({source, params} = {}, dest) {
    if (!source || !source.host) throw new Error('ERROR: incomplete source!');
    if (source.debug) console.debug = console.log;

    params = Object.assign(params || {}, source.defaults);
    if (!params.from || !params.to) throw new Error('ERROR: incomplete params!');
    
    console.log(`sending mail to ${params.to} via ${source.host}`);
    console.debug(source)
    const transporter = nodemailer.createTransport(source);
    console.debug(params)
    const info = await transporter.sendMail(params);
    console.log(info.response);
    console.debug(info)
    const ref = Date.now().toString(16).slice(-8);
    return {version: {ref}}
  }

};


