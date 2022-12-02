import { Spin, Alert, Space } from 'antd';
import React from 'react';
import './spinner.css';
const Spinner = () => (
  <Space direction='vertical' style={{ width: '100%' }}>
    <Spin tip='Loading...' className='spinner'>
      <Alert message='Идёт загрузка' description='Пожалуйста, подождите.' type='info' />
    </Spin>
  </Space>
);
export default Spinner;
