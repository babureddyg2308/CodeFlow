// import React from 'react';
// import bgimg from '../../public/ImageLogo/bghome.jpg'
// export default function Home() {
//   return (
//     <div className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-3">
//       <h1 className="text-2xl md:text-6xl font-bold text-center text-black">CodeFlow</h1>
//       <h4 className="text-2xl md:text-5xl font-bold text-center text-black">Collaborative Code Editor </h4>

//       <p className="text-gray-600 text-center md:text-2xl">
//         Compiler HTML, CSS, JavaScript Code on the go and share it with your
//         friends
//       </p>
//     </div>
//   );
// }
import React from 'react';
import bgimg from '../../public/ImageLogo/program-background-img.jpg';

export default function Home() {
  return (
    <div
      className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-3"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h4 className="text-2xl md:text-5xl font-bold text-center  ">Welcome To</h4>
      <h1 className="text-2xl md:text-8xl font-bold text-center ">CodeFlow</h1>
      <h4 className="text-2xl md:text-5xl font-bold text-center  ">Collaborative Code Editor</h4>

      <p className="  text-center md:text-2xl ">
        Compile HTML, CSS, JavaScript code on the go and share it with your friends.
      </p>
    </div>
  );
}
