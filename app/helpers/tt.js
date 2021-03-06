/**
 * Extends `ember-i18n` `t` helper by using translation prefix provided by
 * passed component object (which should implement `mixin:components/i18n`).
 *
 * Example of usage:
 * If the using component is extended with `mixin:components/i18n`,
 * and `i18nPrefix` is set to "components.contentProviderRedirect":
 * ```
 * {{tt this "error" providerName="some provider"}}
 * ```
 * it will render translation for `components.contentProviderRedirect.error`
 * with `{provierName: "some provider"}` interpolation.
 * 
 * @module helpers/tt
 * @author Jakub Liput
 * @copyright (C) 2018-2019 ACK CYFRONET AGH
 * @license This software is released under the MIT license cited in 'LICENSE.txt'.
 */

import t from 'ember-i18n/helper';
import { typeOf } from '@ember/utils';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

export default t.extend({
  /**
   * Extends `ember-i18n` `t` helper.
   * Uses translation prefix provided by passed component object.
   * 
   * @param {Array<any>} helperArgs contains helper args:
   *   {Ember.Object} component typically an Ember.Component
   *     that uses `mixin:i18n`
   *   {string} component.a specific key of translation - will be appended
   *     to `tPrefix` of component
   *   {object} contextObject for original `t` helper
   * @param {Object} interpolations
   * @returns {SafeString}
   */
  compute([component, key, contextObject], interpolations) {
    assert(
      'helper:tt: first argument should be set to parent component',
      typeOf(component) === 'instance'
    );
    return this._super(
      [
        get(component, 'tPrefix') + key,
        contextObject,
      ],
      interpolations,
    );
  },
});
