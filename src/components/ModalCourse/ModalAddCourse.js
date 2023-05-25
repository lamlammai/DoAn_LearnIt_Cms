import React, { useEffect, useState } from "react";
import axios from "axios";
import { sendPost } from "../../utils/api";
import { Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { logo } from "../../constants/images";

export default function ModalAddCourse(props) {
  const { TextArea } = Input;
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onFinish = async (values) => {
    values.img = imageUrl;
    const add = await sendPost("/courses", values);
    if (add.statusCode === 200) {
      await props.getListCourse();
      message.success("Thêm khóa học thành công");
      setIsModalVisible(false);
    } else {
      message.error("Cập nhật khóa học thất bại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    setIsModalVisible(false);
    console.log("Failed:", errorInfo);
  };

  const [imageUrl, setImageUrl] = useState(logo);
  const handleChangeImage = async () => {
    const { files } = document.querySelector(".img-input");
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "descriptionCourse");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/learnit2022/image/upload",
        formData
      )
      .then((response) => setImageUrl(response.data.secure_url))
      .catch((err) => console.error(err));
    return imageUrl;
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="ModalAddUser-wrapper">
        <button onClick={showModal}>
          <PlusOutlined />
          Thêm mới
        </button>
        <Modal
          centered
          width={800}
          title="Thêm khóa học"
          open={isModalVisible}
          maskClosable={false}
          footer={null}
          destroyOnClose={true}
          onCancel={onFinishFailed}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên khóa học không được để trống!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <TextArea />
            </Form.Item>
            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Item label="Yêu cầu" name="requirement">
                <TextArea />
              </Form.Item>
              <Form.Item label="Mục tiêu" name="goal">
                <TextArea />
              </Form.Item>
            </div>

            <div style={{ display: "flex" }}>
              <Form.Item
                initialValue={imageUrl}
                getValueFromEvent={handleChangeImage}
                valuePropName="imageUrl"
                label="Ảnh mô tả"
                name="img"
                style={{ width: "60%" }}
              >
                <input
                  hidden
                  className="img-input"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
                <label for="img">
                  <img
                    src={imageUrl}
                    alt="img"
                    style={{
                      width: "300px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                </label>
              </Form.Item>
              <div
                className="group"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Form.Item
                  name="path"
                  label="Lộ trình"
                  rules={[{ required: true, message: "Lộ trình!" }]}
                  hasFeedback
                >
                  <Select placeholder="Chọn lộ trình phù hợp...">
                    <Option value="FRONTEND">Front-end</Option>
                    <Option value="BACKEND">Back-end</Option>
                    <Option value="FULLSTACK">FullStack</Option>
                    <Option value="BASIC">BASIC</Option>
                    <Option value="MOBILE">MOBILE</Option>
                    <Option value="OTHER">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="status" label="Trạng thái">
                  <Select
                    placeholder="Chọn trạng thái"
                    defaultValue="1"
                    rules={[{ required: true, message: "Trạng thái!" }]}
                    hasFeedback
                  >
                    <Option value="1">Có hiệu lực</Option>
                    <Option value="0">Hết hiệu lực</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div
              className="group"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "10px",
              }}
            >
              <Form.Item
                name="type"
                label="Loại khóa học khóa học"
                rules={[{ required: true, message: "Loại khóa học" }]}
                hasFeedback
              >
                <Select placeholder="Chọn trình độ phù hợp...">
                  <Option value="1">VIP </Option>
                  <Option value="0">NORMAL </Option>
                  <Option value="2">INCOMMING </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="level"
                label="Trình độ"
                rules={[{ required: true, message: "Trình độ" }]}
                hasFeedback
              >
                <Select placeholder="Chọn trình độ phù hợp...">
                  <Option value="0">BEGIN </Option>
                  <Option value="1">MIDDLE </Option>
                  <Option value="2">EXPERT </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="language"
                label="Ngôn ngữ"
                rules={[{ required: true, message: "Ngôn ngữ" }]}
                hasFeedback
              >
                <Select placeholder="Ngôn ngữ">
                  <Option value="c">C </Option>
                  <Option value="java">JAVA </Option>
                  <Option value="python3">PYTHON </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="price"
                label="Giá tiền"
                rules={[{ required: true, message: "Giá tiền" }]}
                hasFeedback
              >
                <InputNumber placeholder="Nhập giá tiền" />
              </Form.Item>
            </div>
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
