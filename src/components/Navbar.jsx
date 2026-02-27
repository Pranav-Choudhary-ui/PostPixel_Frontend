import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const navBtn =
    "px-4 py-2 rounded-lg text-sm font-medium transition";

  const active =
    "bg-green-600 text-white shadow";

  const inactive =
    "text-gray-600 hover:bg-gray-100";

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/feed"
          className="text-xl font-bold tracking-tight text-gray-800 hover:text-black transition"
        >
          ImageShare
        </Link>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link
            to="/feed"
            className={`${navBtn} ${
              pathname === "/feed" ? active : inactive
            }`}
          >
            Feed
          </Link>

          <Link
            to="/create-post"
            className={`${navBtn} ${
              pathname === "/create-post" ? active : inactive
            }`}
          >
            Create
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;