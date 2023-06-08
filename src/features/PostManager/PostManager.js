import React, { useEffect, useState } from "react";
import { Table, Tag, Tabs, Space, Popconfirm, message, Skeleton } from "antd";
import { sendDelete, sendGet } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import UnprocessPost from "./UnprocessedPost";
import UpdatePost from "./UpdatePost";

function PostManager() {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "7%",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "25%",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: "30%",
      render: (_, record) => (
        <>
          {record?.author?.id} - {record?.author?.username}
        </>
      ),
    },
    {
      title: "Chủ đề",
      dataIndex: "topic",
      key: "topic",
      width: "23%",
    },
    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (_, record) => (
        <div className="action" style={{ backgroundColor: "#1890ff" }}>
          {data?.length >= 1 ? (
            <Popconfirm
              title="Xóa bài viết?"
              onConfirm={() => handleDelete(record.id)}
            >
              Xóa
            </Popconfirm>
          ) : null}
        </div>
      ),
    },
  ];
  const [data, setData] = useState();
  const handleDelete = async (key) => {
    try {
      let res = await sendDelete(`/posts/admin/${key}`);
      if (res.statusCode === 200) {
        await listTopic();
      } else {
        message.error("Lỗi kĩ thuật");
      }
    } catch (error) {
      message.error("Không thể xóa bài viết");
    }
  };
  const listTopic = async () => {
    try {
      const res = await sendGet("/posts/admin", {
        status: "ACTIVE",
      });
      if (res.statusCode === 200) {
        setData(res.returnValue?.data?.data);
      } else {
        message.error("Lỗi kĩ thuật");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
    }
  };
  useEffect(() => {
    listTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if (!Object.keys(data).length)
  //   return (
  //     <div className="example">
  //       <Skeleton />
  //     </div>
  //   );
  return (
    <>
      <LayoutAdmin>
        <div className="ManagerUser-wrapper">
          <h1>Quản lý bài viết</h1>
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane tab="Chưa xử lý" key="2">
              <UnprocessPost />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Duyệt lại" key="3">
              <UpdatePost />
            </Tabs.TabPane>{" "}
            <Tabs.TabPane tab="Danh sách bài viết" key="1">
              <Table columns={columns} dataSource={data} scroll={{ y: 320 }} />
            </Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </LayoutAdmin>
    </>
  );
}

export default PostManager;
