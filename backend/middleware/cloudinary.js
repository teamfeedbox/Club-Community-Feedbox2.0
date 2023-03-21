const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'feedbox-community-web',
  api_key: '686381213319472',
  api_secret: 'Un53tuDFktDhVEz_gbl7Jnx2jDY',
  allowed_formats: ['pdf'],
});

module.exports = cloudinary;