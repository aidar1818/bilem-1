const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/bilem',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '671747847382650',
        appSecret: 'd58eb70c06f2dbf495b3f15503985e9f'
    },
};
