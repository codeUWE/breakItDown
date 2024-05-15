import { Route, NavLink } from "react-router-dom";
// import facebook from "../assets/facebook.png";
// import twitter from "../assets/twitter.png";
// import linkedin from "../assets/linkedin.png";
// import heroImage from "../assets/heroImage.png";
import breakitdown from "../assets/breakitdown.png";
// import projectmanagement from "../assets/projectmanagement.png";
// import sequence from "../assets/sequence.png"
// import Home from "./components/Home";
// import LoginCard from "./components/LoginCard";

function Landing() {
  return (
<div className="bg-gray-100">
    <div className="flex flex-col min-h-screen">

      <nav className="h-[50px] flex justify-between items-center bg-[#6A66A3] p-4">
        <div className="flex items-center space-x-4">
         
          <img src={breakitdown} alt="Logo" className="h-8 w-auto" />{" "}
         
          <h1 className="text-white text-2xl font-bold">Break it Down</h1>
        </div>
<ul className="space-x-4 flex justify-center absolute right-[19px]">
  <li><a href="" className="font-bold text-white hover:underline">Home</a> </li>
  <li><a href="" className="text-white font-bold hover:underline">About Us</a> </li>
  <li><a href="" className="text-white font-bold hover:underline">Pricing</a> </li>
  <li><a href="" className="text-white font-bold hover:underline">Contact Us</a> </li>


</ul>

<div className="flex items-center p-2 space-x-2 relative"> {/* Add relative positioning */}
  <div className="absolute mt-12">
    <div className="flex justify-center">
      {/* <p className="text-white text-sm">No Account?</p> */}
    </div>
    
    
  </div>
</div>
           
      </nav>
   
   <div className="relative">
     <section className="flex flex-row justify-center  flex-grow">
       <div className="container mx-auto py-20 text-center" >
          <h1 className="text-gray-800 text-8xl font-bold ">
         Revolutionize your <br />team workflow!
        
        </h1>

        <div className="flex justify-center text-2xl m-4">
          <p><span className="font-bold underline">Break It Down </span>- Empowering Teams </p>
        </div>
        <div className="flex justify-center m-10">
        {/* <button className="bg-blue-800 rounded border-[3px] w-[100px] hover:bg-blue-gray-500">
          Get Started
        </button> */}

        <div>
  <div className="flex justify-center m-10">
     <button className="flex justify-end px-7 rounded-full font-outfit text-[30px] hover:bg-[#4a458b] font-[600] bg-[#080708] shadow-lg">
      <NavLink
        to="/login"
        className="text-[#f55d3e]"
        activeClassName="font-bold"
      >
        Login
      </NavLink>
      
    </button>
  </div>
          <p className="font-semibold"> Have no account? </p>
          <div className="flex justify-center "> {/* Wrap the links in a flex container */}
      <NavLink
        to="/signup"
        className="hover:underline text-blue-700 text-2xl"
      >
        Sign Up
      </NavLink>
    </div>
    
        </div>
       
      </div>
      {/* * */}
       </div>
       
       
      
      
        {/* <p>Break It Down - A guide to Project Mayhem</p> */}
        <div className="md:w-1/2 mt-4 md:mt-0 absolute top-[360px] left-[90px]">
          
          {/* <img
            src={projectmanagement}
            alt="Hero"
            className="w-[300px] border-[5px] rounded-lg shadow-lg"
          />
          <p>Agile Collaboration</p> */}
        </div>

        {/* <div>
        <img
            src={sequence}
            alt="Hero"
            className="w-[300px] border-[5px] rounded-lg shadow-lg"
          />
        </div> */}
      </section>
   </div>
     
      
      {/* Footer */}
      {/* <footer className="bg-[#6A66A3] text-white text-center p-4">
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
      </footer> */}
    </div>
    </div>
  );
}

export default Landing;

















































// import React from 'react';

// function Landing() {
//   return (
    
//     <section className="bg-custom-color">
//       <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
//         <div className="mx-auto max-w-6xl text-center">
//         <h1 className="p-6 bg-gradient-to-r from-green-300 via-black-500 to-black-600 bg-clip-text text-3xl font-extrabold text-black sm:text-6xl">
//   Revolutionize your workflow, <br />seamlessly collaborate and <br /> control your versions
//   {/* <span className="sm:block"> Increase Conversion. </span> */}
// </h1>
// <p className="mx-auto text-xl/relaxed">
//   Introducing <span className="underline">Break It Down</span> - Collaboration and Version Control Made Effortless!
// </p>
//           <div className="mt-8 flex flex-wrap justify-center gap-4">
//             <a
//               className="block w-12 h-12 rounded border border-brown-600 bg-brown-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-50 sm:w-auto"
//               href="#"
//             >
//               Free Trial
//             </a>

//             <a
//               className="block w-12 h-12 rounded border  border-blue-600 px-12 py-3 text-sm font-text-black-bold hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
//               href="#"
//             >
//               Call Us 
//              <span><img className='inline-block w-5 h-5 justify-center ml-2 ' src="https://cdn-icons-png.freepik.com/512/3870/3870799.png" alt="pic" /></span>
//             </a>

            
//           </div>
//           <div className='p-10'>
//             <p className='font-bold p-10 m-9'>
//            Trust by the following organizations
//           </p>
//           <span><img src="./src/assets/org.png" alt="organizations" /></span>
//           </div>
          
//         </div>
        
//       </div>
  

//     </section>
//   );
// }

// export default Landing;
