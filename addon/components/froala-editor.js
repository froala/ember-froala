import Ember from 'ember';
import layout from '../templates/components/froala-editor';

export default Ember.Component.extend({
    layout: layout,

    tagName: 'div',
    _froala: null,
    inlineMode: false,
    placeholder: 'Enter',
    value: null,
    allowHTML: true,
    allowBlank: true,

    getConfig: function() {
        var appConfig = this.container.lookup('config:environment');
        return appConfig && appConfig.get('froala-editor') || {};
    },

    didInsertElement: function() {
        var froala = this.$().editable({
                inlineMode: this.get('inlineMode'),
                placeholder: this.get('placeholder'),
                value: this.get('value'),
                buttons:[],
                imageUploadToS3: this.getConfig().imageUploadToS3
            });

        this.$().editable('setHTML', this.get('value') || '', false);

        this.$().on('editable.blur', Ember.$.proxy(this.onFocusOut, this));

        this.set('_froala', froala);
    },

    onFocusOut: function() {
        if (!this.get('allowBlank')) {
            var text = this.get('allowHTML') ? this.$().editable('getHTML', true, true) : this.$().editable('getText');

            if (text && text.trim().length > 0) {
                this.set('value', text); 
            } else {
                this.$().editable('setHTML', this.get('value'));
            }
        } else {
            if (this.get('allowHTML')) {
                this.set('value', this.$().editable('getHTML', true, true)); 
            } else {
                this.set('value', this.$().editable('getText')); 
            }
        }
    },

    willDestroyElement: function() {
        if (this.get('_froala')) {
            this.$().editable('destroy');
        }
    }
});
