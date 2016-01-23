import Ember from 'ember';

export default Ember.Component.extend({
	froalaEditor: {
		params: {
			key: '1rscspnxtxpqiohbF4fij==',
			toolbarInline: false,
			placeholderText: 'Body Content for blog Post',
			charCounterCount: true,
			charCounterMax: 5000,
			codeBeautifier: true,
			codeMirror: true,
			theme: 'red',
			disableRightClick: true,
			fontFamily: {
				'Roboto,Helvetica,sans-serif': 'Font 1'
			},
			fontFamilySelection: false,
			fontSizeSelection: false,
			htmlAllowComments: false,
			paragraphFormatSelection: false,
			requestWithCORS: true,
			inlineMode: false,
			imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL', 'imageManager'],
			toolbarButtons: ['bold', 'italic', 'underline','align','formatOL', 'formatUL', 'outdent', 'indent','insertLink','insertTable','insertImage','emoticons','undo', 'redo', 'clearFormatting', 'selectAll','html'],
			toolbarButtonsXS: ['bold', 'italic', 'underline']
			// For more params refer: 'https://www.froala.com/wysiwyg-editor/docs/options'
		},
		buttons:['hello']
	},
	classNames: ['interior'],
	actions: {
		image_beforeUpload:function(e, editor,images){
			console.log(editor);
			console.log(images[0]);
			//return false;
		},
		image_uploaded:function(event, editor){
			var prop = this;
		},
		contentChanged: function(event, editor) {
			console.log("content Changed baby");
		}
	},
	didInsertElement: function() {
	    window.scrollTo(0,0);

	},
	willDestroyElement: function() {
    },
	parentViewDidChange : function(){
		this.rerender();
	}
});