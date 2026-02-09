import React from "react";
import { Outlet } from "react-router-dom";

/**
 * PublicLayout - Layout for routes accessible to everyone.
 * No authentication checks - renders children directly.
 * Use for pages like Home that work for both guests and authenticated users.
 */
const PublicLayout = () => {
  return <Outlet />;
};

export default PublicLayout;
