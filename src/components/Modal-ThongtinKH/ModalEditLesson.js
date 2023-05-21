import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { sendPut } from "../../utils/api";
export default function ModalEditLesson(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const lesson = props.dataFromParent;
  const onFinish = async (values) => {
    values.lessonId = props.dataFromParent.id;
    values.name = parseInt(values.name);
    const res = await sendPut(`/lessons/admin`, values);
    if (res.statusCode === 200) {
      setIsModalVisible(false);
      props.getListLesson();
      message.success("Update bài học thành công");
    } else {
      message.error("Cập nhật khóa học thất bại");
      setIsModalVisible(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div
        className="ModalAddUser-wrapper"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div onClick={showModal}>Sửa</div>
        <Modal
          title="Sửa nội dung bài học"
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
            <Form.Item
              initialValue={lesson?.name}
              label="Tên bài"
              name="name"
              rules={[
                { required: true, message: "Tên bài không được để trống!" },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={lesson?.link}
              label="Link video"
              name="link"
              rules={[{ required: true, message: "Thiếu đường dẫn video!" }]}
              hasFeedback
            >
              <Input />
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
                  Tạo
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
