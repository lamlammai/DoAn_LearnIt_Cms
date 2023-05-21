import React from "react";
import { Row, Col } from "antd";
import TodoWork from "../components/TodoList/TodoWork";
import Chart from "../components/Chart/Chart";
import LayoutAdmin from "../components/LayoutAdmin/LayoutAdmin";
function Admin() {
  return (
    <>
      <LayoutAdmin>
        <h1>Hoạt động</h1>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="Statistics-Row"
        >
          <Col className="gutter-row Statistics-col Statistics-col" span={6}>
            <div className="Card" style={{ background: "#17A2B8" }}>
              <i className="icon fas fa-laptop-code"></i>
              <div className="main">
                <h3>Hi</h3>
                <h1>10.000</h1>
                <p>
                  <i class="fas fa-chevron-down"></i>10%
                </p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row Statistics-col" span={6}>
            <div className="Card" style={{ background: "#28A745" }}>
              <i className="icon fas fa-thumbs-up"></i>
              <div className="main">
                <h3>Hi</h3>
                <h1>10.000</h1>
                <p>
                  <i class="fas fa-chevron-down"></i>10%
                </p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row Statistics-col" span={6}>
            <div className="Card" style={{ background: "#FFC107" }}>
              <i className="icon far fa-comments"></i>
              <div className="main">
                <h3>Hi</h3>
                <h1>10.000</h1>
                <p>
                  <i class="fas fa-chevron-down"></i>10%
                </p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row Statistics-col" span={6}>
            <div className="Card" style={{ background: "#DC3545" }}>
              <i className="icon fas fa-user-graduate"></i>
              <div className="main">
                <h3>Hi</h3>
                <h1>10.000</h1>
                <p>
                  <i class="fas fa-chevron-down"></i>10%
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={7} xl={7}>
            <TodoWork />
          </Col>
          <Col xs={24} sm={24} md={24} lg={17} xl={17}>
            <Chart />
          </Col>
        </Row>
      </LayoutAdmin>
    </>
  );
}

export default Admin;
