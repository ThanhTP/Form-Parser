import { useState } from "react";
import { Navbar, Footer, Welcome, Loader, Hero } from "./components";
const App = () => {
  return (
    <div className='min-h-screen'>
      <div className='gradient-bg-welcome'>
        {/* <Navbar /> */}
        {/* <Hero /> */}
        <Welcome />
        {/* <Transaction /> */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
