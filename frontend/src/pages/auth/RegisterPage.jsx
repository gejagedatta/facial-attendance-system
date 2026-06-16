import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Camera, Lock, Mail, Building } from "lucide-react";
import API from "../../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    institute_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Sending Register Data:", formData);

      const response = await API.post(
        "/auth/register",
        formData
      );

      console.log("Register Response:", response.data);

      toast.success(
        response.data.message ||
        "Registration successful"
      );

      navigate("/login");

    } catch (error) {
      console.error("Register Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8FAFC] p-6">

      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-[#1E6091] rounded-xl shadow-md text-white">
          <Camera className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="text-3xl font-black tracking-tight">
          FaceAttend <span className="text-[#1E6091]">AI</span>
        </span>
      </div>

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-black mb-2 text-slate-900">
          Create Account
        </h1>

        <p className="text-slate-500 mb-8">
          Register your institution to start using FaceAttend AI.
        </p>

        <div className="space-y-4 mb-6">

          {/* Institute Name */}
          <div className="relative">
            <Building className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

            <input
              type="text"
              name="institute_name"
              placeholder="Institute Name"
              value={formData.institute_name}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1E6091]/20 focus:border-[#1E6091] outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1E6091]/20 focus:border-[#1E6091] outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1E6091]/20 focus:border-[#1E6091] outline-none transition-all"
              required
            />
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1E6091] text-white py-3.5 rounded-xl font-bold hover:bg-[#15466b] transition-all disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      <p className="mt-8 text-slate-500 text-sm">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-[#1E6091] font-bold hover:underline"
        >
          Sign In
        </button>
      </p>

    </div>
  );
}

export default RegisterPage;