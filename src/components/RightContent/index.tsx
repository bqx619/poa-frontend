import {notification, Space} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import React from 'react';
import {useModel, SelectLang} from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';
import {useRequest} from "ahooks";
import {AnalysisInterfaceEmotionNotice} from "@/services/analysis-interface/AnalysisInterface";

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  useRequest(AnalysisInterfaceEmotionNotice, {
    pollingInterval: 20000,
    pollingWhenHidden: false,
    onSuccess: data => {
      notification[data.status === 'success' ? 'success' : 'warn']({
        message: data.msg || '',
      });
    }
  })
  if (!initialState || !initialState.settings) {
    return null;
  }

  const {navTheme, layout} = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }


  return (
    <Space className={className}>
      <span
        className={styles.action}
        onClick={() => {
          window.open('/');
        }}
      >
        <QuestionCircleOutlined/>
      </span>
      <NoticeIconView/>
      <Avatar menu/>
      <SelectLang className={styles.action}/>
    </Space>
  );
};

export default GlobalHeaderRight;
