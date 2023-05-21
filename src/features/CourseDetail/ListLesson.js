import { Table, Space, Popconfirm, message, Skeleton } from "antd";
import ModalAddLesson from "../../components/Modal-ThongtinKH/ModalAddLesson";
import { sendDelete, sendGet } from "../../utils/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function ListLesson() {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "7%",
      render: (_, value, index) => <p>{index + 1}</p>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "35%",
    },
    {
      title: "Link bài giảng",
      dataIndex: "link",
      key: "link",
      width: "25%",
      render: (_, value) => (
        <a href={value.link} target="_blank" rel="noreferrer">
          <p>{value.link}</p>
        </a>
      ),
    },
    {
      title: "Bài tập",
      dataIndex: "excercises",
      key: "excercises",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (_, record) => (
        <>
          <Space size="middle">
            <div
              className="action"
              style={{ backgroundColor: "rgb(246 24 24)", color: "#fff" }}
            >
              <Link
                to={`/chi-tiet-bai-hoc/${record.id}`}
                style={{ color: "#fff" }}
              >
                Sửa
              </Link>
            </div>
            <div className="action" style={{ backgroundColor: "#1890ff" }}>
              {lesson.length >= 1 ? (
                <Popconfirm
                  title="Xóa bài giảng?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  Xóa
                </Popconfirm>
              ) : null}
            </div>
          </Space>
        </>
      ),
    },
  ];
  const [lesson, setLesson] = useState([]);
  const params = useParams();
  const handleDelete = async (key) => {
    const del = await sendDelete(`/lessons/admin/${params.id}/${key}`);
    if (del.status === 200) {
      await getLesson();
    } else {
      message.error("Cập nhật bài tập thất bại");
    }
  };
  async function getLesson() {
    const res = await sendGet(`/lessons/admin/`, { courseId: params.id });
    if (res.statusCode === 200) {
      setLesson(res.returnValue.data?.lessons);
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
      <ModalAddLesson getListLesson={getLesson} />
      <Table
        className="components-table-demo-nested"
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={lesson}
        scroll={{ y: 320 }}
      />
    </>
  );
}
