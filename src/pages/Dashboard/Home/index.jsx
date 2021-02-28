import React, {PureComponent} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert, Button, Popover } from 'antd';
import {connect} from '@/utils/decorators';
import classnames from 'classnames';
import CountUp from 'react-countup';
import styles from './index.less';

const mapStateToProps = (({home}) =>({
  home
}));
@connect(mapStateToProps)
export default class Home extends PureComponent{

  componentDidMount() {
    this.props.dispatch({
      type: 'app/getTabList',
      payload: [{name: '概况', path: '/home'}]
    })
  }
  
  renderLine1() {
    // 预览小程序码
    const previewImage = (
      <div className={styles.showImage}>
        <img src="https://static-shanghai.hanku.net.cn/jqy_system/customer-profiles/d5dcfd63e24c4442975bc6c7db088df5.png" />
      </div>
    )
    return (
      <div className={classnames(styles.line1, 'flexBetween', 'itemCenter')}>
        <div className={classnames(styles.miniProgram, 'flexCenter', 'itemCenter')}>
          <div className={styles.logo}>
            <img src="https://static-shanghai.hanku.net.cn/jqy_system/customer-profiles/d5dcfd63e24c4442975bc6c7db088df5.png" />
          </div>
          <div className={styles.miniProgramRight}>
            <div className={styles.head}>
              <span className={styles.logoName}>半城云电商体验</span>
              <Popover content={previewImage} title="" placement="right">
                <Button type="primary" size="small">小程序码</Button>
              </Popover>
            </div>
            <div className={styles.appId}>APP_ID：wx14ee1f80dee3cbd8</div>
          </div>
        </div>
        <div className={classnames(styles.balance, 'flexCenter')}>
          <div className={styles.miniProgramRight}>
            <div className={styles.head}>
              <span className={styles.logoName}>运营账户余额</span>
              <span className={styles.money}>
              <CountUp className="custom-count"
                start={0}
                end={8.88}
                decimals={2}
                duration={2.75}
                useEasing={true}
                separator=" "
                decimal="."
                prefix="￥"/>
              </span>
              <Button type="primary" size="small">在线充值</Button>
            </div>
            <div className={styles.appId}>到期时间：2020-12-31 00:00</div>
          </div>
        </div>
        <div className={classnames(styles.version)}>
          <Button size="small">查看版本</Button>
          <p>当前版本1.0</p>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.homeWrap}>
        {this.renderLine1()}
      </div>
    );
  }
}
