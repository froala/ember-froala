# Ember-froala

Ember component for FroalaWysiwygEditor.
Fully customizable wysiwyg editor for emberjs. Create a new buttons and intergrate into your ember application. Post images images and html to your own server. 

## Installation

- `ember install ember-froala`
- Copy fonts folder from `bower_components/font-awesome` and paste it into `public` folder

## Example

See [demo app source](https://github.com/ajackus/ember-froala/tree/master/tests/dummy/app) for example usage.

* Component example
```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  value: 'test',

  froalaEditor: {
    params: {
      toolbarInline: true,
      placeholderText: 'Enter..'
        // For more params refer: 'https://www.froala.com/wysiwyg-editor/docs/options'
    },
  },

  actions: {
  // For more events refer: 'https://www.froala.com/wysiwyg-editor/docs/events'
    contentChanged: function(event, editor) {
      console.log("Content Changed");
      console.log(event);
      console.log(editor);
    },
    focus: function(event, editor) {
      console.log("Focus");
      console.log(event);
      console.log(editor);
    },
  },
});
```

* Template example

```hbs
{{froala-editor params=froalaEditor.params value=value focus=(action "focus") contentChanged=(action "contentChanged")}}
```
**Mapping nested events**
Nested events use underscores to trigger their respective Froala events.

 - Nested Event example for image.uploaded 
   (https://www.froala.com/wysiwyg-editor/docs/events#image.uploaded)
```hbs
{{froala-editor params=froalaEditor.params image_uploaded=(action "image_uploaded")}}
```

 - Nested Event example for imageManager.beforeDeleteImage
   (https://www.froala.com/wysiwyg-editor/docs/events#imageManager.beforeDeleteImage)
```hbs
{{froala-editor params=froalaEditor.params imageManager_beforeDeleteImage=(action "imageManager_beforeDeleteImage")}}
```
### Concepts:
**Save button**

 - Template Example

```hbs
{{froala-editor params=froalaEditor.params value=value focus=(action "focus") contentChanged=(action "contentChanged")}}
<button {{action 'save'}}>Save</button>
```
* Component example
```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  value: 'test',

  froalaEditor: {
    params: {
      toolbarInline: true,
      placeholderText: 'Enter..'
        // For more params refer: 'https://www.froala.com/wysiwyg-editor/docs/options'
    },
  },

  actions: {
  // For more events refer: 'https://www.froala.com/wysiwyg-editor/docs/events'
	save: function(){
		console.log("Content Saved");
		$('.froalaEditor').froalaEditor('save.save');
	},
    contentChanged: function(event, editor) {
      console.log("Content Changed");
      console.log(event);
      console.log(editor);
    },
    focus: function(event, editor) {
      console.log("Focus");
      console.log(event);
      console.log(editor);
    },
  },
});
```
**Create custom button**

 - Template Example

```hbs
{{froala-editor params=froalaEditor.params  customButtons=froalaEditor.buttons}}
```
* Component example
```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  value: 'test',

  froalaEditor: {
    params: {
      toolbarInline: true,
      placeholderText: 'Enter..',
      toolbarButtons: ['my_dropdown','|', 'alert', 'clear', 'insert']
        // For more params refer: 'https://www.froala.com/wysiwyg-editor/docs/options'
    },
    buttons:function(){
			$.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
			    $.FroalaEditor.RegisterCommand('alert', {
			      title: 'Hello',
			      focus: false,
			      undo: false,
			      refreshAfterCallback: false,
			      callback: function () {
			        alert('Hello!');
			      }
			    });
			    $.FroalaEditor.DefineIcon('clear', {NAME: 'remove'});
			    $.FroalaEditor.RegisterCommand('clear', {
			      title: 'Clear HTML',
			      focus: false,
			      undo: true,
			      refreshAfterCallback: true,
			      callback: function () {
			        this.html.set('');
			        this.events.focus();
			      }
			    });
			    $.FroalaEditor.DefineIcon('insert', {NAME: 'plus'});
			    $.FroalaEditor.RegisterCommand('insert', {
			      title: 'Insert HTML',
			      focus: true,
			      undo: true,
			      refreshAfterCallback: true,
			      callback: function () {
			        this.html.insert('My New HTML');
			      }
			    });
			$.FroalaEditor.DefineIcon('my_dropdown', {NAME: 'cog'});
	            $.FroalaEditor.RegisterCommand('my_dropdown', {
	              title: 'Advanced options',
	              type: 'dropdown',
	              focus: false,
	              undo: false,
	              refreshAfterCallback: true,
	              options: {
	                'v1': 'Option 1',
	                'v2': 'Option 2'
	              },
	              callback: function (cmd, val) {
	                console.log (val);
	              },
	              // Callback on refresh.
	              refresh: function ($btn) {
	                console.log ('do refresh');
	              },
	              // Callback on dropdown show.
	              refreshOnShow: function ($btn, $dropdown) {
	                console.log ('do refresh when show');
	              }
	            });
        }
  }
});
```
### Please Note:
The `value` is only for the initial value of the field.
It will not be updated when the user changes the text.
If the underlying value changes while the component is active, the editor will not reflect the change.
In order to get the values that the user changes, you will need to listen to the
`contentChanged` action.


* Including a plugin example:

Include the plugin in your ember-cli-build.js

```
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
     emberFroala: {
      fontAwesome: true,
      theme: 'gray',
      lang: 'en_us',
      plugins: [
        'block_styles',
        'char_counter', 
        'colors', 'entities',
        'file_upload',
        'font_family',
        'font_size',
        'fullscreen',
        'inline_styles',
        'lists',
        'media_manager',
        'tables',
        'urls',
        'video'
      ]
    }
  });

  return app.toTree();
};
```

## License

The `ember-froala` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).
