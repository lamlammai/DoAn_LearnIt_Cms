/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { logo } from "../../constants/images";
import { setToken, setRefreshToken } from "../../utils/storage";
import { sendPost } from "../../utils/api";
import "../../assets/css/Signin.css";
import { useHistory, useParams } from "react-router-dom";
export default function SignIn() {
  const history = useHistory();
  const params = useParams();
  const onFinish = async (values) => {
    try {
      values.token = params.token;
      const add = await sendPost("/admin/active-admin", values);
      if (add.statusCode === 200) {
        history.push("/dang-nhap");
        setTimeout(() => {
          message.success("Tạo tài khoản thành công");
        }, 2000);
      } else {
        message.error("Tài khoản không tồn tại");
      }
    } catch (error) {
      message.error("Tài khoản không tồn tại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="sign-in_wrapper active-admin-wrapper">
        <div className="logo">
          <img alt="" src={logo} />
          <h3 className="active-title"> LEARNIT</h3>
        </div>
        <div className="active-main">
          <h1 className="main-header-title">Active tài khoản</h1>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Username không đưọc để trống!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Email không đưọc để trống!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không đưọc để trống!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                danger
                htmlType="submit"
                className="button-active-user"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
