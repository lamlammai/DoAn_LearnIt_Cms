/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Popconfirm } from "antd";
import ModalEditAdmin from "../../components/ModalUser/ModalEditAdmin";
import { message } from "antd";
import { sendDelete, sendGet } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import ModalAddAdmin from "../../components/ModalUser/ModalAddAdmin";

function ManagerAdmin() {
  const [data, setData] = useState([]);
  const dataClone = [
    {
      name: "Nguyễn Văn A",
      email: "tets@gmail.com",
      roles: "ADMIN",
    },
    {
      name: "Nguyễn Văn A",
      email: "tets@gmail.com",
      roles: "MOD",
    },
    {
      name: "Nguyễn Văn A",
      email: "tets@gmail.com",
      roles: "ADMIN",
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "7%",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Họ tên",
      dataIndex: "username",
      key: "username",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Chức vụ",
      key: "roles",
      dataIndex: "role",
      width: "10%",
      render: (_, record) => (
        <>
          {record.role == "MOD" ? (
            <>
              {record.role}- {record.permision?.level}
            </>
          ) : (
            "ADMIN"
          )}
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (_, record) => (
        <>{record.status == 1 ? "Đang hoạt động" : "Bị khóa"}</>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "25%",
      render: (_, record) => (
        <Space size="middle">
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            {data.length >= 1 ? (
              <Popconfirm
                title="Xóa tài khoản này?"
                onConfirm={() => handleDelete(record.id)}
              >
                Xóa
              </Popconfirm>
            ) : null}
          </div>
          {record?.role == "MOD" && (
            <div
              className="action"
              style={{ backgroundColor: "rgb(255 79 32)" }}
            >
              <ModalEditAdmin data={record} list={listAdmin} />
            </div>
          )}
        </Space>
      ),
    },
  ];

  const handleDelete = async (key) => {
    try {
      let res = await sendDelete(`/admin/${key}`);
      if (res.statusCode === 200) {
        await listAdmin();
      } else {
        message.error("Xóa tài khoản thất bại");
      }
    } catch (error) {
      message.error("Xóa tài khoản thất bại");
    }
  };
  const listAdmin = async () => {
    try {
      const res = await sendGet("/admin");
      if (res.statusCode === 200) {
        setData(res.returnValue?.data?.data);
      } else {
        message.error("Cập nhật Admin thất bại");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
    }
  };
  useEffect(() => {
    listAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LayoutAdmin>
        <div className="ManagerUser-wrapper">
          <h1>Quản lý Admin</h1>
          <ModalAddAdmin listAdmin={listAdmin} />
          <Table columns={columns} dataSource={data} scroll={{ y: 320 }} />
        </div>
      </LayoutAdmin>
    </>
  );
}

export default ManagerAdmin;
