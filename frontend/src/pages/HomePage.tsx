import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

import "./HomePage.css";
import Banner_img from "../components/Assests/Multiply.svg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="banner">
          <img src={Banner_img} alt="Banner" />
          <div className="banner-text">
            <h1>Hi, don’t walk into tomorrow without financial knowledge</h1>
            <p>
              Start learning about personal finance, today! Pick a topic of your
              interest from below.
            </p>
            <div className="stats">
              <div className="stat">
                <i className="fas fa-users"></i>
                <button>117 Total Users</button>
              </div>
              <div className="stat">
                <i className="fas fa-book"></i>
                <button>139 Guides</button>
              </div>
              <div className="stat">
                <i className="fas fa-video"></i>
                <button>14 Informational Videos</button>
              </div>
            </div>
          </div>
        </div>
        <div className="get-started-container">
          <div className="help-section">
            <h1>Get Started With</h1>
            <div className="help-tags">
              <button className="action-button"> Learn With Us</button>
              <button
                className="action-button"
                onClick={() => {
                  navigateTo(String.raw`/chatbot`);
                }}
              >
                {" "}
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
