import { Link } from "react-router-dom";

import style from "./main-layout.module.css";
import { SearchBar } from "../../../widgets/search-bar";

export function MainLayout({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const f = (obj: JSX.Element[] | JSX.Element) =>
    obj instanceof Array ? obj.map((elem) => elem) : obj;

  return (
    <div className={"main-layout"}>
      <header className={style.header}>
        <div className={style.flexY}>
          <Link to={"/"}>home</Link>
          <Link to={"/other"}>other</Link>
          <Link to={"/about"}>about</Link>
        </div>
      </header>
      {f(children)}
      <footer>footer</footer>
    </div>
  );
}
