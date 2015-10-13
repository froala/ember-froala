import Ember from 'ember';

export default Ember.Controller.extend({
    value: 'test',

    froalaEditor: {
      params: {
        inlineMode: true,
        placeholder: 'Enter..',
        allowHTML: true,
        autosave: true,
        autosaveInterval: 10000,
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
