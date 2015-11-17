import Ember from 'ember';
import layout from '../templates/components/froala-editor';
const { isFunction, proxy } = Ember.$;

export default Ember.Component.extend({
    layout: layout,

    tagName: 'div',
    _froala: null,
    params: {},
    value: null,
    eventNames: [
      'blur'
      'buttons.refresh'
      'charCounter.exceeded'
      'charCounter.update'
      'commands.after'
      'commands.before'
      'contentChanged'
      'destroy'
      'file.beforeUpload'
      'file.inserted'
      'file.unlink'
      'file.uploaded'
      'file.uploadedToS3'
      'focus'
      'html.afterGet'
      'html.beforeGet'
      'html.get'
      'html.set'
      'image.beforePasteUpload'
      'image.beforeRemove'
      'image.beforeUpload'
      'image.error'
      'image.inserted'
      'image.loaded'
      'image.removed'
      'image.replaced'
      'image.resize'
      'image.resizeEnd'
      'image.uploaded'
      'image.uploadedToS3'
      'imageManager.beforeDeleteImage'
      'imageManager.error'
      'imageManager.imageDeleted'
      'imageManager.imageLoaded'
      'imageManager.imagesLoaded'
      'initialized'
      'link.bad'
      'paste.after'
      'paste.afterCleanup'
      'paste.before'
      'paste.beforeCleanup'
      'popups.hide.[id]'
      'save.after'
      'save.before'
      'save.error'
      'snapshot.after'
      'snapshot.before'
      'toolbar.hide'
      'toolbar.show'
      'video.codeError'
      'video.inserted'
      'video.linkError'
      'video.removed'
      'video.beforeRemove'
    ],

    didInsertElement: function() {
        var froala = this.$().froalaEditor(this.get('params')),
            events = this.get('eventNames');

        const froalaElement = this.$();
        froalaElement.froalaEditor('html.set', this.get('value') || '', false);

        events.forEach((key) => {
          if(this.attrs[key]) {
            froalaElement.on('froalaEditor.' + key, proxy(this.handleFroalaEvent, this));
          }
        });

        this.set('_froala', froala);
    },

    handleFroalaEvent: function(event, editor) {
      const eventName = event.namespace;
      const actionHandler = this.attrs[eventName];
      if(isFunction(actionHandler)) {
        actionHandler(event, editor);
      } else {
        this.sendAction(eventName, event, editor);
      }
    },

    willDestroyElement: function() {
        if (this.get('_froala')) {
            this.$().froalaEditor('destroy');
        }
    }
});

