import { createContext, useContext, useEffect, useState } from "react";
import { ListItem } from "../../../entities/list-item";

import style from "./../style/style.module.css";
import axios from "axios";
import { AppMainCtx } from "../../../app/App";

import tableConfigJSON from "./../../../shared/json-data-shared/main-json-data.json";
import { listItemData } from "../../../entities/list-item/ui/list-item";
import { SearchBar } from "../../search-bar";
import { Site, Test } from "../../../shared/json-data-shared/this-project-types";

// ["node-sass" , "axios" ,'classnames' , 'react-router-dom' , 'prop-types'] ;

export const ItemList = () => {

  const ctx = useContext(AppMainCtx);

  const getDataViaTheAxios = async () => {
    const tests = await axios.get<listItemData[]>(
      "http://localhost:3100/tests",
    );

    const sites = await axios.get<{ id: number; url: string }[]>(
      "http://localhost:3100/sites",
    );

    const [testRes, sitesRes] = await Promise.all([tests, sites]);

    const testData = testRes.data;
    const sitesData = sitesRes.data;

    const data_of_tests = await axios
      .get("http://localhost:3100/tests")
      .then((par) => {
        // setItems(par.data);

        return par.data;
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });

    const data_of_sites = await axios
      .get("http://localhost:3100/sites")
      .then((par) => {
        return par.data;
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });


    const res =
      ctx &&
      ctx.dispatch({
        type: /* "SET_SORT" */ "SET_DATA",
        payload: {
          ...ctx.state,
          aboutTestsData: data_of_tests,
          aboutSitesData: data_of_sites,
        },
      });
  };

  useEffect(() => {
    getDataViaTheAxios();

  }, []);

  const TableHead = () => {};

  const labels = [
    {
      title: "name",
      id: "name",
    },
    {
      title: "type",
      id: "type",
    },
    {
      title: "status",
      id: "status",
    },
    {
      title: "site",
      id: "siteId",
    },
  ];

  const ascDescDirectionFlip = ({
    label: { cur, next },
    dir,
  }: {
    label: { cur: string; next: string };
    dir: "ASC" | "DESC";
  }) => {
    if (next === cur) {
      return dir === "DESC" ? "ASC" : "DESC";
    } else {
      return "ASC";
    }
  };

  return (
    <div className={style.wrapper}>
      <SearchBar />
      <table>
        <tr className="table-captions">
          {labels.map((label) => (
            <th
              onClick={() => {
                ctx &&
                  ctx.dispatch({
                    type: "SET_SORT",
                    payload: {
                      ...ctx.state,
                      sortState: {
                        ...ctx.state.sortState,
                        columnName: label.id,
                        direction: ascDescDirectionFlip({
                          label: {
                            cur: ctx.state.sortState.columnName,
                            next: label.id,
                          },
                          dir: ctx.state.sortState.direction,
                        }),
                      },
                    },
                  });
              }}
            >
              {label.title}
            </th>
          ))}
          <th></th>
        </tr>

        {ctx &&
          ctx.state.aboutTestsData
            .slice()
            .filter((elem) => {

              return elem.name
                .toLowerCase()
                .includes(ctx ? ctx.state.filterPattern.toLowerCase() : "")
                ? true
                : false;
            })
            .sort((a, b) => {
              const label = ctx && ctx.state.sortState.columnName;

              if (
                label === "name" ||
                
                label === "type"
                // label === "siteId"
              ) {

                if (a[label] > b[label]) {
                  return ctx.state.sortState.direction === "ASC" ? 1 : -1;
                } else {
                  return ctx.state.sortState.direction === "ASC" ? -1 : 1;
                }
              } else if (label === "siteId") {

                if (
                  ctx.state.aboutSitesData[Number(a[label]) - 1].url>
                  ctx.state.aboutSitesData[Number(b[label]) - 1].url
                ) {
                  
                  return ctx.state.sortState.direction === "ASC" ? 1 : -1;
                } else {

                  return ctx.state.sortState.direction === "ASC" ? -1 : 1;
                }

              } else if (label === "status") {

                const direction = ctx.state.sortState.direction ;

                const order = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];
                
                if(direction === "ASC") {
                }
                else {
                  order.reverse();

                }
                

                return order.indexOf(a[label].toUpperCase()) - order.indexOf(b[label].toUpperCase())
                
              } else {
                return 0;
                
              }
            })
            .map((item) => <ListItem data={{ ...item, url: modifyURL(getURLByID(ctx.state.aboutSitesData , item.siteId))}} />)}
      </table>
    </div>
  );
};

function getURLByID (sites:Site[] , id:number) {

  sites = [...sites] ;

  const site = sites.find(elem => elem.id === id) ;

  return site ? site.url : 'no data' ;

}

function modifyURL (origin:string) {

  const modifyiedURL = origin.replace(/https?:\/\//, '').replace('www.', '');


  return modifyiedURL ;

}
