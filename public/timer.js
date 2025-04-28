class Timer {
  /** Array of functions waiting to be executed.
   * @type {Array<{func: Function, delay: int, id: int}>} */
  #operations = [];
  /**The next free ID number*/
  #nextId = 0;
  tick() {
    this.#operations.forEach((operation, index) => {
      operation.delay--;
      //execute if delay has run out
      if (operation.delay < 0) {
        operation.func();
        this.#operations.splice(index, 1);
      }
    });
  }
  /**
   * Adds a delayed function.
   * @param {function} func Function to call, after the delay.
   * @param {int} delay The delay, in frames. Zero means the same frame.
   */
  addOperation(func, delay) {
    this.#operations.push({
      func: func,
      delay: delay,
      id: this.#nextId,
    });
    //Increment the ID
    this.#nextId++;
    //Return the id used
    return this.#nextId - 1;
  }
  /**
   * Cancels an operation.
   * @param {int} id Identifier of the coperation to cancel
   */
  cancelOperation(id) {
    //Remove all operations with the specified id (should only be one)
    this.#operations = this.#operations.filter((x) => x.id !== id);
  }
  /** Cancels all operations. */
  cancelAll() {
    this.#operations = [];
  }
  /** Does the timer has any operations left? */
  get hasQueued() {
    return this.#operations.length > 0;
  }
  /** The number of operations the timer has queued.
  */
  get operations(){
    return this.#operations.length;
  }
}
