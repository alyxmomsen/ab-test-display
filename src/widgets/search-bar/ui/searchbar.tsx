import { useContext, useState } from "react";
import style from "./style.module.css";
import { AppMainCtx } from "../../../app/App";

export const SearchBar = () => {
  const [state, setState] = useState("");
  const placeholder = "What test are you looking for?";

  const ctx = useContext(AppMainCtx);

  return (
    <div className={style["search-bar-main-container"]}>
      <input
        type="search"
        onChange={(e) => {
          setState(e.target.value);
          ctx &&
            ctx.dispatch({
              type: "SET_FILTER_PATTERN",
              payload: { ...ctx.state, filterPattern: e.target.value },
            });
        }}
        placeholder={placeholder}
        value={state}
      />
    </div>
  );
};
