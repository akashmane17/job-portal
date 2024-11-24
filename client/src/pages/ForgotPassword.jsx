import { useState } from "react";
import SendOtp from "../components/SendOtp";
import ChangePassword from "../components/changePassword";

const ForgotPassword = () => {
  const [isOtpSend, setIsOtpSent] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <div>
      {!isOtpSend && (
        <SendOtp setEmail={setEmail} setIsOtpSent={setIsOtpSent} />
      )}
      {isOtpSend && <ChangePassword email={email} />}
    </div>
  );
};

export default ForgotPassword;
