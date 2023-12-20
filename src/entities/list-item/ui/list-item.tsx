import { useContext, useRef, useState } from "react";
import { Button } from "../../../shared/button";

import style from "./style.module.css";
import {
  Site,
  Status,
} from "../../../shared/json-data-shared/this-project-types";
import { AppMainCtx } from "../../../app/App";
import { useNavigate } from "react-router-dom";

export type listItemData = {
  id: string;
  name: string;
  type: string;
  status: string;
  siteId: string;
};

enum Type {
  CLASSIC = "CLASSIC",
  SERVER_SIDE = "SERVER_SIDE",
  MVT = "MVT",
}

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
}

type lid = {
  ["string"]: string;
};

export const ListItem = ({ data }: { data: Test & { url: string } }) => {

  const ctx = useContext(AppMainCtx);

  const nav = useNavigate();

  return (
    <tr className={style["margin-19"]}>
      <td>{data.name}</td>
      <td>{data.type}</td>
      <td>{data.status}</td>
      <td>{data.url}</td>
      <td >
        <Button title={data.status} testID={data.id} />
      </td>
    </tr>
  );
};
