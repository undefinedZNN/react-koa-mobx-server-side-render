import { action, observable } from 'mobx'

class Count {
  @observable
  count = 0

  @observable
  oldVal = 0

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
