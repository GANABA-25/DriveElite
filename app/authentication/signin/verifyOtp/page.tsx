import { Suspense } from "react";
import VerifyOtpForm from "./verifyOtpForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
