import react, {PureComponent} from 'react';
import {Layout} from '@/components/Library';
import SiderMenu from './SiderMenu';
import {routeList} from '@/utils/config'
import styles from './Sider.less'
import logo from '@/assets/images/nodata.png'

class Sider extends PureComponent {
  render () {
    // const {routeList} = this.props;
    // console.log('routeList: ', routeList);
    const routes = routeList[1].routes || []
    console.log('routes: ', routes);
    const menuList = routes.filter(item => item.id)
    console.log('menuList: ', menuList);

    return (
      <Layout.Sider className={styles.sider}>
        <div className={styles.menuTitle}>
          <img className={styles.logoImg} src={logo} alt=""/>
        </div>
        <SiderMenu
          routeList={menuList}
        />
      </Layout.Sider>
    )
  }

   /**
   *匹配权限
   *
   * @param {Array} menuList 菜单数据
   * @return {Array} 新的菜单
   */
  checkPermission = (menuList) => {
    function check (menuList) {
      for (let node of menuList) {

      }
    }

  }
}
export default Sider;
