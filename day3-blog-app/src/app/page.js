// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
//       <div className="container mx-auto flex flex-col justify-center items-center">
//         <h2 className="text-4xl text-white font-bold mb-4">
//           Browse our blog collection
//         </h2>
//         <Link
//           className="bg-white text-sm text-blue-700 font-semibold py-2 px-6 rounded"
//           href={"/blogs"}
//         >
//           Explore Blogs
//         </Link>
//       </div>
//     </div>
//   );
// }


import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-xl text-center max-w-lg w-[90%] transition-transform hover:scale-[1.02] duration-300">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
          Browse Our <span className="text-blue-600">Blog Collection</span>
        </h2>
        <p className="text-gray-600 mb-8 text-base">
          Discover the latest articles, tutorials, and insights crafted for developers and tech lovers.
        </p>
        <Link
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-md transition-all duration-300"
          href="/blogs"
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
