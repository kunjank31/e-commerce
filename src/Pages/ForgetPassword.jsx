import React, { useState } from "react";
import Email from "./Steps/Email";
import Password from "./Steps/Password";
const steps = {
  1: Email,
  2: Password,
};
const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const Component = steps[step];
  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <>
      <div className="flex forgetPassword justify-center items-center h-[100vh]">
        <div className="w-1/3 shadow-xl p-5 z-20">
          <h2 className="text-2xl font-semibold mb-3">Forget Password</h2>
          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
