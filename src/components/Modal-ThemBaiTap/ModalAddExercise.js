import React, { useState } from "react";
import { Modal, Form, Input, message, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { sendGet, sendPost } from "../../utils/api";
import { useParams } from "react-router-dom";
export default function ModalAddExercise(props) {
  const params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    setIsModalVisible(false);
    values.lessonId = parseInt(params.id);
    const add = await sendPost(`/exercises`, values);
    if (add.statusCode === 200) {
      // thay doi
      props.getLesson();
      message.success("Thêm bài tập thành công");
    } else {
      message.error("Thêm bài tập thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    setIsModalVisible(false);
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
        <button onClick={showModal}>
          <PlusOutlined />
          Thêm bài tập
        </button>
        <Modal
          title="Thêm bài tập"
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          maskClosable={false}
          width={800}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tên bài tập"
              name="name"
              rules={[
                { required: true, message: "Tên bài không được để trống!" },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Đề bài"
              name="question"
              rules={[
                { required: true, message: "Đề bài không được để trống!" },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input />
            </Form.Item>
            <Form.List name="testcases">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <div key={field.key}>
                        <p>TestCase {index + 1}</p>
                        <div
                          className="group"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Item
                            name={[index, "input"]}
                            label="Input"
                            rules={[{ required: true }]}
                          >
                            <TextArea />
                          </Form.Item>
                          <Form.Item
                            name={[index, "output"]}
                            label="Output"
                            rules={[{ required: true }]}
                          >
                            <TextArea />
                          </Form.Item>
                        </div>

                        {fields.length > 1 ? (
                          <Button
                            type="danger"
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          >
                            Xóa testcase
                          </Button>
                        ) : null}
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                      >
                        Thêm testcase
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
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
