import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import EventuallyConsistentForm from "./Pages/Eventually_Consistent_Form/Eventually_Consistent_Form";
import OutOfOrderEvents from "./Pages/OutOfOrderEvents/OutOfOrderEvents";
import ValidationThatLies from "./Pages/ValidationThatLies/ValidationThatLies";


const App = () => {
  return (
    <div>
      <Navbar />

      <div >
        <Routes>
          <Route path="/" element={<EventuallyConsistentForm />} />
          <Route path="/OutOfOrderEvents" element={<OutOfOrderEvents />} />
          <Route path="/ValidationThatLies" element={<ValidationThatLies />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
