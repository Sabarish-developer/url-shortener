import {AppLayout} from "./layouts/app-layout";

import {Landing} from "./pages/landing";
import {Auth} from "./pages/auth";
import {Link} from "./pages/link";
import {RedirectLink} from "./pages/redirect-link";
import {Dashboard} from "./pages/dashboard";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([{
  path: "/",
  element: <AppLayout />,
  children: [
    {path: "/", element: <Landing />},
    {path: "/auth", element: <Auth />},
    {path: "/dashboard", element: <Dashboard />},
    {path: "/link/:id", element: <Link />},
    {path: "/:id", element: <RedirectLink />}
  ]
}])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
