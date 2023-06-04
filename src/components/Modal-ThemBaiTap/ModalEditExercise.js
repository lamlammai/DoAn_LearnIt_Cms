import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { sendGet, sendPut } from "../../utils/api";
import { useParams } from "react-router-dom";
import Loading from "../loading";
export default function ModalEditExercise(props) {
  const params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [excercise, setExercise] = useState({});
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    setIsModalVisible(false);
    //thay doi
    values.exerciseId = props.dataFromParent.id;
    const res = await sendPut(`/exercises`, {
      ...values,
    });
    if (res.statusCode === 200) {
      props.getLesson();
      message.success("Cập thật thành công");
    } else {
      message.error("cập nhật bài tập thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    setIsModalVisible(false);
    console.log("Failed:", errorInfo);
  };
  async function getOneExercise() {
    const res = await sendGet(`/exercises/admin/${props.dataFromParent.id}`);
    if (res.statusCode === 200) {
      setIsModalVisible(true);
      setExercise(res.returnValue.data);
    } else {
      message.error("Cập nhật khóa học thất bại");
    }
  }
  useEffect(() => {
    form.setFieldsValue({
      question: excercise.question,
      description: excercise.description,
      testcases: excercise.testCases,
    });
  }, [form, excercise]);
  return (
    <>
      <div className="">
        <div onClick={getOneExercise} className="title-exercise">
          Sửa
        </div>
        {excercise ? (
          <Modal
            title="Chỉnh sửa bài tập"
            open={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            maskClosable={false}
            width={800}
          >
            <Form
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
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
                {(testcases, { add, remove }) => {
                  return (
                    <div>
                      {testcases?.map((field, index) => (
                        <div
                          className="group"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Item label="Input" name={[index, "input"]}>
                            <TextArea />
                          </Form.Item>
                          <Form.Item label="Output" name={[index, "output"]}>
                            <TextArea />
                          </Form.Item>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </Form.List>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "10px",
                  //: "100px",
                }}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    cập nhật
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
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
