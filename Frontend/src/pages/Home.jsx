import React from 'react';

export default function Home() {
  return (
    <div className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-3xl md:text-6xl font-bold text-center text-black">CodeFlow</h1>
      <h2 className="text-2xl md:text-6xl font-bold text-center text-black">Collaborative Code Editor </h2>

      <p className="text-gray-600 text-center">
        Compiler HTML, CSS, JavaScript Code on the go and share it with your
        friends
      </p>
    </div>
  );
}
