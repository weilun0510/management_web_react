import React, { PureComponent, createRef } from 'react';
import { Form as AntdForm } from 'antd';
import { connect } from '@/utils/decorators';
import styles from './index.less';

@connect(null, null, null, {forwardRef: true})
class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.formRef = createRef();
    this.state = {
      isForm: false,
    };
  }

  static create = AntdForm.create;

  static Item = AntdForm.Item;

  render() {
    return <AntdForm {...this.props} ref={this.formRef} className={styles.form} />;
  }
}
export default Form;
