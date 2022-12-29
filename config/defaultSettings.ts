/*
 * @Author: licat
 * @Date: 2022-12-26 12:48:15
 * @LastEditors: licat
 * @LastEditTime: 2022-12-29 16:51:08
 * @Description: 
 */
import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'MixBench',
  pwa: false,
  logo: '/logo.png',
  iconfontUrl: '',
  menu: {
    locale: false
  }
};

export default Settings;
