/* jshint node: true */
'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  }
  ENV.contentSecurityPolicy = {
    'default-src': "*",
    'script-src': "*", // Allow scripts from https://cdn.mxpnl.com
    'font-src': "*", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "*", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
    'img-src': "*",
    'style-src': "*", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
    'media-src': "*",
    'frame-src':"*"
  };
  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
  return ENV;
};
