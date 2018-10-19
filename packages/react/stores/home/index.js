import { observable, action, runInAction } from 'mobx';
import {getHomeList} from '../../service/home'

class homeStore {
  @observable title = "";

  // 修改文本
  @action updateText(text) {
    self.title = text;
  }

  // 获取客户
  @action async getHomeList() {
    // if (!commonStore.loading) commonStore.loading = true
    let data = await getHomeList()
    runInAction(() => {
        self.title = data.title
        // commonStore.loading = false
    })
  }
}

const self = new homeStore()
export default self;
