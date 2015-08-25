import Ember from 'ember';
import layout from '../templates/components/froala-editor';

export default Ember.Component.extend({
    layout: layout,

    tagName: 'div',
    _froala: null,
    params: {},
    value: null,

    didInsertElement: function() {
        var _this = this,
            froala = this.$().editable(this.get('params')),
            events = this.get('events');

        this.$().editable('setHTML', this.get('value') || '', false);

        for (var key in events) {
            _this.$().on('editable.'+key, Ember.$.proxy(events[key], this));
        }
        this.set('_froala', froala);
    },

    willDestroyElement: function() {
        if (this.get('_froala')) {
            this.$().editable('destroy');
        }
    }
});

