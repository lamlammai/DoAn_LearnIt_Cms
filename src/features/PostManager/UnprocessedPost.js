import React, { useEffect, useState } from "react";
import { Table, Tag, Tabs, Space, Popconfirm, message } from "antd";
import { sendDelete, sendGet } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function UnprocessPost() {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "40px",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "25%",
      // thay doi
      render: (_, record) => <p>{record?.title}</p>,
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
      render: (tags) => (
        <>
          {Array.isArray(tags) &&
            tags.map((tag) => {
              let color;
              if (tag === "Frontend") {
                color = "red";
              }
              if (tag === "Backend") {
                color = "green";
              }
              if (tag === "FullStack") {
                color = "yellow";
              } else {
                color = "pink";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          {typeof tags === "string" && (
            <Tag color="pink" key={tags}>
              {tags.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (_, record) => (
        <Space size="middle">
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            <Link
              to={`/xu-ly-bai-viet/${record?.id}`}
              style={{ color: "#fff" }}
            >
              Xem
            </Link>
          </div>
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            {data?.length >= 1 ? (
              <Popconfirm
                title="Xóa bài viết?"
                onConfirm={() => handleDelete(record?.id)}
              >
                Xóa
              </Popconfirm>
            ) : null}
          </div>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState();
  const handleDelete = async (key) => {
    await sendDelete(`/posts/admin/`, { id: key });
  };
  const pendingTopic = async () => {
    const res = await sendGet("/posts/admin", {
      status: "PENDING",
    });
    if (res.statusCode === 200) {
      setData(res.returnValue?.data?.data);
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };
  useEffect(() => {
    pendingTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ y: 320 }} />
    </>
  );
}

export default UnprocessPost;
