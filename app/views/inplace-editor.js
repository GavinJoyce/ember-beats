/*Copyright (C) 2013 by Mike Szörnyi and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

var EmberComponents;

EmberComponents = window.EmberComponents = Ember.Namespace.create();

EmberComponents.InplaceField = Ember.View.extend({
  tagName: 'div',
  classNames: ['inplace_field'],
  classNameBindings: ['isEmpty:inplace_empty'],
  isEditing: false,
  isEmpty: (function() {
    return Ember.isEmpty(this.get('content'));
  }).property('content'),
  emptyValue: "Click to add content for this field",
  layout: Ember.computed(function() {
    return Ember.Handlebars.compile(['{{#if view.isEditing}}', '  {{view view.inputField valueBinding="view.content"}}', '{{else}}', '  {{#if view.isEmpty}}', '    {{view.emptyValue}}', '  {{else}}', '    {{#if view.template}}', '      {{yield}}', '    {{else}}', '      {{view.content}}', '    {{/if}}', '  {{/if}}', '{{/if}}'].join('\n'));
  }),
  focusOut: function() {
    return this.set('isEditing', false);
  },
  click: function() {
    return this.set('isEditing', true);
  }
});

EmberComponents.FocusSupport = Ember.Mixin.create({
  didInsertElement: function() {
    return this.$().focus();
  }
});

EmberComponents.InplaceTextArea = EmberComponents.InplaceField.extend({
  inputField: Ember.TextArea.extend(EmberComponents.FocusSupport)
});

EmberComponents.InplaceTextField = EmberComponents.InplaceField.extend({
  type: 'text',
  inputField: Ember.TextField.extend(EmberComponents.FocusSupport)
});
