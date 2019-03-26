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
    
    console.log(`sending mail to: ${params.to}`);
    console.debug(source)
    const transporter = nodemailer.createTransport(source);
    console.debug(params)
    const info = await transporter.sendMail(params);
    console.debug(info)
    const metadata = Object.entries(info).map(([name, value]) => ({name, value}));
    return {ref: String(Date.now()), metadata};
  }

};


