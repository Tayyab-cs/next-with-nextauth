"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/navigation.js";
import { ErrorBoundary } from "next/dist/client/components/error-boundary.js";

const Login = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        console.error("Authentication failed:", result.error);
        // Handle authentication error here, you can redirect or show an error message
        message.error(result.error || "Authentication failed");
      } else {
        console.log("Successful login");
        message.success(`login successful with status code ${result.status}`);
        router.push("/welcome", { scroll: false });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      message.error(error.message || "Authentication failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
