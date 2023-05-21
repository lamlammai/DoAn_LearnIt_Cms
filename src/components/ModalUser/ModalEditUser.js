import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { sendPut } from "../../utils/api";
export default function ModalEditUser({ data, list }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    setIsModalVisible(false);
    await sendPut(`/users`, {
      status: values.status,
      userId: data?.id,
    });
    await list();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  return (
    <>
      <div className="ModalAddUser-wrapper">
        <div onClick={showModal}>Sửa quyền</div>
        <Modal
          title="Chỉnh sửa thông tin"
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Họ tên" name="name" initialValue={data?.name}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label="Email" name="email" initialValue={data?.email}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái tài khoản"
              initialValue={data?.status}
            >
              <Select placeholder="Trạng tái tài khoản">
                <Option value="0">Khoad</Option>
                <Option value="1">Hoạt động</Option>
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
