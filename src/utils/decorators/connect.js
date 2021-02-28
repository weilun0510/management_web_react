import {connect} from 'dva';

// 连接组件与store

// mapStateToProps?: Function
// mapDispatchToProps?: Function | Object
// mergeProps?: Function
// options?: Object     {forwardRef: true}将返回被包装组件的实例
export default (mapStateToProps, actions, mergeProps = null, options) => {
  return (target) => connect(mapStateToProps, actions, mergeProps, options)(target);
};
