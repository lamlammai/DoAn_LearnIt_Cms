import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Switch,
  message,
  Button,
  Collapse,
} from "antd";
import { sendGet, sendPut } from "../../utils/api";
export default function ModalEditUser({ data, list }) {
  const { Panel } = Collapse;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    setIsModalVisible(false);
    await sendPut(`/admin`, {
      level: parseInt(values.role),
      status: values.status,
      modId: data?.id,
    });
    await list();
  };
  const { Option } = Select;
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
            <Form.Item label="Họ tên" name="name" initialValue={data?.username}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label="Email" name="email" initialValue={data?.email}>
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              initialValue={data?.role}
              name="role"
              label="Chức vụ"
              rules={[{ required: true, message: "Hãy nhập quyền của bạn" }]}
              hasFeedback
            >
              <Select placeholder="Quyền Mod">
                <Option value="1">Mod L.1</Option>
                <Option value="2">Mod L.2</Option>
                <Option value="3">Mod L.3</Option>
                <Option value="4">Mod L.4</Option>
              </Select>
            </Form.Item>
            <Collapse onChange={onChange}>
              <Panel header="Chi tiết quyền của Mod" key="1">
                <p>Mod Level 1: Tạo khóa học, Sửa khóa học, Xóa khóa học</p>
                <p>
                  Mod Level 2: Active tài khoản, Duyệt bài viết, Xóa bài viết
                </p>
                <p>Mod Level 3: Tạo bài tập, Sửa bài tập, Xóa bài tập</p>
                <p>Mod Level 4: Tạo bài học, Sửa bài học, Xóa bài học</p>
              </Panel>
            </Collapse>
            <Form.Item
              name="status"
              label="Trạng thái tài khoản"
              initialValue={data?.status}
            >
              <Select placeholder="Trạng tái tài khoản">
                <Option value="0">Khóa</Option>
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
