import Ember from 'ember';
import layout from '../templates/components/froala-editor';

export default Ember.Component.extend({
    layout: layout,

    tagName: 'div',
    _froala: null,
    // Context-aware configurations fetched from template, passed in at initialization
    /*params: {
        allowedAttrs: *,
        allowedBlankTags: *,
        allowedFileTypes: *,
        allowedImageTypes: ['jpeg', 'jpg', 'png', 'gif'],
        allowedTags: *,
        allowScript: false,
        allowStyle: false,
        alwaysBlank: false,
        allowComments: false,
        allowHTML: true,
        alwaysVisible: false,
        autosave: false,
        autosaveInterval: 10000,
        beautifyCode: true,
        blockStyles: {},
        blockStylesToggle: true,
        blockTags: *,
        buttons: *,
        colorGroups: *,
        colors: *,
        colorsStep: 7,
        convertMailAddresses: true,
        countCharacters: true,
        crossDomain: true,
        customButtons: {},
        customDropdowns: {},
        customImageButtons: {},
        customText: {},
        defaultBlockStyle: {'f-italic': 'Italic', 'f-typewriter': 'Typewriter', 'f-spaced': 'Spaced', 'f-uppercase': 'Uppercase'},
        defaultColorGroup: 'foreColor',
        defaultImageAlignment: 'center',
        defaultImageDisplay: 'block',
        defaultImageTitle: 'Image title',
        defaultImageWidth: 300,
        defaultTag: 'p',
        defaultVideoAlignment: 'center',
        direction: 'ltr',
        disableRightClick: false,
        doNotJoinTags: ["a"],
        editInPopup: false,
        editorClass: '',
        fileUploadParam: 'file',
        fileUploadParams: {},
        fileUploadURL: 'http://i.froala.com/upload',
        fontList: *,
        formatTags: *,
        fullPage: false,
        headers: {},
        height: 'auto',
        iconClasses: ['fa-'],
        icons: {},
        imageButtons: *,
        imageDeleteConfirmation: true,
        imageDeleteParams: {},
        imageDeleteURL: '',
        imageLink: true,
        imageMove: true,
        imageTitle: true,
        imageResize: false,
        imageUpload: true,
        imageUploadParam: 'file',
        imageUploadParams: {},
        imageUploadToS3: {},
        imageUploadURL: 'http://i.froala.com/upload',
        imagesLoadParams: {},
        imagesLoadURL: 'http://i.froala.com/images',
        inlineMode: true,
        inlineStyles: {},
        initOnClick: false,
        language: 'en_us',
        linkAttributes: {},
        linkAutoPrefix: '',
        linkClasses: {},
        linkList: [],
        linkText: false,
        maxCharacters: -1,
        maxFileSize: 1024 * 1024 * 10,
        maxHeight: 'auto',
        maxImageSize: 1024 * 1024 * 10,
        mediaManager: true,
        minHeight: 'auto',
        multiLine: true,
        noFollow: true,
        paragraphy: true,
        pasteImage: true,
        pastedImagesUploadRequestType: 'POST',
        pastedImagesUploadURL: 'http://i.froala.com/upload_base64',
        placeholder: 'Type Something',
        plainPaste: false,
        preloaderSrc: '',
        saveParam: 'body',
        saveParams: {},
        saveRequestType: 'POST',
        saveURL: '',
        scrollableContainer: 'body',
        selfClosingTags: *,
        shortcuts: true,
        shortcutsAvailable: *,
        showNextToCursor: false,
        simpleAmpersand: false,
        spellcheck: false,
        tabSpaces: true,
        textNearImage: true,
        textNearVideo: true,
        theme: '',
        toolbarFixed: true,
        trackScroll: false,
        typingTimer: 500,
        unlinkButton: true,
        unsupportedAgents: /Opera Mini/i,
        useClasses: true,
        useFileName: true,
        useFrTag: false,
        videoAllowedAttrs: *,
        videoAllowedTags: *,
        videoButtons: *,
        width: 'auto',
        withCredentials: false,
        zIndex: 2000
    },*/

    params: {},
    value: null,

    didInsertElement: function() {
        var froala = this.$().editable(this.get('params'));
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
