const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'feedbox-community-web',
  api_key: '686381213319472',
  api_secret: 'Un53tuDFktDhVEz_gbl7Jnx2jDY',
  allowed_formats: ['pdf','doc','docx'],
});

module.exports = cloudinary;