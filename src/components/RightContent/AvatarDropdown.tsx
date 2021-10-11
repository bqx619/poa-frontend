import React from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {history} from 'umi'

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {


  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={({key}) => {
      if (key === 'logout') history.push('/user/login')
    }}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={"https://i.pinimg.com/originals/65/6d/46/656d4609311000415c7fd37aade9917b.jpg"} alt="avatar" />
        <span className={`${styles.name} anticon`}>Admin</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
