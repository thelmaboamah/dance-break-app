import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "../components/AuthRedirect";

export default function Timer() {
  const date = new Date();
  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <div>{date.toTimeString()}</div>
    </PassageAuthGuard>
  );
}
