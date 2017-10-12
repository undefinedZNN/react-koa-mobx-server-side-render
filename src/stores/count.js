import { action, observable } from 'mobx'

class Count {
  @observable
  count = 10

  @observable
  oldVal = 2

  @action
  increment() {
    self.count++
  }

  @action
  decrement() {
    self.count--
  }

  @action
  setValue(val) {
    self.count = val
  }
}
const self = new Count()
export default self
