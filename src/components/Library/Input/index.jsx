import React, { PureComponent } from 'react';
import { Input as AntdInput } from 'antd';
import styles from './index.less';

class Input extends PureComponent {
  render() {
    return (
      <div className={styles.input}>
        <AntdInput maxLength={50} {...this.props} />
      </div>
    );
  }
}
export default Input;
