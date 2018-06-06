import Filter from "../../action-input/filter/Filter.js";

/**
 */
export default class ClickFilter extends Filter {
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
    return [null, null];
  }
}
