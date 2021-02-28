import react, {PureComponent} from 'react';
import {Layout} from '@/components/Library';
import {Header, Sider} from '@/components/Layout2'
// import withRouter from 'umi/withRouter';
import styles from './index.less';
const {content} = Layout;

class LayoutIndex extends PureComponent {
  render() {
    const { children } = this.props;
    console.log('children: ', children);
    return (
      <Layout className="height100">
        <Sider></Sider>
        <Layout>
          <Header />
          <Layout className={styles.content}>
            <content className={styles.main}>{children}</content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default LayoutIndex;
