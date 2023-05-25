/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Form, Select, Input, Button, Skeleton, InputNumber } from "antd";
import ListLesson from "./ListLesson";
import { useParams, useHistory } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
const { Option } = Select;

const { TabPane } = Tabs;
export default function CourseItem() {
  const [infoCourse, setinfoCourse] = useState({});
  const [imageUrl, setImageUrl] = useState();
  const params = useParams();
  const history = useHistory();
  const onFinish = async (values) => {
    values.img = await handleGetImage(); // => values.img = undefined
    console.log(values);
    if (values.img) {
      let update = await sendPut(`/courses/${params.id}`, values);
      if (update.statusCode === 200) {
        history.push("/quan-ly-khoa-hoc");
      }
    } else console.log("vao day"); // => vào else
  };
  async function getInfoCourse() {
    const res = await sendGet(`/courses/${params.id}`);
    setinfoCourse(res.returnValue.data);
    setImageUrl(res.returnValue.data.img);
  }
  useEffect(() => {
    getInfoCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleGetImage = async () => {
    const { files } = document.querySelector(".img-input");
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "descriptionCourse");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/learnit2022/image/upload",
        formData
      );
      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  if (!Object.keys(infoCourse).length)
    return (
      <div className="example">
        <Skeleton />
      </div>
    );
  return (
    <>
      <LayoutAdmin>
        <div className="CourseManagement-wrapper ManagerUser-wrapper">
          <h1>Thông tin chi tiết khóa học</h1>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin" key="1">
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  initialValue={infoCourse?.name}
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
                <div className="group">
                  <Form.Item
                    name="type"
                    label="Trạng thái khóa học"
                    rules={[{ required: true, message: "Trạng thái khóa học" }]}
                    initialValue={infoCourse?.type}
                    hasFeedback
                  >
                    <Select placeholder="Chọn trình độ phù hợp...">
                      <Option value="1">VIP </Option>
                      <Option value="0">NORMAL </Option>
                      <Option value="2">INCOMMING </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="path"
                    label="Lộ trình"
                    initialValue={infoCourse?.path}
                  >
                    <Select
                      placeholder="Chọn lộ trình phù hợp..."
                      defaultValue="Frontend"
                    >
                      <Option value="FRONTEND">Front-end</Option>
                      <Option value="BACKEND">Back-end</Option>
                      <Option value="FULLSTACK">FullStack</Option>
                      <Option value="BASIC">Basic</Option>
                      <Option value="OTHER">Other</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="group">
                  <Form.Item
                    name="level"
                    label="Trình độ"
                    initialValue={infoCourse?.type}
                  >
                    <Select
                      placeholder="Chọn trình độ phù hợp..."
                      defaultValue="1"
                      aria-readonly
                    >
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
                    initialValue={infoCourse?.language}
                  >
                    <Select placeholder="Ngôn ngữ">
                      <Option value="c">C </Option>
                      <Option value="java">JAVA </Option>
                      <Option value="python3">PYTHON </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="status"
                    label="Trạng thái"
                    initialValue={infoCourse?.status}
                  >
                    <Select
                      placeholder="Chọn trạng thái"
                      defaultValue="1"
                      aria-readonly
                    >
                      <Option value="1">Có hiệu lực</Option>
                      <Option value="0">Hết hiệu lực</Option>
                    </Select>
                  </Form.Item>
                </div>{" "}
                <Form.Item
                  name="description"
                  label="Mô tả về khóa học"
                  initialValue={infoCourse?.description}
                >
                  <Input.TextArea />
                </Form.Item>
                <div className="group">
                  {" "}
                  <Form.Item
                    name="goal"
                    label="Mục tiêu"
                    initialValue={infoCourse?.goal}
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item
                    name="requirement"
                    label="Yêu cầu"
                    initialValue={infoCourse?.requirement}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </div>
                <Form.Item
                  name="price"
                  label="Giá cả"
                  initialValue={infoCourse?.price}
                >
                  <InputNumber placeholder="Nhập giá tiền" />
                </Form.Item>
                <Form.Item
                  initialValue={imageUrl}
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
                    onChange={onImageChange}
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
                <Form.Item>
                  <div className="update">
                    <Button className="btn-update" htmlType="submit">
                      Cập nhật
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Bài giảng" key="2">
              <ListLesson />
            </TabPane>
          </Tabs>
        </div>
      </LayoutAdmin>
    </>
  );
}
