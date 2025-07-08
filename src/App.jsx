import {AppLayout} from "./layouts/app-layout";
import { UrlProvider } from "./context";
import { RequireAuth } from "./components/requireAuth";

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
    {path: "/dashboard", element: <RequireAuth><Dashboard /></RequireAuth>},
    {path: "/link/:id", element: <RequireAuth><Link /></RequireAuth>},
    {path: "/:id", element: <RedirectLink />}
  ]
}])

function App() {

  return (
    <>
      <UrlProvider>
        <RouterProvider router={router} />
      </UrlProvider>
    </>
  )
}

export default App
