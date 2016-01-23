
module.exports = {
  description: '',
  normalizeEntityName: function() {},
  afterInstall: function(options) {
    var that = this;

    return this.addBowerPackageToProject('froala-wysiwyg-editor').then(function() {
      return that.addBowerPackageToProject('font-awesome');
    });

  }

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
