import React, { useState } from "react";
import { Table, Badge, Space, Popconfirm, message, Tabs } from "antd";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import { sendGet, sendPost, sendPut } from "../../utils/api";
import { useEffect } from "react";

export default function Report() {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "10%",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Bài viết",
      dataIndex: "post",
      key: "post",
      width: "30%",
      render: (_, record) => (
        <a href="#" target="_blank" rel="noreferrer">
          {record?.post?.title}
        </a>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "reason",
      key: "reason",
      width: "23%",
    },
    {
      title: "Người báo cáo",
      key: "user",
      dataIndex: "user",
      width: "17%",
      render: (_, record) => (
        <>
          {record?.reportedBy?.id} - {record?.reportedBy?.username}
        </>
      ),
    },
    {
      title: "Thời gian báo cáo",
      key: "time",
      dataIndex: "time",
      width: "17%",
      render: (_, record) => <>{record?.createdAt}</>,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "17%",
      filters: [
        {
          text: "Chưa xử lý",
          value: 0,
        },
        {
          text: "Đã xử lý",
          value: 1,
        },
        {
          text: "Đang xử lý",
          value: 2,
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,

      render: (status) => (
        <>
          {status == 0 ? (
            <Badge color="red" text="Chưa xử lý" />
          ) : status == 1 ? (
            <Badge color="green" text="Đã xử lý" />
          ) : (
            <Badge color="yeallow" text="Đang xử lý" />
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
            {data?.length >= 1 ? (
              <Popconfirm
                title="Xóa bài viết?"
                onConfirm={() => handleChangeStatus(record.id, "DELETE_POST")}
              >
                Xóa
              </Popconfirm>
            ) : null}
          </div>
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            {data?.length >= 1 ? (
              <Popconfirm
                title="Bỏ qua bài viết?"
                onConfirm={() => handleChangeStatus(record.id, "SKIP")}
              >
                Bỏ qua
              </Popconfirm>
            ) : null}
          </div>
          <div className="action" style={{ backgroundColor: "#1890ff" }}>
            Xem
          </div>
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "10%",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Nội dung",
      dataIndex: "reason",
      key: "reason",
      width: "23%",
    },
    {
      title: "Người báo cáo",
      key: "user",
      dataIndex: "user",
      width: "17%",
      render: (_, record) => (
        <>
          {record?.reportedBy?.id} - {record?.reportedBy?.username}
        </>
      ),
    },
    {
      title: "Thời gian báo cáo",
      key: "time",
      dataIndex: "time",
      width: "17%",
      render: (_, record) => <>{record?.createdAt}</>,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: "17%",
      filters: [
        {
          text: "Chưa xử lý",
          value: 0,
        },
        {
          text: "Đã xử lý",
          value: 1,
        },
        {
          text: "Đang xử lý",
          value: 2,
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,

      render: (status) => (
        <>
          {status == 0 ? (
            <Badge color="red" text="Chưa xử lý" />
          ) : status == 1 ? (
            <Badge color="green" text="Đã xử lý" />
          ) : (
            <Badge color="yeallow" text="Đang xử lý" />
          )}
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const handleChangeStatus = async (key, status) => {
    try {
      let res = await sendPut("/reports/admin/post", {
        action: status,
        reportId: key,
      });
      if (res.statusCode === 200) {
        message.success("Thay đổi trạng thaid thành công");
        await getListReport();
      } else {
        message.error("Lỗi kĩ thuật");
      }
    } catch (error) {
      message.error("Lỗi kĩ thuật");
    }
  };
  const getListReport = async () => {
    try {
      let res = await sendGet("/reports/admin/post", { limit: 100 });
      if (res.statusCode === 200) {
        setData(res.returnValue?.data?.data.filter((item) => item.status == 0));
        setData1(
          res.returnValue?.data?.data.filter((item) => item.status == 1)
        );
      } else {
        message.error("Lỗi kĩ thuật");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      } else {
        message.error("Có lỗi hệ thống");
      }
    }
  };
  useEffect(() => {
    getListReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LayoutAdmin>
        <div className="ManagerUser-wrapper">
          <h1>Bài viết báo cáo</h1>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Chưa xử lý" key="1">
              <Table columns={columns} dataSource={data} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã sử lý" key="2">
              <Table columns={columns1} dataSource={data1} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </LayoutAdmin>
    </>
  );
}
