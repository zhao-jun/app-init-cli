import { observable, action, runInAction } from 'mobx';

class homeStore {
  @observable title = "Welcome to use app-init-cli";

  // 修改文本
  @action updateText(text) {
    self.title = text;
  }
}

const self = new homeStore()
export default self;
