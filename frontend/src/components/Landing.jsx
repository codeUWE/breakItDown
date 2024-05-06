import React from 'react';

function Landing() {
  return (
    
    <section className="bg-custom-color">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-6xl text-center">
        <h1 className="p-6 bg-gradient-to-r from-green-300 via-black-500 to-black-600 bg-clip-text text-3xl font-extrabold text-black sm:text-6xl">
  Revolutionize your workflow, <br />seamlessly collaborate and <br /> control your versions
  {/* <span className="sm:block"> Increase Conversion. </span> */}
</h1>
<p className="mx-auto text-xl/relaxed">
  Introducing <span className="underline">Break It Down</span> - Collaboration and Version Control Made Effortless!
</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-12 h-12 rounded border border-brown-600 bg-brown-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-50 sm:w-auto"
              href="#"
            >
              Free Trial
            </a>

            <a
              className="block w-12 h-12 rounded border  border-blue-600 px-12 py-3 text-sm font-text-black-bold hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Call Us 
             <span><img className='inline-block w-5 h-5 justify-center ml-2 ' src="https://cdn-icons-png.freepik.com/512/3870/3870799.png" alt="pic" /></span>
            </a>

            
          </div>
          <div className='p-10'>
            <p className='font-bold p-10 m-9'>
           Trust by the following organizations
          </p>
          <span><img src="./src/assets/org.png" alt="organizations" /></span>
          </div>
          
        </div>
        
      </div>
  

    </section>
  );
}

export default Landing;
