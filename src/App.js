import React, { useEffect, useRef } from "react";
import "./App.css";
import Form from "./components/Form";
import WishForm from "./components/WishForm";
import { Fireworks } from "fireworks-js";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      {/* <Form /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <FireworkAlert />
      <WishForm />
    </div>
  );
}

export default App;

export const FireworkAlert = () => {
  const ref = useRef();

  useEffect(() => {
    const fireworks = new Fireworks(ref.current, {
      rocketsPoint: {
        min: 50,
        max: 50,
      },
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 80,
      trace: 3,
      explosion: 5,
    });

    fireworks.start();

    return () => fireworks.stop();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};
