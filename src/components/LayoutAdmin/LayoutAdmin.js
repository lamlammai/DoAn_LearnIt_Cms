import React, { useState } from "react";
import { Layout, Menu, Dropdown, Badge, Breadcrumb } from "antd";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { logo, logo1 } from "../../constants/images";

import {
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  PieChartOutlined,
  FolderOpenOutlined,
  UserSwitchOutlined,
  FileSyncOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

import { clearRefreshToken, clearToken, setItem } from "../../utils/storage";
import { useHistory } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

export default function LayoutAdmin({ children }) {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(false);
  // useEffect(() => {
  const handleSearch = () => {
    setActive(true);
  };
  const handleCancel = () => {
    setActive(false);
  };
  // }, [active]);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const SignOut = () => {
    clearToken();
    clearRefreshToken();
    setItem("user", "");
    history.replace("/dang-nhap");
  };
  const menu = (
    <Menu style={{ width: "190px" }}>
      <Menu.Item key={1}>
        <Link to="/">Trang chủ</Link>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined />} key={2} disabled>
        <Link to="#">Cài đặt</Link>
      </Menu.Item>
      <Menu.Item disabled key={3}>
        <Link to="#">Hỗ trợ</Link>
      </Menu.Item>
      <Menu.Item danger onClick={SignOut} key={4}>
        <p>Đăng xuất</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="LayoutAdmin-wrapper">
      <Layout>
        {/* sidebar */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <Link>
              {collapsed ? (
                <img src={logo1} alt="logo" style={{ width: "110px" }} />
              ) : (
                <img src={logo1} alt="logo" />
              )}
            </Link>
          </div>

          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <NavLink to="/"> Thống kê</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileSyncOutlined />}>
              <NavLink to="/quan-ly-khoa-hoc">Khóa học</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserSwitchOutlined />}>
              <NavLink to="/quan-ly-user">Quản lý User</NavLink>
            </Menu.Item>
            <Menu.Item key="7" icon={<UserSwitchOutlined />}>
              <NavLink to="/quan-ly-admin">Quản lý Admin</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<FolderOpenOutlined />}>
              <NavLink to="/quan-ly-bai-viet">Quản lý bài viết</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<FolderOpenOutlined />}>
              <NavLink to="/quan-ly-bao-cao">Quản lý báo cáo</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="6" icon={<FileImageOutlined />}>
              <NavLink to="/quan-ly-banner">Quản lý Banner</NavLink>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, display: "flex" }}
          >
            <div className="header-left">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
              <div
                className={classNames("search-wrapper", {
                  active: active,
                })}
              >
                <div className="input-holder">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm gì đó..."
                  />
                  <button onClick={handleSearch} className="search-icon">
                    <span></span>
                  </button>
                </div>
                <button className="close" onClick={handleCancel}></button>
              </div>
            </div>
            <div className="header-right">
              <Badge dot>
                <BellOutlined style={{ fontSize: 16 }} />
              </Badge>
              <Dropdown overlay={menu} menu={menu}>
                <Link
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={logo} alt="avt" />
                </Link>
              </Dropdown>
            </div>
          </Header>
          {/*  Breadcrumb*/}
          <Breadcrumb style={{ margin: "14px 0 0 18px" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/quan-ly-khoa-hoc">Course</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="#">...</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Detail</Breadcrumb.Item>
          </Breadcrumb>
          {/* content */}
          <Content
            className="site-layout-background"
            style={{
              margin: "16px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Learn IT ©2023 Created by KMA Team ❤
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
