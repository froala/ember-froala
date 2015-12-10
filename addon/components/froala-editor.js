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
      {'blur':'blur'},
      {'buttonsRefresh':'buttons.refresh'},
      {'charCounterExceeded':'charCounter.exceeded'},
      {'charCounterUpdate':'charCounter.update'},
      {'commandsAfter':'commands.after'},
      {'commandsBefore':'commands.before'},
      {'contentChanged':'contentChanged'},
      {'destroy':'destroy'},
      {'fileBeforeUpload':'file.beforeUpload'},
      {'fileInserted':'file.inserted'},
      {'fileUnlink':'file.unlink'},
      {'fileUploaded':'file.uploaded'},
      {'fileUploadedToS3':'file.uploadedToS3'},
      {'focus':'focus'},
      {'htmlAfterGet':'html.afterGet'},
      {'htmlBeforeGet':'html.beforeGet'},
      {'htmlGet':'html.get'},
      {'htmlSet':'html.set'},
      {'imageBeforePasteUpload':'image.beforePasteUpload'},
      {'imageBeforeRemove':'image.beforeRemove'},
      {'imageBeforeUpload':'image.beforeUpload'},
      {'imageError':'image.error'},
      {'imageInserted':'image.inserted'},
      {'imageLoaded':'image.loaded'},
      {'imageRemoved':'image.removed'},
      {'imageReplaced':'image.replaced'},
      {'imageResize':'image.resize'},
      {'imageResizeEnd':'image.resizeEnd'},
      {'imageUploaded':'image.uploaded'},
      {'imageUploadedToS3':'image.uploadedToS3'},
      {'imageManagerBeforeDeleteImage':'imageManager.beforeDeleteImage'},
      {'imageManagerError':'imageManager.error'},
      {'imageManagerImageDeleted':'imageManager.imageDeleted'},
      {'imageManagerImageLoaded':'imageManager.imageLoaded'},
      {'imageManagerImagesLoaded':'imageManager.imagesLoaded'},
      {'initialized':'initialized'},
      {'linkBad':'link.bad'},
      {'pasteAfter':'paste.after'},
      {'pasteAfterCleanup':'paste.afterCleanup'},
      {'pasteBefore':'paste.before'},
      {'pasteBeforeCleanup':'paste.beforeCleanup'},
      {'popupsHide_[key]':'popups.hide.[id]'},//need to be a dynamic property
      {'saveAfter':'save.after'},
      {'saveBefore':'save.before'},
      {'saveError':'save.error'},
      {'snapshotAfter':'snapshot.after'},
      {'snapshotBefore':'snapshot.before'},
      {'toolbarHide':'toolbar.hide'},
      {'toolbarShow':'toolbar.show'},
      {'videoCodeError':'video.codeError'},
      {'videoInserted':'video.inserted'},
      {'videoLinkError':'video.linkError'},
      {'videoRemoved':'video.removed'},
      {'videoBeforeRemove':'video.beforeRemove'}
    ],

    didInsertElement: function() {
        var froala = this.$().froalaEditor(this.get('params')),
            events = this.get('eventNames');

        const froalaElement = this.$();
        froalaElement.froalaEditor('html.set', this.get('value') || '', false);

        events.forEach((key) => {
          for(var option in key){
            if(this.attrs[option]) {
              froalaElement.on('froalaEditor.' + key[option], proxy(this.handleFroalaEvent, this));
            }
          }
        });

        this.set('_froala', froala);
    },

    handleFroalaEvent: function(event, editor) {
      var events = this.get('eventNames');
      const eventName = event.namespace;
      events.forEach((key) => {
        for(var option in key){
          if(this.attrs[option]) {
            if(eventName===key[option]){
              const actionHandler = this.attrs[option];
              if(isFunction(actionHandler)) {
                actionHandler(event, editor);
              } else {
                this.sendAction(option, event, editor);
              }
            }
          }
        }
      });
    },

    willDestroyElement: function() {
        if (this.get('_froala')) {
            this.$().froalaEditor('destroy');
        }
    }
});

