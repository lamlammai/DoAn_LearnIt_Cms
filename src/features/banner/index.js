import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Popconfirm, message } from "antd";
import { sendDelete, sendGet } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";

function Banner() {
  const dataFake = [
    {
      title: "Banner 1",
      desc: "Mô tả",
      id: "123456",
      author: "Tác giả 1",
      link: "https://ant.design/components/icon",
    },
    {
      title: "Banner 1",
      desc: "Mô tả",
      id: "123456",
      author: "Tác giả 1",
      link: "https://ant.design/components/icon",
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "7%",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "author",
      width: "30%",
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
            {dataFake.length >= 1 ? (
              <Popconfirm
                title="Xóa bài viết?"
                onConfirm={() => handleDelete(record._id)}
              >
                Xóa
              </Popconfirm>
            ) : null}
          </div>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState({});
  const handleDelete = async (key) => {
    await sendDelete(`/api/blog/${key}`);
    const res = await sendGet("/api/blog");
    if (res.status === 200) {
      setData(res.data);
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };
  const handleView = async (key) => {
    const res = await sendGet(`api/blog/${key}`);
    if (res.status === 200) {
      await listTopic();
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };
  const listTopic = async () => {
    const res = await sendGet("/api/blog");
    if (res.status === 200) {
      setData(res.data);
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };
  useEffect(() => {
    listTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const res = [];
  for (let i = 0; i < data.length; i++) {
    res.push({
      key: i + 1,
      _id: data[i]._id,
      title: data[i].title,
      author: data[i].author.name,
      topic: data[i].topic.split("-"),
    });
  }
  return (
    <>
      <LayoutAdmin>
        <div className="ManagerUser-wrapper">
          <h1>Tất cả bài viết</h1>
          <Table columns={columns} dataSource={dataFake} scroll={{ y: 320 }} />
        </div>
      </LayoutAdmin>
    </>
  );
}

export default Banner;
