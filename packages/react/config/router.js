import Loadable from "react-loadable";
import Routes from './routes'
import Loading from '../components/common/loading'

export const getRouterData = type => Routes[type].map(item => ({
  path: item.path,
  exact: item.exact ? true : false,
  component: Loadable({
    loader: () => import(`../${item.directory}.jsx`).then(object => object.default),
    loading: Loading
  })
}))
