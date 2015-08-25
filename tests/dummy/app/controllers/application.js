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

        events: {
            'blur' : function() { return alert('focusOut'); },
            'focus' : function() { return alert('focused'); },
            'contentChanged': function() { return alert('contentChanged'); },
            'align': function() { return alert('aligned'); },
            'afterPaste': function() { return alert('content pasted'); }
            // For more events: 'https://www.froala.com/wysiwyg-editor/docs/events'
        }
    }
    
});