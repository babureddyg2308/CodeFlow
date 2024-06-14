// import { useState } from 'react'
// // import { form } from './components/form'

// import './App.css'
// import Home from './pages/Home'
// import Header from './components/Header'
// // import Compiler from './pages/Compiler'
// // import Button from './components/ui/button'
// // import { Avatar } from '@radix-ui/react-avatar'
// import { Avatar } from './components/ui/Avatar'
// // import Sheet from './components/ui/Sheet'
// // import {Input} from './components/ui/input'
// import Resizable from './components/ui/Resizable'
// import { Separator } from '@radix-ui/react-separator'
//  import Loader from './components/Loader/Loader'
// import CodeEditor from './components/CodeEditor'
// import CodeItem from './components/CodeItem'
// import HelperHeader from './components/HelperHeader'
// import RenderCode from './components/RenderCode'
// import { ThemeProvider } from './components/theme-provider'
// import { Button } from './components/ui/Button'
// import { Input } from './components/ui/Input'
// // import Input from 'postcss/lib/input'
// // import Input from 'postcss/lib/input'
// // import { Input } from 'postcss'
//  function App() {
   

//   return (
//     <>
//      <Header/>
//      {/* <Input/> */}
//        {/* <form/> */}
//        {/* <Home/> */}
//        {/* <Compiler/> */}
//  {/* <Header/> */}
//  {/* <Button/> */}
//  {/* <Avatar/> */}
// {/* <button/> */}
//  {/* <Sheet/> */}
//  {/* <dialog/> */}

//  {/* <input/> */}
//  {/* <label/> */}
//  {/* <resizable/> */}

//  {/* < select/>
// <separator/>
// <sonner/> */}
// {/* 
// <Loader/>
// <CodeEditor/>
// <CodeItem/>
// <HelperHeader/>
// <RenderCode/>
// <ThemeProvider/> */}
//     </>
//   )
// }

// export default App

import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";
import AllRoutes from "./AllRoutes";

function App() {
  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    } else if (error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
  }, [data, error]);

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
