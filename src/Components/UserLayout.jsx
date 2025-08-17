import Footer from "./Footer";
import Navbar from "./Navbar";
import SearchBar from "./Search";

const UserLayout = ({ children }) => (
  <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <Navbar />
    <SearchBar />
    {children}
    <Footer />
  </div>
);

export default UserLayout