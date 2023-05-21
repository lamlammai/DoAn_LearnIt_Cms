import { Table, Space, Popconfirm, message, Skeleton } from "antd";
import { sendDelete } from "../../utils/api";
import ModalEditExercise from "../../components/Modal-ThemBaiTap/ModalEditExercise";
import ModalAddExercise from "../../components/Modal-ThemBaiTap/ModalAddExercise";
export default function ListExercise({ exercises, getLesson }) {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "7%",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Đề bài",
      dataIndex: "question",
      key: "question",
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "35%",
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
              <ModalEditExercise
                dataFromParent={record}
                getLesson={getLesson}
              />
            </div>
            <div className="action" style={{ backgroundColor: "#1890ff" }}>
              {exercises.length >= 1 ? (
                <Popconfirm
                  title="Xóa bài tập?"
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

  const handleDelete = async (key) => {
    let del = await sendDelete(`/exercises/${key}`);
    if (del.statusCode === 200) {
      message.error("Xóa thành công");
      await getLesson();
    } else {
      message.error("Cập nhật bài tập thất bại");
    }
  };
  // if (!Object.keys(exercises).length)
  //   return (
  //     <div className="example">
  //       <Skeleton />
  //     </div>
  //   );
  return (
    <>
      <ModalAddExercise getLesson={getLesson} />
      <Table
        className="components-table-demo-nested"
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={exercises}
        scroll={{ y: 320 }}
      />
    </>
  );
}
