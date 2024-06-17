import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
// import Room from "./Room";
// import HomeRoom from "./components/EditorPage";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Compiler = lazy(() => import("./pages/Compiler"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllCodes = lazy(() => import("./pages/AllCodes"));
const MyCodes = lazy(() => import("./pages/MyCodes"));
// const Room = lazy(()=> import("./Room"))
const HomeRoom = lazy(() => import("./components/HomeRoom"));
const EditorPage = lazy(() => import("./components/EditorPage"));

export default function AllRoutes() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-codes" element={<AllCodes />} />
        <Route path="/my-codes" element={<MyCodes />} />
        <Route path="/compiler/:urlId?" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/room" element={<HomeRoom />} />
        <Route path="/editor/:roomId" element={<EditorPage/>} />
        {/* <Route path="/room" element={<Room/>}/> */}
      </Routes>
    </Suspense>
  );
}
