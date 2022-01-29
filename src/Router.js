import React from "react";
import { useRecoilValue } from "recoil";
import ClientRouter from "./routers/ClientRouter";
import OwnerRouter from "./routers/OwnerRouter";
import { isClientState } from "./store/common/user";

const Router = () => {
  const isClient = useRecoilValue(isClientState);

  return <div>{isClient ? <ClientRouter /> : <OwnerRouter />}</div>;
};

export default Router;
