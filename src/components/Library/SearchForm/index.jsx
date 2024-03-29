import React, { PureComponent, Fragment } from 'react';
import { connect } from '@/utils/decorators';
import { chunk } from 'lodash';
import classNames from 'classnames';
import Form from '../Form';
import Input from '../Input';
import Col from '../Col';
import Row from '../Row';
import Icon from '../Icon';
import Button from '../Button';
import ExpandBtn from '../ExpandBtn';
import styles from './index.less';
// import { IButtonProps } from '../type';
const FormItem = Form.Item;
const DEFAULT_COLUMN_NUM_OF_ROW = 4;
// interface IButtonProps {
//   customtype?: string;
//   icon?: string;
//   title: string;
//   onClick?: React.MouseEventHandler<HTMLElement>;
// }
// interface ISearchFormItemsProps {
//   type: string;
//   field: string;
//   disabled?: boolean;
//   placeholder?: string | undefined;
//   onClick?: Function;
//   // children?: Children[];
//   initialValue?: any;
//   // suffix?: ReactElement | string;
//   maxLength?: number;
//   // onChange?: onSelectChange | onDatePickerChange | onRangePickerChange;
// }
// interface SearchFormProps extends FormComponentProps, UmiComponentProps {
//   items: ISearchFormItemsProps[];
//   actions: IButtonProps[];
//   columnNumOfRow?: number;
//   onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
//   titleVisible?: boolean;
//   onGetFormRef?: Function;
// }
// interface ISearchFormState {
//   isExpandForm: boolean;
// }
const mapStateToProps = () => {
  return {};
};
@connect(
  mapStateToProps,
  null,
)
class SearchForm extends PureComponent {
  constructor(props,) {
    super(props);
    this.state = {
      isExpandForm: false,
      a: 1,
    };
    this.columnNumOfRow = DEFAULT_COLUMN_NUM_OF_ROW;
    if (props.items) {
      const { columnNumOfRow, onGetFormRef } = props;
      this.columnNumOfRow = columnNumOfRow || DEFAULT_COLUMN_NUM_OF_ROW;
      if (onGetFormRef) {
        onGetFormRef(props.form);
      }
    }
  }

  componentDidMount() {}

  getFormElement(item) {
    const { type } = item;
    let element = '';
    const {
      form: { getFieldDecorator },
    } = this.props;
    switch (type) {
      case 'input' :
        element = (
          <Input
            placeholder={item.placeholder}
            suffix={<Icon className={styles.suffixIcon} type="search" />}
          />
        );
        break;
      default :
        // console.log(1);
    }
    return (
      <Col key={item.field} md={Math.floor((24 - 5) / this.columnNumOfRow)} sm={24} xs={24}>
        <FormItem>{getFieldDecorator(item.field)(element)}</FormItem>
      </Col>
    );
  }

  getActionsElements = (actions) => {
    return actions.map((item, index) => {
      return (
        <Button key={`actionBtn${index}`} {...item}>
          {item.title}
        </Button>
      );
    });
  }

  getRow(items, actions) {
    if (!Array.isArray(items)) {
      console.error('this data of page header is not array');
      return null;
    }
    const { isExpandForm } = this.state;
    const elements = items.map(item => this.getFormElement(item));
    const actionsElements = this.getActionsElements(actions);
    const chunks = chunk(elements, this.columnNumOfRow);
    return chunks.map((item, index) => {
      let actionCpts = null;
      if (!isExpandForm && index > 0) {
        return null;
      }
      if (index === 0) {
        actionCpts = (
          <Col md={5} sm={24} xs={24}>
            <FormItem>
              <div className={classNames('flexStart', 'itemCenter')}>
                <div className={styles.btn}>{actionsElements}</div>
                {chunks.length > 1 && (
                  <ExpandBtn isExpand={this.state.isExpandForm} onClick={this.onClickExpandForm} />
                )}
              </div>
            </FormItem>
          </Col>
        );
      }
      return (
        <Row key={`row${index}`} gutter={{ md: 24, lg: 24, xl: 24 }} align="middle" type="flex">
          {item}
          {actionCpts}
        </Row>
      );
    });
  }

  renderSearchForm() {
    const { items, actions } = this.props;
    return (
      <div className={styles.searchForm}>
        <Form onSubmit={this.onSubmit} autoComplete="off">
          {this.getRow(items, actions)}
        </Form>
      </div>
    );
  }

  render() {
    const { titleVisible = true } = this.props;
    return (
      <Fragment>
        {titleVisible && <div className="listTitle">信息筛选</div>}
        {this.renderSearchForm()}
      </Fragment>
    );
  }

  onSubmit = (e)=> {
    const { onSubmit } = this.props;
    onSubmit && onSubmit(e);
  };

  onClickExpandForm = () => {
    this.setState(prevState => ({ isExpandForm: !prevState.isExpandForm }));
  };
}
export default Form.create()(SearchForm);
