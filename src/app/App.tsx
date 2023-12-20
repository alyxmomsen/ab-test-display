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
        
        ...action.payload,
      };
    case "SET_SORT":
      return {
        ...state,
        ...action.payload,
        
      };
    case "SET_FILTER_PATTERN":
      return {
        ...state,
        ...action.payload,
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

    filterPattern: "",
    aboutTestsData: [],
    aboutSitesData: [],
    data: {
      tests: [],
      sites: [],
    },

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
