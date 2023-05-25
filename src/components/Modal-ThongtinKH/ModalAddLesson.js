import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { sendGet, sendPost } from "../../utils/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import { log } from "@antv/g2plot/lib/utils";

export default function ModalAddLesson(props) {
  const params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState();
  useEffect(() => {
    setFile(file);
  }, [file]);
  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Option } = Select;
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const onFinish = async (values) => {
    // values.link = await handleGetLinkVideo();
    values.courseId = parseInt(params.id);
    const add = await sendPost(`/lessons/admin`, values);
    if (add.statusCode === 200) {
      await props.getListLesson();
      message.success("Thêm bài học thành công");
      setIsModalVisible(false);
    } else {
      message.error("Cập nhật bài học thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    setIsModalVisible(false);
    console.log("Failed:", errorInfo);
  };
  const handleGetLinkVideo = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "descriptionCourse");
    console.log({ formData });
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/learnit2022/video/upload",
        formData
      );
      setVideoUrl(data?.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
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
          Thêm bài học
        </button>
        <Modal
          title="Thêm bài mới"
          open={isModalVisible}
          footer={null}
          maskClosable={false}
          onCancel={handleCancel}
          centered
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tên bài mới"
              name="name"
              rules={[
                { required: true, message: "Tên bài không được để trống!" },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Link video"
              name="link"
              rules={[{ required: true, message: "Thiếu đường dẫn video!" }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            {/* <Form.Item
              label="Upload video"
              name="link"
              rules={[
                { required: true, message: "Video không được để trống!" },
              ]}
              hasFeedback
            >
              <input
                type="file"
                className="img-input"
                accept="video/mp4,video/x-m4v,video/*"
                onChange={handleFileChange}
              />
            </Form.Item> */}
            <Form.Item label="Trạng thái" name="status">
              <Select
                placeholder="Trạng thái..."
                defaultValue="Có hiệu lực"
                disabled
              >
                <Option value="Có hiệu lực">Có hiệu lực</Option>
                <Option value="Hết hiệu lực">Hết hiệu lực</Option>
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
