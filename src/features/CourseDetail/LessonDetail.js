/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Skeleton, message } from "antd";
import { useParams } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import ListExercise from "./ListExercise";
import axios from "axios";
export default function LessonDetail() {
  const params = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState();
  const [lesson, setLesson] = useState({});
  const [exercises, setExercises] = useState([]);
  const onFinish = async (values) => {
    values.lessonId = parseInt(params.id);
    // values.link = await handleGetLinkVideo();
    const res = await sendPut(`/lessons/admin`, values);
    if (res.statusCode === 200) {
      message.success("Update bài học thành công");
    } else {
      message.error("Cập nhật khóa học thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    setFile(file);
  }, [file]);
  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
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
      return lesson?.link;
    }
  };
  async function getLesson() {
    const res = await sendGet(`/lessons/admin/${params.id}`);
    if (res.statusCode === 200) {
      setLesson(res.returnValue.data);
      setExercises(res.returnValue.data?.exercises);
    } else {
      message.error("Cập nhật bài tập thất bại");
    }
  }
  useEffect(() => {
    getLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!Object.keys(lesson).length)
  //   return (
  //     <div className="example">
  //       <Skeleton />
  //     </div>
  //   );
  return (
    <>
      <LayoutAdmin>
        <div className="CourseManagement-wrapper ManagerUser-wrapper">
          <h1>Thông tin chi tiết bài học</h1>
          {Object.keys(lesson).length ? (
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
                {/* <Input readOnly /> */}
                <Input />
              </Form.Item>
              {/* <Form.Item label="Upload video" name="link" hasFeedback>
                <input
                  type="file"
                  className="img-input"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={handleFileChange}
                />
              </Form.Item> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "10px",
                }}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ) : (
            <Skeleton />
          )}

          <h1>Bài tập</h1>
          <ListExercise exercises={exercises} getLesson={getLesson} />
        </div>
      </LayoutAdmin>
    </>
  );
}
