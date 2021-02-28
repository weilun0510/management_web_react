import React from 'react';
import { Icon } from '@/components/Library';
import className from 'classnames';
import styles from './index.less';

const Search = ({ card }) => {
  const { data: {placeholder} } = card;
  console.log('card: ', card);

  return (
    <div className={className('flexCenter', 'itemCenter', styles.search)}>
      <Icon type="search" style={{color: '#999'}} />
      <div className={styles.text}>{placeholder}</div>
    </div>
  );
};

export default Search;
