import { PassageUnAuthGuard } from "@passageidentity/passage-react";
import { Link } from "react-router-dom";
import Welcome from "./Welcome";
export default function SplashPage() {
  return (
    <PassageUnAuthGuard authComp={<Welcome />}>
      <main>
        <h1>Welcome to Dance Break</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia sint,
          laudantium praesentium temporibus quas beatae soluta excepturi magnam
          dicta provident sequi ex ipsa natus ut aliquam facere, voluptatum
          aperiam aspernatur?
        </p>
        <div>
          <Link to="/auth">
            <button>Sign Up / Log In</button>
          </Link>

          <button>Download App</button>
        </div>
      </main>
    </PassageUnAuthGuard>
  );
}
