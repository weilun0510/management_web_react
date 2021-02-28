import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { NavLink } from 'umi';
import styles from './index.less';

class Tab extends PureComponent {
  
  render() {
    const {tabList} = this.props;
    return (
      <div className={`${styles.tabWrap}`}>
        <ul className={classnames('flexCenter', 'itemCenter', 'height100', styles.navLinkWrap)}>
          {tabList.map((item, index) => <NavLink to={item.path} activeClassName={`${styles.active}`} key={index}
            isActive={(match, location) => {
              if (!match) {
                return false;
              }
              return location.pathname === item.path;
            }}>{item.name}</NavLink>)}
        </ul>
      </div>
      );
  }
}
export default Tab;
