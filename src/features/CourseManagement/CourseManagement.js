/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import {
  // thay doi
  Tag,
  Badge,
  Space,
  Popconfirm,
  Table,
  message,
} from "antd";
import { Link } from "react-router-dom";
import ModalAddCourse from "../../components/ModalCourse/ModalAddCourse";
import { sendDelete, sendGet } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";

function CourseManagement() {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "7%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "35%",
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
      width: "10%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "10%",
      render: (price) => <>{price == 0 ? "Miễn phí" : <>{price} xu</>}</>,
    },
    {
      title: "Lộ trình",
      dataIndex: "path",
      key: "path",
      width: "15%",
      render: (tags) => (
        <>
          {Array.isArray(tags) &&
            tags.map((tag) => {
              let color;
              if (tag === "FRONTEND") {
                color = "red";
              }
              if (tag === "BACKEND") {
                color = "green";
              }
              if (tag === "FULLSTACK") {
                color = "violet";
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
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "12%",
      render: (status) => (
        <>
          <Badge
            status={status == 1 ? "success" : "error"}
            text={status == 1 ? "Hiển thị" : "Không hiển thị"}
            dot={3}
          />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <div className="action" style={{ backgroundColor: "rgb(255 79 32)" }}>
            <Link
              to={`/chi-tiet-khoa-hoc/${record.id}`}
              style={{ color: "#fff" }}
            >
              Xem
            </Link>
          </div>
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            {res.length >= 1 ? (
              <Popconfirm
                title="Xóa Khóa học?"
                onConfirm={() => handleDelete(record.id)}
              >
                Xóa
              </Popconfirm>
            ) : null}
          </div>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const handleDelete = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const del = await sendDelete(`/courses/${key}`);
    if (del.statusCode === 200) {
      await listCourse();
    } else {
      message.error("Không thể xóa khóa học");
    }
  };
  const listCourse = async () => {
    try {
      const res = await sendGet("/courses");
      if (res.statusCode === 200) {
        setData(res.returnValue.data);
      } else {
        message.error("Cập nhật khóa học thất bại");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
    }
  };
  useEffect(() => {
    listCourse();
  }, []);
  const res = [];
  for (let i = 0; i < data?.length; i++) {
    res.push({
      key: i + 1,
      name: data[i].name,
      path: data[i].path,
      id: data[i].id,
      status: data[i].status,
      language: data[i].language,
      price: data[i].price,
    });
  }
  return (
    <>
      <LayoutAdmin>
        <div className="CourseManagement-wrapper ManagerUser-wrapper">
          <h1>Quản lý khóa học</h1>
          <div className="btn">
            <ModalAddCourse getListCourse={listCourse} />
          </div>
          <Table
            columns={columns}
            dataSource={res}
            rowKey={(record) => record.id}
            scroll={{ y: 320 }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
        </div>
      </LayoutAdmin>
    </>
  );
}

export default CourseManagement;
