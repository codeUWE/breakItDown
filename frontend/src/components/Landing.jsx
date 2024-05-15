import { Route, NavLink } from "react-router-dom";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import heroImage from "../assets/heroImage.webp";
import breakitdown from "../assets/breakitdown.webp";
// import Home from "./components/Home";
// import LoginCard from "./components/LoginCard";

function Landing() {
  return (

    <div className="flex flex-col min-h-screen">
     
      <nav className="flex justify-between items-center bg-[#6A66A3] p-4">
        <div className="flex items-center space-x-4">
         
          <img src={breakitdown} alt="Logo" className="h-8 w-auto" />{" "}
         
          <h1 className="text-white font-bold">Break it Down</h1>
        </div>
        <div className="flex items-center space-x-4">
         
          <div className="flex flex-col items-end space-y-2">
          
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <NavLink
                to="/login"
                className="text-white"
                activeClassName="font-bold"
              >
                Login
              </NavLink>
            </button>
            <p className="text-white text-sm">No Account?</p>{" "}
           
            <NavLink
              to="/signup"
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>
   
      <section className="flex flex-row justify-between p-4 flex-grow">
       
        <p className="text-gray-800">
          
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
          temporibus nesciunt quia eius nostrum veritatis alias ratione fugiat
          aperiam nam aut perferendis, minima molestias rem accusamus mollitia
          consequatur? Numquam, libero?
        </p>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#6A66A3] text-white text-center p-4">
        <div className="container mx-auto">
          <div className="flex justify-end space-x-4">
           
            <NavLink
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <img
                src={facebook}
                alt="Facebook"
                className="w-8 h-8 rounded-full shadow-lg"
              />
            </NavLink>
            <NavLink
              to="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <img
                src={twitter}
                alt="Twitter"
                className="w-8 h-8 rounded-full shadow-lg"
              />
            </NavLink>
            <NavLink
              to="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-8 h-8 rounded-full shadow-lg"
              />
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
