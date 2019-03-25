const nodemailer = require('nodemailer');

module.exports = async function resource(mode, input, dest) {
  if (!input || !input.source)
    throw new Error('ERROR: wrong input format');

  if (input.source.debug) console.debug = console.log;
  console.debug(input);

  switch (mode) {
      case 'check': return await do_check(input.source, input.version);
      case 'in': return await do_in(input.source, input.params, input.version, dest);
      case 'out': return await do_out(input.source, input.params, dest);
      default:
        throw new Error('ERROR: unknown access mode');
  }
};

// CHECK
async function do_check(source) {
  return [];
}

// IN
async function do_in(source, params, version, dest) {
  return version || {};
}

// OUT
async function do_out(source, params, dest) {
  if (!params || !params.to)
    throw new Error('ERROR: wrong params format');
  const transporter = nodemailer.createTransport(source);
  const info = await transporter.sendMail(params);
  console.debug(info);
  return {version: Date.now()};
}

