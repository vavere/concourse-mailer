const nodemailer = require('nodemailer');

module.exports = {

  check: async function({source, version} = {}) {
    return [];
  },
  
  in: async function({source, params, version} = {}, dest) {
    return version || {};
  },
  
  out: async function({source, params} = {}, dest) {
    if (!source || !source.host) throw new Error('ERROR: incomplete source!');
    if (!params || !params.to) throw new Error('ERROR: incomplete params!');
    if (source.debug) console.debug = console.log;

    console.log(`sending mail to ${params.to} via ${source.host}`);
    console.debug(source)
    const transporter = nodemailer.createTransport(source);
    console.debug(params)
    const info = await transporter.sendMail(params);
    console.log(info.response);
    console.debug(info)
    return {ref: Date.now().toString(16).slice(-8)};
  }

};


