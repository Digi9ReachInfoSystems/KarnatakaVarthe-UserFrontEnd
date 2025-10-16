import React, { useState } from "react";
import {
  OtpContainer,
  RightSection,
  OtpBox,
  OtpHeader,

  OtpSubheader,
  OtpInputs,
  OtpInput,
  OtpButton,
  ErrorText,
  CheckboxWrapper,
  CheckboxLabel,
} from "../otp/Otp.styles";
import Logowithtitle from "../../components/Logowithtitle/Logowithtitle";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Handle OTP input change
  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ""); // Only allow numbers
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Validate OTP
  const validateOtp = () => {
    const isOtpValid = otp.every((digit) => digit.length === 1);
    if (!isOtpValid) {
      setError("Please enter a valid 6-digit OTP.");
    } else {
      setError("");
      // Add your OTP verification logic here
      console.log("OTP Verified:", otp.join(""));
    }
  };

  return (
    <OtpContainer>
        <Logowithtitle />

      <RightSection>
        <OtpBox>
          <OtpHeader>OTP Verification</OtpHeader>
         
          <p>OTP has been sent on mobile number<br/> Please enter OTP to verify the number</p>

          <OtpInputs>
            {otp.map((digit, index) => (
              <OtpInput
                key={index}
                id={`otp-input-${index}`}
                type="tel"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </OtpInputs>
          {error && <ErrorText>{error}</ErrorText>}

          <CheckboxWrapper>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <CheckboxLabel htmlFor="rememberMe">
            Stay Login 
            </CheckboxLabel>
          </CheckboxWrapper>

          <OtpButton onClick={validateOtp}>Verify and Login</OtpButton>
        </OtpBox>
      </RightSection>
    </OtpContainer>
  );
};

export default Otp;