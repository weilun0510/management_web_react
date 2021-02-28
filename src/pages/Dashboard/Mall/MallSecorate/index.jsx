import React, { PureComponent } from 'react';
import Board from 'react-trello';
import { Modal } from 'antd';
import { Input, Icon } from '@/components/Library';
import classNames from 'classnames';
import { Search } from './LanesComponents';
import styles from './index.less';

const { confirm } = Modal;

class MallSecorate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 基础组件数据
      basicCptList: [
        {
          id: '3',
          data: {
            title: '333',
            content: '333',
          },
          title: '333',
          description: '3Transfer via NEFT',
          label: '3mins',
          metadata: { sha: '333be312a1' },
        },
        {
          id: '4',
          data: {
            title: '444',
            content: '444',
          },
          title: '444',
          description: '444Transfer via NEFT',
          label: '444mins',
          metadata: { sha: '44444' },
        },
      ],
      eventBus: undefined,
      // 通道数据
      lanesData: {
        lanes: [
          {
            id: 'lane',
            style: { backgroundColor: 'rgba(255, 255, 255, 0.01)' },
            cards: [
              {
                id: '1',
                // data: {
                //   title: '未配置',
                //   content: '1',
                // },
                // title: 'Pay Rent1',
                // description: 'Transfer via NEFT',
                // label: '5 mins',
                // metadata: { sha: 'be312a1' },

                is_show: 1,
                label_display_times: 1,
                label_id: 149940,
                label_info_summary: '（未配置）',
                label_name_cn: '（未配置）搜索',
                label_type: 'searchChannel',
                title_style: '',
                data: {
                  hotSearch: '[]',
                  placeholder: '搜索..'
                }
              },
              {
                id: '2',
                data: {
                  title: '未配置2',
                  content: '12',
                },
                title: 'Pay Rent1',
                description: 'Transfer via NEFT',
                label: '5 mins',
                metadata: { sha: 'be312a1' },
              },
            ],
          },
        ],
      },
      selectedCardIndex: null,
      lanesActions: ['置顶', '置底', '上移', '下移']
    };
  }

  renderCardWrap = card => {
    console.log('card: ', card);
    const { lanesActions, selectedCardIndex } = this.state;
    const { laneId, id, index: cardIndex } = card;

    return <div className={classNames(styles.cardWrap, {[styles.activeBorder]: cardIndex === selectedCardIndex} )} onClick={() => this.onSelectedCard(cardIndex)}>
      <div className={classNames('flexBetween', styles.actions)}>
        <div className={classNames('flexStart')}>
          {lanesActions.map((item, index) => (
            <div key={index} className={styles.text} onClick={() => this.onUpdatePosition(cardIndex, index)}>
              {item}
            </div>
          ))}
        </div>
        <div onClick={() => this.onBeforeCardDelete(laneId, id)}>
          <Icon type="delete" style={{color: '#fff'}} />
        </div>
      </div>
      <div className={styles.cardContent}>
        {this.renderCard(card)}
      </div>
    </div>;
  };

  renderCard = card => {
    const { id } = card;
    let cpt = null;
    switch (id) {
      case '1':
        cpt = (
          // <div className={classNames(styles.Card1)} key={id}>
          //   <div onClick={() => this.onBeforeCardDelete(laneId, id)}>删除</div>
          //   <div>{data.itle}</div>
          //   <div>{data.content}</div>
          // </div>
          <Search card={card} />
        );
        break;
      case '2':
        cpt = (
          <div key={card.id}>
            <div>{card.data.itle}</div>
            <div>{card.data.content}</div>
          </div>
        );
        break;
      case '3':
        cpt = (
          <div key={card.id}>
            <div>{card.data.itle}</div>
            <div>{card.data.content}</div>
          </div>
        );
        break;
      default:
        console.log('请在renderCa r d方法中添加组件');
    }
    return cpt;
  };

  render() {
    const { basicCptList } = this.state;
    return (
      <div className={styles.mallSecorate}>
        <div className={styles.allCmp}>
          <div>基础组件</div>
          {basicCptList.map(item => (
            <div
              className={styles.section}
              onClick={() => this.addBlockedEvent(item)}
              key={item.id}
            >
              <div className={styles.item}>{item.title}</div>
              <div>{item.content}</div>
            </div>
          ))}
        </div>
        <div className={styles.center}>
          <Board
            className={styles.shadow}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)' }}
            data={this.state.lanesData}
            components={{ Card: this.renderCardWrap }}
            eventBusHandle={this.setEventBus}
            onDataChange={this.onDataChange}
          />
        </div>
        <div className={styles.cptCustom}>
          <div>定制组件</div>
          <div>主标题</div>
          <Input></Input>
          <div onClick={this.onSubmit}>保存</div>
        </div>
      </div>
    );
  }

  onSubmit = () => {
    const lanes = [
      {
        id: 'lane',
        style: { backgroundColor: 'rgba(255, 255, 255, 0.01)' },
        cards: [
          {
            id: '1',
            data: {
              title: '我是更新后的',
              content: '我是更新后的11',
            },
            title: 'Pay Rent1',
            description: 'Transfer via NEFT',
            label: '5 mins',
            metadata: { sha: 'be312a1' },
          },
          {
            id: '2',
            data: {
              title: '未配置2',
              content: '我是更新后的2222',
            },
            title: 'Pay Rent1',
            description: 'Transfer via NEFT',
            label: '5 mins',
            metadata: { sha: 'be312a1' },
          },
        ],
      },
    ];
    this.uploadLanes(lanes);
  };

  /**
   * 选中卡片
   * @param {Number} cardIndex 卡片索引
   */
  onSelectedCard = cardIndex => {
    this.setState({selectedCardIndex: cardIndex });
  }

  /**
   * 卡片删除前的回调
   * @param {String} laneId 通道id
   * @param {String} cardId 卡片id
   */
  onBeforeCardDelete = (laneId, cardId) => {
    console.log('are you sure?');
    confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => {
        this.state.eventBus.publish({
          type: 'REMOVE_CARD',
          laneId,
          cardId,
        });
        this.onCardDeleted(cardId);
      },
      onCancel() {},
    });
  };

  /**
   * 卡片已删除
   * @param {String} cardId 卡片id
   */

  onCardDeleted = (cardId) => {
    console.log('cardId: ', cardId);
    console.log('卡片已删除 ');
  };

  /**
   * 卡片数据发生变化时
   * @param {object} newData 新对象
   */
  onDataChange = newData => {
    console.log('newData: ', newData);
    this.setState({lanesData: newData});
    // console.log('快去获取最新数据哦');
  };

  setEventBus = handle => {
    this.setState({ eventBus: handle });
  };

  /**
   * 添加卡片
   */

  addBlockedEvent = item => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'lane',
      card: item,
    });
  };

  /**
   * 更新通道数据
   * @param {Object} lanes 通道数据
   */

  uploadLanes = lanes => {
    this.state.eventBus.publish({ type: 'UPDATE_LANES', lanes });
  }

  /**
   * 移动卡片位置
   * @param {String} cardIndex 卡片index
   * @param {Number} index actions索引
   * @memberof MallSecorate
   */
  onUpdatePosition = (cardIndex, index) => {
    const { cards } = this.state.lanesData.lanes[0];
    const len = cards.length - 1;
    // actions = ['置顶', '置底', '上移', '下移']
    if (index === 0) {
      if (cardIndex === 0) return;
      [cards[0], cards[cardIndex]] = [cards[cardIndex], cards[0]];
    } else if (index === 1) {
      if (cardIndex === len) return;
      cards.splice(len, 0, ...cards.splice(cardIndex, 1));
    } else if (index === 2) {
      if (cardIndex === 0) return;
      [cards[cardIndex - 1], cards[cardIndex]] = [cards[cardIndex], cards[cardIndex - 1]];
    } else if (index === 3){
      if (cardIndex === len) return;
      [cards[cardIndex + 1], cards[cardIndex]] = [cards[cardIndex], cards[cardIndex + 1]];
    }
    const lanes = [{...this.state.lanesData.lanes[0], cards}];
    this.uploadLanes(lanes);
  }
}
export default MallSecorate;
