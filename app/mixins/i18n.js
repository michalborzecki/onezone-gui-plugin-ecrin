/**
 * The mixin adds a `t` method to facilitate use of translation function
 * using i18n service.
 * You should override `i18nPrefix` property to path of component locale.
 * A prefix can be used with or without trailing dot.
 *
 * @module mixins/i18n
 * @author Jakub Liput
 * @copyright (C) 2018-2019 ACK CYFRONET AGH
 * @license This software is released under the MIT license cited in 'LICENSE.txt'.
 */

import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({
  i18n: service(),

  /**
   * @virtual
   * @type {string}
   */
  i18nPrefix: undefined,

  /**
   * Generates ready-to-use translation prefix (adds dot if lacks, etc.)
   * Should not be changed - instead set `i18nPrefix`.
   * @type {Ember.Computed<string>}
   */
  tPrefix: computed('i18nPrefix', function getTPrefix() {
    /** @type {string} */
    const i18nPrefix = this.get('i18nPrefix');
    if (i18nPrefix) {
      return i18nPrefix.endsWith('.') ? i18nPrefix : i18nPrefix + '.';
    } else {
      return '';
    }
  }).readOnly(),

  /**
   * Translate text using i18n service, using optional i18nPrefix
   * @param {string} translationKey
   * @param {object} placeholders
   * @returns {string} string translated by 18n service 
   */
  t(translationKey, placeholders = {}) {
    const {
      i18n,
      tPrefix,
    } = this.getProperties('i18n', 'tPrefix');
    return i18n.t(tPrefix + translationKey, placeholders);
  },

  /**
   * Alias to `t` method.
   * @param {string} translationKey
   * @param {object} placeholders
   * @returns {string}
   */
  tt() {
    return this.t(...arguments);
  },
});
