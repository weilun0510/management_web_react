import { Avatar, Icon, Menu, Spin, Dropdown, Collapse } from 'antd';
import React from 'react';
import { connect } from '@/utils/decorators';
import { Tab } from '@/components/Library';
import { router } from 'umi';
import classnames from 'classnames';
import styles from './index.less';

const mapStateToProps = ({ login, app }) => ({
  currentUser: login.currentUser,
  tabList: app.headerTabList
});
@connect(mapStateToProps)
class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    router.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      tabList
    } = this.props;
    console.log(this.props);
    console.log('currentUser: ', currentUser);

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          logout
        </Menu.Item>
      </Menu>
    );
    return <div className={classnames('flexBetween', 'itemCenter', styles.headerWrap)}>
      {/* <Collapse > */}
      <Tab tabList={tabList} />
      {currentUser && currentUser.name ? (
        <Dropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.container} ${styles.action} ${styles.account}`}>
            <span className={styles.name}>{currentUser.name}</span>
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
    </div>;
  }
}

export default AvatarDropdown;
