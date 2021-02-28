import react, {PureComponent} from 'react';
import { Menu, Icon} from '@/components/Library';
import Navlink from 'umi/navlink';
import withRouter from 'umi/withRouter'
import store from 'store';
import { pathMatchRegexp } from '@/utils';
import styles from './SiderMenu.less'

const { SubMenu } = Menu;
class SilderMenu extends PureComponent {
  constructor(props){
    super(props)
    this.state ={
      openKeys: store.get('openKeys') || [],
      permissionList: [1, 2, 3, 4, 5]  // 模拟后台权限
    }
  }

  componentDidMount() {
    console.log(localStorage.getItem('openKeys'));
  }

  renderMenus(menuList) {
    return menuList.map(item => {
      if (item.routes && item.routes.length > 0) {
        return (
          <SubMenu
            key={item.id}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
           {this.renderMenus(item.routes)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Navlink to={item.path || '#'}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Navlink>
        </Menu.Item>
      )
    })
  }

  render () {
    const {routeList} = this.props;
    const {openKeys} = this.state;
    const {pathname} = this.props.location;
    const selectedKeys = this.queryAncestors(routeList, pathname).map(_ => _.id + '')
    return (
        <Menu
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          onOpenChange={this.onOpenChange}
          selectedKeys={selectedKeys}
          // style={{ width: 256 }}
        >
          {this.renderMenus(routeList)}
        </Menu>
    )
  }

  onOpenChange = openKeys => {
    const {routeList} = this.props;
    const rootSubmenuKeys = routeList.map(_ => _.id);
    console.log('rootSubmenuKeys: ', rootSubmenuKeys);

    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    console.log('latestOpenKey: ', latestOpenKey);

    let newOpenKeys = openKeys;
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : [];

    }

    this.setState({
      openKeys: newOpenKeys,
    });
    store.set('openKeys', newOpenKeys)

  };

  /**
   * 从路由列表中追溯到当前路由的父节点
   * @param {Array} array 根路由树
   * @param {string} pathname 当前路由路径
   * @returns {Array} 路由节点集合
   */
  queryAncestors = (routeList, pathname) => {
    const result = [];
    if (!Array.isArray(routeList)) {
      return result;
    }

    const getPath = arr => {
      let match = null;
      for (let i = 0; i < arr.length; i++) {
        const { routes, path } = arr[i];
        result.push(arr[i]);

        match = path && pathMatchRegexp(path, pathname);
        if (!match && routes && routes.length > 0) {
          match = getPath(routes);
        }

        if (match) {
          break;
        } else {
          result.pop();
        }
      }

      return match;
    };

    getPath(routeList);
    return result;
  }

}
export default withRouter(SilderMenu);
