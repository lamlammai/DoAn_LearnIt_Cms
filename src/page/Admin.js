import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tag, message } from "antd";
import { Chart } from "react-google-charts";
import LayoutAdmin from "../components/LayoutAdmin/LayoutAdmin";
import { sendGet } from "../utils/api";

function Admin() {
  const [info, setInfo] = useState();
  const [trans, setTransaction] = useState();
  const [chat, setChat] = useState();

  const data1 = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Mã giao dịch",
      dataIndex: "transactionCode",
      key: "transactionCode",
      render: (_, record) => (
        <p>
          {record.transactionCode
            ? `${record?.wallet} - ${record?.transactionCode}`
            : record?.wallet}
        </p>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "wallet",
      key: "wallet",
      render: (_, record) => (
        <p>{record?.type == "DEPOSIT" ? "Nạp tiền" : "Mua khóa học"}</p>
      ),
    },
    {
      title: "Số tiền/xu",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <p>
          {record?.type == "DEPOSIT"
            ? `${record?.amount} đ`
            : `${record?.amount} xu`}
        </p>
      ),
    },
  ];
  const systems = async () => {
    try {
      const res = await sendGet(`/statistic/systems`);
      if (res.statusCode == 200) {
        setInfo(res?.returnValue?.data);
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
    }
  };
  const transaction = async () => {
    try {
      const res = await sendGet(`/statistic/transaction`);
      if (res.statusCode == 200) {
        setTransaction(res?.returnValue?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const chart = async () => {
    try {
      const res = await sendGet(`/statistic/chart`);
      if (res.statusCode == 200) {
        setChat(res?.returnValue?.data);
        console.log(res?.returnValue?.data);
        setChat([
          ["Element", "Học viên"],
          ...res?.returnValue?.data?.slice(0, 5),
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const options = {
    title: "",
    series: {
      5: { targetAxisIndex: 1 },
    },
  };
  useEffect(() => {
    systems();
    transaction();
    chart();
  }, []);
  return (
    <>
      <LayoutAdmin>
        <h1 style={{ fontSize: "25px", fontWeight: "600" }}>Hoạt động</h1>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="Statistics-Row"
        >
          <Col
            className="gutter-row Statistics-col Statistics-col"
            span={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <div
              className="Card"
              style={{ background: "rgb(23 162 184 / 45%)" }}
            >
              <i className="icon far fa-comments"></i>

              <div className="main">
                <h1>{info?.courses}</h1>
                <h3>Khóa học</h3>
              </div>
            </div>
          </Col>
          <Col
            className="gutter-row Statistics-col"
            span={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <div
              className="Card"
              style={{ background: "rgb(40 167 69 / 54%)" }}
            >
              <i className="icon fas fa-thumbs-up"></i>
              <div className="main">
                <h1>{info?.lessons}</h1>
                <h3>Bài học</h3>
              </div>
            </div>
          </Col>
          <Col
            className="gutter-row Statistics-col"
            span={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <div
              className="Card"
              style={{ background: "rgb(255 193 7 / 55%)" }}
            >
              <i className="icon fas fa-laptop-code"></i>
              <div className="main">
                <h1>{info?.lessons}</h1>
                <h3>Bài tập</h3>
              </div>
            </div>
          </Col>
          <Col
            className="gutter-row Statistics-col"
            span={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <div
              className="Card"
              style={{ background: "rgb(220 53 69 / 66%)" }}
            >
              <i className="icon fas fa-user-graduate"></i>
              <div className="main">
                <h1>{info?.users}</h1>
                <h3>User</h3>
              </div>
            </div>
          </Col>
          <Col
            className="gutter-row Statistics-col"
            span={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <div
              className="Card"
              style={{ background: "rgb(160 53 220 / 37%)" }}
            >
              <i className="icon fas fa-user-graduate"></i>
              <div className="main">
                <h1>{info?.posts}</h1>
                <h3>Bài viết</h3>
              </div>
            </div>
          </Col>
          <Col
            className="gutter-row Statistics-col"
            span={12}
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <div
              className="Card"
              style={{ background: "rgb(53 75 220 / 54%)" }}
            >
              <i className="icon fas fa-user-graduate"></i>
              <div className="main">
                <h1>{info?.comments}</h1>
                <h3>Comment</h3>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <h3>Giao dịch</h3>
            <Table columns={columns} dataSource={trans} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <h3>Thống kê số học viên từng khóa học</h3>
            {chat && (
              <Chart
                chartType="ColumnChart"
                width="100%"
                options={options}
                data={chat}
              />
            )}
          </Col>
        </Row>
      </LayoutAdmin>
    </>
  );
}

export default Admin;
