const Model = require('../../models');
const Jwt = require('jsonwebtoken');
const Boom = require('boom');
const secret = require('../secret');
const verifyPassword = require('../helpers/verifyPassword');

const loginPayloadValidation = require('../validations/userLogin');


function createToken(user) {
  return Jwt.sign({
    username: user.userName,
    userid: user.userId,
  }, secret.secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}


const route = [{
  method: 'POST',
  path: '/login',
  config: {
    tags: ['api'],
    description: 'Log user in',
    notes: 'log user in',
    validate: {
      payload: loginPayloadValidation,
    },
    auth: false,
  },
  handler: (request, reply) => {
    const {
      password,
      userName,
    } = request.payload;
    return Model.bankusers.findOne({
      where: {
        userName,
      },
    })
      .then(user => verifyPassword(password, user.password).then((isTrue) => {
        if (isTrue) {
          return reply({
            statusCode: 201,
            message: 'Logged In',
          }).header('token', createToken(user));
        }
        return reply(Boom.badRequest('Please check password')).header('token', null);
      })).catch(() => reply(Boom.badRequest('Please check user name')).header('token', null));
  },
},
];

module.exports = route;
