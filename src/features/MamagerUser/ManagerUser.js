import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Popconfirm } from "antd";
import ModalEditUser from "../../components/ModalUser/ModalEditUser";
import ModalAddUser from "../../components/ModalUser/ModalAddAdmin";
import { message } from "antd";
import { sendDelete, sendGet } from "../../utils/api";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";

function ManagerUser() {
  const [data, setData] = useState([]);

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
      title: "Trạng thái",
      dataIndex: "verifyStatus",
      key: "verifyStatus",
      width: "30%",
      render: (_, record) => (
        <>
          {record?.verifyStatus == 1
            ? "Đang hoạt động"
            : record?.verifyStatus == 0
            ? "Chưa kích hoạt"
            : "Bị khóa"}
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
            {data.length >= 1 ? (
              <Popconfirm
                title="Xóa người dùng?"
                onConfirm={() => handleDelete(record.id)}
              >
                Xóa
              </Popconfirm>
            ) : null}
          </div>
          <div className="action" style={{ backgroundColor: "rgb(255 79 32)" }}>
            <ModalEditUser data={record} list={listUser} />
          </div>
        </Space>
      ),
    },
  ];

  const handleDelete = async (key) => {
    let res = await sendDelete(`/users/${key}`);
    if (res.statusCode === 200) {
      message.success("Xóa tài khoản thàn công");
      await listUser();
    } else {
      message.error("Xóa User thất bại");
    }
  };
  const listUser = async () => {
    try {
      const res = await sendGet("/users");
      if (res.statusCode === 200) {
        setData(res.returnValue?.data?.data);
      } else {
        message.error("Cập nhật User thất bại");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
    }
  };
  useEffect(() => {
    listUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LayoutAdmin>
        <div className="ManagerUser-wrapper">
          <h1>Quản lý User</h1>
          <Table columns={columns} dataSource={data} scroll={{ y: 320 }} />
        </div>
      </LayoutAdmin>
    </>
  );
}

export default ManagerUser;
