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
			theme: 'gray',
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
			toolbarButtons: ['my_dropdown','|', 'alert', 'clear', 'insert'],
			// For more params refer: 'https://www.froala.com/wysiwyg-editor/docs/options'
		},
		buttons:function(){
			$.FroalaEditor.DefineIcon('alert', {NAME: 'info'});
			    $.FroalaEditor.RegisterCommand('alert', {
			      title: 'Hello',
			      focus: false,
			      undo: false,
			      refreshAfterCallback: false,
			      callback: function () {
			        alert('Hello!');
			      }
			    });
			    $.FroalaEditor.DefineIcon('clear', {NAME: 'remove'});
			    $.FroalaEditor.RegisterCommand('clear', {
			      title: 'Clear HTML',
			      focus: false,
			      undo: true,
			      refreshAfterCallback: true,
			      callback: function () {
			        this.html.set('');
			        this.events.focus();
			      }
			    });
			    $.FroalaEditor.DefineIcon('insert', {NAME: 'plus'});
			    $.FroalaEditor.RegisterCommand('insert', {
			      title: 'Insert HTML',
			      focus: true,
			      undo: true,
			      refreshAfterCallback: true,
			      callback: function () {
			        this.html.insert('My New HTML');
			      }
			    });
			$.FroalaEditor.DefineIcon('my_dropdown', {NAME: 'cog'});
	            $.FroalaEditor.RegisterCommand('my_dropdown', {
	              title: 'Advanced options',
	              type: 'dropdown',
	              focus: false,
	              undo: false,
	              refreshAfterCallback: true,
	              options: {
	                'v1': 'Option 1',
	                'v2': 'Option 2'
	              },
	              callback: function (cmd, val) {
	                console.log (val);
	              },
	              // Callback on refresh.
	              refresh: function ($btn) {
	                console.log ('do refresh');
	              },
	              // Callback on dropdown show.
	              refreshOnShow: function ($btn, $dropdown) {
	                console.log ('do refresh when show');
	              }
	            });
        }
	},
	classNames: ['interior'],
	actions: {
		image_beforeUpload:function(e, editor,images){
			console.log(editor);
			console.log(images[0]);
			//return false;
		},
		image_uploaded:function(){

		},
		contentChanged: function() {
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