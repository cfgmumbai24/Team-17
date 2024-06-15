import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import SignInPage from "./pages/SignIn";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/HomePage";
import SampleComponent from "./pages/SampleContextUsage";
import FaqPage from "./pages/FaqPage";
import Chatbot_UI from "./pages/Chatbot_UI";
import TestingComponent from "./pages/TestingComponent/TestingComponent";

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "sign-in",
          element: <SignInPage />,
        },
        {
          path: "sample",
          element: <Sample />,
        },
        {
          path: "empty",
          element: <Empty />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/context",
          element: <SampleComponent />,
        },
        {
          path: "/faq",
          element: <FaqPage />,
        },

        {
          path: "/test",
          element: <TestingComponent />,
        },
        {
          path: "/chatbot",
          element: <Chatbot_UI />,
        },
      ],
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: basename,
  }
);
