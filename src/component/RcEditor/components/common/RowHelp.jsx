/* eslint-disable react/prop-types */
import React from 'react';
import {Row,Col,Icon,Tooltip} from 'antd';

export default (props) => {
  const { title, help, children, ...rowProps } = props
  return (
    <Row gutter={8} {...rowProps}>
      <Col span={3}>
        {title}
      </Col>
      <Col span={18}>
        {children}
      </Col>
      <Col span={3}>
        <Tooltip placement="topRight" arrowPointAtCenter title={help}>
          <Icon type="question-circle" />
        </Tooltip>
      </Col>
    </Row>
  );
}