import React, { PureComponent } from 'react';
import { connect } from '@/utils/decorators';

import classNames from 'classnames';

const mapStateToProps = ({ user2, loading: { effects } }) => ({
  userData: user2.userData,
  getUserDataLoading: effects['user2/getUser'],
});
@connect(mapStateToProps)
class User extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      searchFields: {},
    };
  }

  componentDidMount() {
    this.getUserData({ page: 0 });
  }

  render() {
    return (
      <div className={classNames('height100', 'flexColStart')}>
        {/* {this.renderSearchFrom()} */}
        <div className="listTitle">信息展示</div>
        {/* {this.renderButtonGroup()} */}
        {/* {this.renderTable()} */}
      </div>
    );
  }

  // renderSearchFrom() {
  //   const props = {
  //     items: [
  //       {
  //         type: 'input',
  //         field: 'name',
  //         placeholder: '姓名',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'name2',
  //         placeholder: '姓名',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone2',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone3',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone4',
  //         placeholder: '电话',
  //       },
  //       {
  //         type: 'input',
  //         field: 'phone5',
  //         placeholder: '电话',
  //       },
  //     ],
  //     actions: [
  //       { customtype: 'select', title: '查询', htmlType: 'submit' },
  //       { customtype: 'reset', title: '重置', onClick: this.onSearchFormReset },
  //     ],
  //     columnNumOfRow: 4,
  //     onSubmit: this.onSearch,
  //     onGetFormRef: this.onGetFormRef,
  //   };

  //   return <SearchForm {...props} />;
  // }

  // renderButtonGroup() {
  //   const ButtonGroupProps = {
  //     actions: [
  //       {
  //         customtype: 'master',
  //         title: '新增',
  //         onClick: this.addUser,
  //       },
  //       // {
  //       //   customtype: 'warning',
  //       //   title: '删除',
  //       //   onClick: this.batchDeleteCarBan,
  //       //   loading: deleteDeviceLoading,
  //       // },
  //     ],
  //   };
  //   return <ButtonGroup {...ButtonGroupProps} />;
  // }

  // renderTable() {
  //   const { userData, getUserDataLoading } = this.props;
  //   const { selectedRowKeys } = this.state;

  //   if (isEmpty(userData) || !userData) {
  //     return null;
  //   }

  //   const columns = [
  //     {
  //       title: '用户名',
  //       dataIndex: 'userName',
  //       key: 'userName',
  //       width: SINGLE_COLUMN_WIDTH,
  //       render: (text, record) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '姓名',
  //       width: DOUBLE_COLUMN_WIDTH,
  //       dataIndex: 'name',
  //       key: 'name',
  //       render: (text, record) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '邮箱',
  //       width: DOUBLE_COLUMN_WIDTH,
  //       dataIndex: 'email',
  //       key: 'email',
  //       render: (text, record) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '手机号',
  //       width: DOUBLE_COLUMN_WIDTH,
  //       key: 'phone',
  //       dataIndex: 'phone',
  //       render: (text, record) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '所属角色',
  //       width: DOUBLE_COLUMN_WIDTH,
  //       key: 'roleName',
  //       dataIndex: 'roleName',
  //       render: (text, record) => CommonComponent.renderTableCol(text, record),
  //     },
  //     {
  //       title: '操作',
  //       width: DOUBLE_COLUMN_WIDTH,
  //       key: 'action',
  //       render: (text, record) =>
  //         userData ? (
  //           <Fragment>
  //             <Button
  //               customtype="icon"
  //               // onClick={() => this.updateUser(record)}
  //               icon="edit"
  //               title="修改用户"
  //             />
  //             <Button
  //               customtype="icon"
  //               // onClick={() => this.deleteUser(record.id)}
  //               title="删除"
  //               icon="delete"
  //             />
  //           </Fragment>
  //         ) : null,
  //     },
  //   ];

  //   const pagination = {
  //     position: 'bottom',
  //     current: userData.pageable.pageNumber + 1,
  //     total: userData.totalElements,
  //     pageSize: userData.pageable.pageSize,
  //     defaultCurrent: 1,
  //     // onChange: this.onChangePage,
  //   };

  //   return (
  //     <div className={classNames('flexAuto')}>
  //       <Table
  //         columns={columns}
  //         dataSource={userData.content}
  //         loading={getUserDataLoading}
  //         scroll={{ y: '100%' }}
  //         pagination={pagination}
  //         onSelectRow={this.onTableSelectRow}
  //         onChange={this.onTableChange}
  //         selectedRow={selectedRowKeys}
  //       />
  //     </div>
  //   );
  // }

  addUser = () => {
    // this.setState({
    //   add: true,
    // });
  };

  batchDeleteCarBan = () => {
    // if (this.confirmRef.current) {
    //   this.confirmRef.current.open(
    //     () => this.onDeleteCarBan(this.state.selectedRowKeys),
    //     '删除',
    //     '是否确认删除选中的条目？',
    //   );
    // }
  };

  getUserData = Fileds => {
    const { dispatch } = this.props;
    this.setState({ selectedRowKeys: [] });
    dispatch({ type: 'user2/getUser', payload: { ...Fileds } });
  };

  onSearch = e => {
    e.preventDefault();
    this.searchForm.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.setState({
        searchFields: { ...fieldsValue },
      });
      // fieldsValue.page = 0;
      // console.log('fieldsValue: ', fieldsValue);
    });
  };

  onSearchFormReset = () => {
    this.searchForm.resetFields();
    // this.setState({
    //   searchFields: {},
    // });
    // this.getUserData({ page: 0 });
  };

  onGetFormRef = form => {
    console.log('form: ', form);
    this.searchForm = form;
  };

  onTableChange = pagination => {
    const searchFields = { ...this.state.searchFields };
    searchFields.page = --pagination.current;
    searchFields.size = pagination.pageSize;
    this.getUserData(searchFields);
  };

  onTableSelectRow = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
}

export default User;
