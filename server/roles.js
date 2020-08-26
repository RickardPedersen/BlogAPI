const AccessControl = require('accesscontrol');
const ac = new AccessControl();

ac.grant('anon')
    .createOwn('user')

ac.grant('user')
    .createOwn('post')
    .createOwn('comment')
    .readOwn('post')
    .readOwn('comment')
    .readOwn('user')
    .updateOwn('post')
    .updateOwn('comment')
    .updateOwn('user')
    .deleteOwn('post')
    .deleteOwn('comment')

ac.grant('admin')
    .extend('user')
    .readAny('post')
    .readAny('comment')
    .readAny('user')
    .updateAny('post')
    .updateAny('comment')
    .updateAny('user')
    .deleteAny('post')
    .deleteAny('comment')


