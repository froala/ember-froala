/* jshint node: true */
'use strict';
var path = require('path'),util = require('util'),extend = util._extend;
var defaultOptions = {
  	fontAwesome: true,
	theme: 'red',
	lang: 'en_us',
	plugins: [
        'align','char_counter','code_beautifier','code_view','colors','emoticons','entities','file','font_family','font_size','fullscreen','image','image_manager','inline_style','line_breaker','link','lists','paragraph_format','paragraph_style','quote','save','table','url','video'
    ]
};
module.exports = {
  name: 'ember-froala',
  included: function(app) {
    this._super.included(app);
    //REQUIRED IMPORT INFORMATION.
    app.import(app.bowerDirectory + '/froala-wysiwyg-editor/css/froala_editor.min.css');
    app.import(app.bowerDirectory + '/froala-wysiwyg-editor/css/froala_style.min.css');
    app.import(app.bowerDirectory + '/froala-wysiwyg-editor/js/froala_editor.min.js');
    var options = extend(defaultOptions, app.options['emberFroala']);
    var validCSSPlugins = ['char_counter','code_view', 'colors', 'emoticons', 'file', 'fullscreen', 'image_manager', 'image', 'line_breaker', 'table', 'video'];
    //IMPORTING FONT AWESOME
    if(options.fontAwesome){
    	app.import(app.bowerDirectory + '/font-awesome/css/font-awesome.css');
    }
    //HANDLES THE THEME OPTION
    if(options.hasOwnProperty('theme') && options.theme !== 'custom'){
    	app.import(app.bowerDirectory + '/froala-wysiwyg-editor/css/themes/'+options.theme+'.min.css');
    }else if(!options.hasOwnProperty('theme')){
    	app.import(app.bowerDirectory + '/froala-wysiwyg-editor/css/themes/gray.min.css');
    }
    //ADDING LANGUAGES OTHER THAN ENGLISH
    if(options.hasOwnProperty('lang') && options.lang !== 'en_us'){
    	app.import(app.bowerDirectory + '/froala-wysiwyg-editor/js/languages/'+options.lang+'.js');
    }
    //ADDING PLUGINS
    if(options.hasOwnProperty('plugins') && options.plugins.length>0){
    	options.plugins.map(function(name) {
    		if(validCSSPlugins.indexOf(name)>-1){
    			app.import(app.bowerDirectory + '/froala-wysiwyg-editor/css/plugins/'+name+'.min.css');
    		}
    		app.import(app.bowerDirectory + '/froala-wysiwyg-editor/js/plugins/'+name+'.min.js');
    	});
    }
  }
};
