/*
 * @Author: licat
 * @Date: 2022-12-26 12:48:15
 * @LastEditors: licat
 * @LastEditTime: 2022-12-29 16:10:08
 * @Description: 
 */
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import React from 'react';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      gap: 8,
    };
  });

  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className={className}>
      <Avatar menu={true}/>
    </div>
  );
};
export default GlobalHeaderRight;
