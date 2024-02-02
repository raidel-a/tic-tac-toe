// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

// export default function Home() {
//   return (
//     <main>
//      <div className='flex justify-center items-center h-screen bg-slate-700'>
//       <div className='box relative w-[200px] h-[200px] bg-slate-800 overflow-hidden'>
//         </div>
//         </div>
//     </main>
//   );
// }

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-6 border-[12px] p-6">

        <div className="border p-6 hover:bg-orange-500"></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </main>
  );
}