/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: file content
 */

// ref: https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  antd: {},
  dva: false,
  dynamicImport: false,
  title: 'reactDragLayout',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false, path: '/', component: '@/layouts/index',
      routes: [
        {
          title: '设计页面', path: '/',
          component: '@/pages/index',
        },
        {
          title: '预览', path: '/review',
          component: '@/pages/review',
        }
      ]
    }
  ]})
