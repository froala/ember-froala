# Ember-froala

Ember component for FroalaWysiwygEditor

## Installation

- `ember install ember-froala`
- Copy fonts folder from `bower_components/font-awesome` and paste it into `public` folder

## Example

See [demo app source](https://github.com/ajackus/ember-froala/tree/master/tests/dummy/app) for example usage.

* Controller example
```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
  value: 'test',

  froalaEditor: {
    params: {
      toolbarInline: true,
      placeholderText: 'Enter..'
        // For more params refer: 'https://www.froala.com/wysiwyg-editor/docs/options'
    },
  },

  actions: {
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
  });
  //include the lists plugin
  app.import('bower_components/FroalaWysiwygEditor/js/plugins/lists.min.js');

  return app.toTree();
};
```

## License

The `ember-froala` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).
