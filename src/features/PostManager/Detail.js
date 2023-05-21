import React, { useState, useEffect } from "react";
import { message, Popconfirm, Skeleton } from "antd";
import { sendDelete, sendGet, sendPut } from "../../utils/api";
import { useParams, useHistory } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
function Detail() {
  const [data, setData] = useState({});
  const params = useParams();
  const history = useHistory();
  const handleDelete = async (key) => {
    // eslint-disable-next-line no-unused-vars
    const del = await sendDelete(`/posts/admin/${params.id}`);
    if (del.statusCode === 200) {
      history.push("/quan-ly-bai-viet");
      message.success("Xóa bài viết")
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };

  const handlePost = async (value) => {
    // eslint-disable-next-line no-unused-vars
    const post = await sendPut(`/posts/admin`, {
      postId: parseInt(params.id),
      status: value,
    });
    if (post.statusCode == 200) {
      history.push("/quan-ly-bai-viet");
      message.success("Cập nhật trạng thái bài viết")
    }

  };
  const handleView = async () => {
    const view = await sendGet(`/posts/admin/${params.id}`);
    if (view.statusCode === 200) {
      setData(view?.returnValue?.data);
    } else {
      message.error("Lỗi kĩ thuật");
    }
  };
  useEffect(() => {
    handleView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("data", data);
  // if (!Object.keys(data).length) return <>loader</>;
  return (
    <>
      <LayoutAdmin>
        {data ? <div className="Detail-UnProcessBlog-wrapper">
          <div className="title">
            <h1>Kiểm duyệt bài viết</h1>
            <div className="action">
              <button>
                <Popconfirm
                  title="Từ chối bài viết?"
                  onConfirm={() => handlePost("REJECTED")}
                >
                  Từ chối
                </Popconfirm>
              </button>
              <button>
                <Popconfirm
                  title="Xóa bài viết?"
                  onConfirm={() => handleDelete()}
                >
                  Xóa
                </Popconfirm>
              </button>
              <button onClick={() => history.goBack()}>Trở về</button>
              <button onClick={() => handlePost("ACTIVE")}>Duyệt</button>
            </div>
          </div>
          <h2>Tiêu đề: {data?.title}</h2>
          <h2>Topic: {data?.topic}</h2>
          <h3>Tác giả: {data?.author?.username}</h3>
          <img src={data?.image} alt="ảnh mô tả" />
          <div className="content">
            <p>Nội dung: </p>
            <p dangerouslySetInnerHTML={{ __html: data?.currentContent }} />
          </div>
        </div> : <Skeleton />}


      </LayoutAdmin>
    </>
  );
}

export default Detail;
