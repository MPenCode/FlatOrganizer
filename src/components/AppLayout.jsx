import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
// This code defines an AppLayout component that serves as a layout for the application. It includes a Navbar at the top, an Outlet for rendering nested routes, and a Footer at the bottom. The Outlet component is used to render the child routes defined in the router configuration. This layout can be reused across different pages of the application to maintain a consistent look and feel.