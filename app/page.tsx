"use client";

import StartButton from "./components/Button/StartButton";
import AvatarSlider from "./components/AvatarSlider/AvatarSlider";
import InstructionsSlider from "./components/InstructionsSlider/InstructionsSlider";
import Input from "./components/Input";
import { useState } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stateUsername, setStateUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10">
      <InstructionsSlider />
      <AvatarSlider setCurrentSlide={setCurrentSlide} />
      <div className="flex flex-col space-y-3 items-center">
        <Input setFunction={setStateUsername}
          setUsernameValid={setUsernameValid}
          label="Enter a username:"
          placeholder="Anonymous123"
          maxLength={12}
          minLength={3}
          pattern={/^[a-zA-Z0-9-]+$/} // Example: Alphanumeric characters only and dashes
        />
        <StartButton canClick={usernameValid} currentSlide={currentSlide} stateUsername={stateUsername} />
      </div>
    </main>
  );
}