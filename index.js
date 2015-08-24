/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-froala',
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/FroalaWysiwygEditor/css/froala.style.min.css');
    app.import(app.bowerDirectory + '/FroalaWysiwygEditor/js/froala.editor.min.js');
  }
};
