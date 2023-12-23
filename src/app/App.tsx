import React, { createContext, useEffect, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Other } from "../pages/other";
import { About } from "../pages/about";
import { STATUS_CODES } from "http";
import { listItemData } from "../entities/list-item/ui/list-item";
import { Test } from "../shared/json-data-shared/this-project-types";
import { Finalize } from "../pages/finalize";
import { Results } from "../pages/results";

type SortDirection = "up" | "down";
type SortColumn = "name" | "status";

type StoreData = {
  sortState: {
    columnName: string;
    direction: "ASC" | "DESC";
  };
  filterPattern: string;
  data: {
    tests: Test[];
    sites: { id: number; url: string }[];
  };
  aboutTestsData: Test[];
  aboutSitesData: { id: number; url: string }[];
};

const reducer = (
  state: StoreData,
  action: {
    type: "SET_SORT" | "SET_FILTER_PATTERN" | "SET_DATA";
    payload: StoreData;
  },
) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
<<<<<<< HEAD
        
=======
        /* aboutTestsData: action.payload.aboutTestsData ,
        aboutSitesData: action.payload.aboutSitesData ,
        data:{
          sites:action.payload.aboutSitesData ,
          tests:action.payload.aboutTestsData ,
        } */
>>>>>>> 751f3082f71bffc73cb2b7f04a3ddbc0254eb41f
        ...action.payload,
      };
    case "SET_SORT":
      return {
        ...state,
        ...action.payload,
<<<<<<< HEAD
        
=======
        /* sortState: {
          columnName: action.payload.sortState.columnName,
          direction: action.payload.sortState.direction,
        } ,
        aboutTestsData: action.payload.aboutTestsData, */
>>>>>>> 751f3082f71bffc73cb2b7f04a3ddbc0254eb41f
      };
    case "SET_FILTER_PATTERN":
      return {
        ...state,
        ...action.payload,
<<<<<<< HEAD
=======
        // filterPattern: action.payload.filterPattern,
>>>>>>> 751f3082f71bffc73cb2b7f04a3ddbc0254eb41f
      };
    default:
      return state;
  }
};

export const AppMainCtx = createContext<
  | {
      state: StoreData;
      dispatch: React.Dispatch<{
        type: "SET_SORT" | "SET_FILTER_PATTERN" | "SET_DATA";
        payload: StoreData;
      }>;
    }
  | undefined
>(undefined);
function App() {
  const [state, dispatch] = useReducer(reducer, {
    sortState: { columnName: "name", direction: "ASC" },
<<<<<<< HEAD

=======
>>>>>>> 751f3082f71bffc73cb2b7f04a3ddbc0254eb41f
    filterPattern: "",
    aboutTestsData: [],
    aboutSitesData: [],
    data: {
      tests: [],
      sites: [],
    },
<<<<<<< HEAD

=======
>>>>>>> 751f3082f71bffc73cb2b7f04a3ddbc0254eb41f
  });

  return (
    <div className="App">
      <AppMainCtx.Provider value={{ state, dispatch }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other" element={<Other />} />
            <Route path="/about" element={<About />} />
            <Route path="/results/:id" element={<Results />}/>
            <Route path="/finalize/:id" element={<Finalize />}/>
          </Routes>
        </Router>
      </AppMainCtx.Provider>
    </div>
  );
}

export default App;
