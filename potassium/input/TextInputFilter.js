import Filter from "../../action-input/filter/Filter.js";

import Component from '../Component.js'

/**
 * TextInputFilter TBD
 */
export default class TextInputFilter extends Filter {
  constructor() {
    super();
  }

  /**
   * @param {string} inputPath
   * @param inputValue
   * @param {string} filterPath
   * @param {Object} filterParameters parameters for use while filtering
   *
   * @return {Array} [value, actionParameters]
   */
  filter(inputPath, inputValue, filterPath, filterParameters) {
    if(!inputValue) return [null, null]
    return [true, { value: inputValue }];
  }
}
