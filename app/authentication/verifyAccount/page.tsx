import { Suspense } from "react";
import VerifyAccount from "./verifyAccount";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccount />
    </Suspense>
  );
}
