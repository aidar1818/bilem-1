const path = require('path');

const rootPath = __dirname;

let port = 8000;
let dbUrl = 'mongodb://localhost/bilem';

if (process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://localhost/bilem-test';
    port = 8010
}

module.exports = {
    port,
    corsWhiteList: [
        'http://localhost:4200',
        'https://localhost:4200',
        'http://localhost:4210',
        'https://localhost:4210',
    ],
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: dbUrl,
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '407104017926294',
        appSecret: '37dabe6f4c7654de10b8791d4cb8a1a1'
    },
};
