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
        appId: '298585782430692',
        appSecret: 'a9f65879f5adf3b48cf60c534a404d20'
    },
};
