import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './style.css';

const InputHandler = ({ onSubmit, initialData, editMode = false, users = [] }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <div className="container">
      <Form
        form={form}
        layout="inline"
        onFinish={handleFinish}
        initialValues={initialData}
        className="header-box"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? 'Edit User' : 'Add User'}
          </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
};

export default InputHandler;
