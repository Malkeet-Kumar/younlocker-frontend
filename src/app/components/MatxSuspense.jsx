import { Suspense } from "react";
import { SdlLoading } from "../components";

export default function MatxSuspense({ children }) {
  return <Suspense fallback={<SdlLoading />}>{children}</Suspense>;
}
