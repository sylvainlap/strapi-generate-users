'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');

/**
 * Authenticated policy
 */

exports.authenticated = function *(next) {

  // Get and verify JWT via service.
  try {
    let user = yield strapi.modules.user.services.jwt.getToken(this, true);

    // Store user id to request object.
    this.user = yield User.findOne(user.id).populate('roles');

    // We delete the token from query and body to not mess.
    this.request.query && delete this.request.query.token;
    this.request.body && delete this.request.body.token;

    // User is authenticated.
    yield next;
  } catch (error) {
    this.status = 401;
    return this.body = {
      message: 'You are not allowed to perform this action.'
    };
  }
};
