import React, { useState } from "react";

import { sendGet, sendPost } from "../../utils/api";
import { Modal, Form, Input, Select, message, Button } from "antd";
import "../../assets/css/modal.scss";
import { PlusOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
function ModalAddAdmin({ listAdmin }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    const add = await sendPost("/admin", values);
    if (add.statusCode === 200) {
      await listAdmin();
      message.success("Tạo tài khoản thành công thành công");
    } else {
      message.error("Không thành công");
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Option } = Select;
  return (
    <>
      <div className="ModalAddUser-wrapper">
        <div className="btn">
          <button onClick={showModal}>
            <PlusOutlined />
            Thêm mới
          </button>
        </div>

        <Modal
          title="Thêm tài khoản"
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleOk}
            onFinishFailed={handleCancel}
          >
            <Form.Item label="Họ tên" name="username">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item
              name="role"
              label="Chức vụ"
              rules={[{ required: true, message: "Hãy nhập quyền của bạn" }]}
              hasFeedback
            >
              <Select placeholder="chọn quyền">
                <Option value="ADMIN">Admin</Option>
                <Option value="MOD">Mod</Option>
              </Select>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "10px",
              }}
            >
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button
                  type="primary"
                  htmlType="reset"
                  onClick={() => setIsModalVisible(false)}
                >
                  Hủy
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ModalAddAdmin;
