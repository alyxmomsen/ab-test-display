import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Button = ({ title , testID }: { title: string , testID:number }) => {

  const nav = useNavigate();

  const buttonLabel = title === "draft".toUpperCase() ? "Finalize" : "Results"

  const [content, setContent] = useState(title);

  return (
    <button onClick={() => {nav(`/${buttonLabel.toLowerCase()}/${testID}`)}}>{buttonLabel}</button>
  );
};
