// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     fullname: "",
//     gender: "",
//     email: "",
//     password: "",
//   });

//   // আলাদা state ফাইলের জন্য
//   const [profilePhoto, setProfilePhoto] = useState(null);

//   // ফর্ম ফিল্ডের পরিবর্তন হ্যান্ডেল
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ফাইল সিলেক্ট হ্যান্ডেল
//   const handleFileChange = (e) => {
//     setProfilePhoto(e.target.files[0]);
//   };

//   // সাবমিট হ্যান্ডেল
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = new FormData();

//       // formData এর সব কী-ভ্যালু FormData তে যোগ করা
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }

//       // যদি ছবি থাকে তাহলে যোগ করো
//       if (profilePhoto) {
//         data.append("profilePhoto", profilePhoto);
//       }

//       // POST রিকোয়েস্ট
//       const res = await axios.post("http://localhost:2512/user/register", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Registration success:", res.data);
//     } catch (error) {
//       console.error("Registration error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
//               Username:
//             </label>
//             <input
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               placeholder="Enter your username"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="fullname" className="block mb-1 font-medium text-gray-700">
//               Full Name:
//             </label>
//             <input
//               id="fullname"
//               name="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               required
//               placeholder="Enter your full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-medium text-gray-700">Gender:</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="" disabled>
//                 Select gender
//               </option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
//               Email:
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
//               Password:
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* ফাইল ইনপুট */}
//           <div className="mb-6">
//             <label htmlFor="profilePhoto" className="block mb-1 font-medium text-gray-700">
//               Profile Photo (optional):
//             </label>
//             <input
//               id="profilePhoto"
//               name="profilePhoto"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirect

function Register() {
  const navigate = useNavigate(); // initialize navigate

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    gender: "",
    email: "",
    password: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (profilePhoto) {
        data.append("profilePhoto", profilePhoto);
      }

      const res = await axios.post("http://localhost:2512/user/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration success:", res.data);
      navigate("/login"); // redirect to login page on success

    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
              Username:
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullname" className="block mb-1 font-medium text-gray-700">
              Full Name:
            </label>
            <input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="profilePhoto" className="block mb-1 font-medium text-gray-700">
              Profile Photo (optional):
            </label>
            <input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
