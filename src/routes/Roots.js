import { lazy } from "react";
// pages
const Admin = lazy(() => import("../page/Admin"));
const CourseManagement = lazy(() =>
  import("../features/CourseManagement/CourseManagement")
);
const ManagerUser = lazy(() => import("../features/MamagerUser/ManagerUser"));
const CourseDetail = lazy(() =>
  import("../features/CourseDetail/CourseDetail")
);
const PostManager = lazy(() => import("../features/PostManager/PostManager"));
const Report = lazy(() => import("../features/Report/Report"));
const Detail = lazy(() => import("../features/PostManager/Detail"));
const Signin = lazy(() => import("../page/Signin"));
const LessonDetail = lazy(() =>
  import("../features/CourseDetail/LessonDetail")
);
const ManagerAdmin = lazy(() =>
  import("../features/managerAdmin/ManagerAdmin")
);
const ActiveAdmin = lazy(() => import("../features/managerAdmin/ActiveAdmin"));
const UpdatePost = lazy(() => import("../features/PostManager/DetailUpdate"));

/**
 * define main pages routes
 */
const RoutePage = [
  {
    path: "/",
    exact: true,
    component: Admin,
    authen: true,
  },
  {
    path: "/quan-ly-khoa-hoc",
    exact: true,
    component: CourseManagement,
    authen: true,
  },
  {
    path: "/quan-ly-user",
    exact: true,
    component: ManagerUser,
    authen: true,
  },
  {
    path: "/quan-ly-admin",
    exact: true,
    component: ManagerAdmin,
    authen: true,
  },
  {
    path: "/chi-tiet-khoa-hoc/:id",
    exact: true,
    component: CourseDetail,
    authen: true,
  },
  {
    path: "/chi-tiet-bai-hoc/:id",
    exact: true,
    component: LessonDetail,
    authen: true,
  },
  {
    path: "/quan-ly-bai-viet",
    exact: true,
    component: PostManager,
    authen: true,
  },
  {
    path: "/quan-ly-bao-cao",
    exact: true,
    component: Report,
    authen: true,
  },
  {
    path: "/xu-ly-bai-viet/:id",
    exact: true,
    component: Detail,
    authen: true,
  },
  {
    path: "/xu-ly-bai-viet-update/:id",
    exact: true,
    component: UpdatePost,
    authen: true,
  },
  {
    path: "/active-tai-khoan/:token",
    exact: true,
    component: ActiveAdmin,
    // authen: true,
  },
  {
    path: "/dang-nhap",
    exact: true,
    component: Signin,
  },
];
export default RoutePage;
