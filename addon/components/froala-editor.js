import Ember from 'ember';
import layout from '../templates/components/froala-editor';
const { isFunction, proxy } = Ember.$;

export default Ember.Component.extend({
    layout: layout,
    classNames: ['froalaEditor'],
    tagName: 'div',
    _froala: null,
    params: {},
    value: null,
    didInsertElement: function() {
        var froala = this.$().froalaEditor(this.get('params')),
            events = this.get('eventNames');

        const froalaElement = this.$();
        froalaElement.froalaEditor('html.set', this.get('value') || '', false);
        for(var prop in this.attrs){
          if(prop !='params') {
            var key = prop.replace(/_/g,".");           
            froalaElement.on('froalaEditor.' + key, proxy(this.handleFroalaEvent, this));
          }
        }
        this.set('_froala', froala);
    },

    handleFroalaEvent: function(event, editor) {
      var events = this.get('eventNames');
      const eventName = event.namespace;
      const reverseEventName = eventName.replace(/\./g,"_");
      if(isFunction(actionHandler)) {
        actionHandler(event, editor);
      } else {
        this.sendAction(reverseEventName, event, editor);
      }
    },
    willDestroyElement: function() {
        if (this.get('_froala')) {
            this.$().froalaEditor('destroy');
        }
    }
});

