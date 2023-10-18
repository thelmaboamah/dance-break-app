import {
    PassageAuth,
    PassageUnAuthGuard,
  } from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";
  
export default function Auth() {
  return (
    <PassageUnAuthGuard authComp={<Navigate to="/welcome" />}>
      <PassageAuth />
    </PassageUnAuthGuard>
  );
}