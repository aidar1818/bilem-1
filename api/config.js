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
        appId: '407104017926294',
        appSecret: '37dabe6f4c7654de10b8791d4cb8a1a1'
    },
};
