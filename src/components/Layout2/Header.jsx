import react, {PureComponent} from 'react';
import { Avatar, Icon, Menu, Spin, Dropdown, Collapse } from 'antd';
import { Layout, Tab } from '@/components/Library';
import { connect } from '@/utils/decorators';
import styles from './header.less';
import classnames from 'classnames';

const mapStateToProps = ({ login, app }) => ({
  currentUser: login.currentUser,
  tabList: app.headerTabList
});
@connect(mapStateToProps)
class Header extends PureComponent {
  render () {
    const { 
      currentUser = {
        avatar: '',
        name: '',
      },
      tabList
     } = this.props
     const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          logout
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header className={classnames('flexBetween', 'itemCenter', styles.headerWrap)}>
        <Tab tabList={tabList} />
        {currentUser && currentUser.name ? (
          <Dropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.container} ${styles.action} ${styles.account}`}>
              <span className={styles.userName}>{currentUser.name}</span>
              <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
            </span>
          </Dropdown>
        ) : (
            <Spin
              size="small"
              style={{
                marginLeft: 8,
                marginRight: 8,
              }}
            />
        )}
      </Layout.Header>
    )
  }
}
export default Header;
