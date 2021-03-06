'use strict';

require('dotenv').config();

const fs = require('fs');
// const crypto =require('crypto');

const uploader = require('../lib/aws-s3-upload.js');

// const AWS = require('aws-sdk');

// const s3 = new AWS.S3({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const mimeType = (data) => {
//   return Object.assign({
//     ext: 'bin',
//     mime: 'application/octet-stream',
//   }, fileType(data));
// };

// const randomHexString = (length) => {
//   return new Promise((resolve, reject) => {
//     crypto.randomBytes(length, (error, buffer) => {
//       if (error) {
//         reject(error);
//       }
//
//       resolve(buffer.toString('hex'));
//     });
//   });
// };

let filename = process.argv[2] || '';

const readFile = (filename) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

// const awsUpload = (file) => {
//   return randomHexString(16)
//   .then((filename) => {
//     let dir = new Date().toISOString().split('T')[0];
//   return {
//     ACL: 'public-read',
//     Body: file.data,
//     Bucket: 'jacobhereford',
//     ContentType: file.mime,
//     Key: `${dir}/${filename}.${file.ext}`
//   };
// })
// .then((options) =>{
//
// return new Promise((resolve, reject) => {
//   s3.upload(options, (error, data) => {
//     if(error) {
//       reject(error);
//     }
//
//     resolve(data);
//   });
// });
// });
//   //return options;
// };

readFile(filename)
.then(uploader.prepareFile)
// .then((data) => {
//   let file = mimeType(data);
//   file.data = data;
//   return file;
// })
.then(uploader.awsUpload)
.then(console.log)
//.then((data) => console.log(`${filename} is ${data.length} bytes long`))
.catch(console.error);
