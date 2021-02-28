import React, { PureComponent } from 'react';
import { Button as AntdButton } from 'antd';

class Button extends PureComponent {
  render() {
    const { className } = this.props;

    return <AntdButton {...this.props} className={className} onClick={this.onClick} />;
  }

  onClick = e => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };
}
export default Button;
