import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import Cookies from "js-cookie";
import {
  LoginContainer,
  RightSection,
  LoginBox,
  InputWrapper,
  CountryCode,
  Input,
  Button,
  ErrorText,
  OtpBox,
  OtpHeader,
  OtpInputs,
  OtpInput,
} from "../Login/Login.styles";
import Logowithtitle from "../../components/Logowithtitle/Logowithtitle";
import Loader from "../../components/apiloders/ApiLoders";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useToast } from "../../context/ToastContext";
import { LoginApi, startSession } from "../../services/auth/LoginApi";
const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useToast();

  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const validatePhone = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      setError("Enter a valid 10-digit phone number.");
    } else {
      setError("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
    validatePhone(value);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    
    // Check if the value is longer than 1 character (pasted OTP)
    if (value.length > 1) {
      // Extract only digits from the pasted value
      const digits = value.replace(/\D/g, '').slice(0, 6);
      
      // Fill the OTP array with the pasted digits
      const filledOtp = [...newOtp];
      for (let i = 0; i < 6; i++) {
        filledOtp[i] = digits[i] || '';
      }
      setOtp(filledOtp);
      
      // Focus on the last filled input or the next empty one
      const lastFilledIndex = Math.min(digits.length - 1, 5);
      if (lastFilledIndex < 5) {
        document.getElementById(`otp-input-${lastFilledIndex + 1}`).focus();
      }
      return;
    }
    
    // Single digit input (normal behavior)
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      
      // If current input is empty and we're not at the first input, go to previous input
      if (newOtp[index] === "" && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
        return;
      }
      
      // Clear current input
      newOtp[index] = "";
      setOtp(newOtp);
      
      // If we're not at the first input, go to previous input
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      
      // Focus on the last filled input or the next empty one
      const lastFilledIndex = Math.min(digits.length - 1, 5);
      if (lastFilledIndex < 5) {
        document.getElementById(`otp-input-${lastFilledIndex + 1}`).focus();
      }
    }
  };

const sendOTP = async () => {
  if (error || phone.length < 10) return;

  setLoading(true);
  try {
    // Clear any existing recaptcha
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    // Create new recaptcha verifier
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
        },
        'expired-callback': () => {
          console.warn("reCAPTCHA expired");
          // Handle expiration if needed
        }
      }
    );

   
    const confirmation = await signInWithPhoneNumber(
      auth,
      `+91${phone}`,
      window.recaptchaVerifier
    );
    
    setConfirmationResult(confirmation);
    setOtpSent(true);
    showSuccess("OTP Sent", "OTP has been sent successfully to your phone number!");
  } catch (err) {
    console.error("Error sending OTP:", err);
    const errorMessage = err.message || "Failed to send OTP. Try again.";
    setError(errorMessage);
    showError("OTP Error", errorMessage);
    
    // Reset recaptcha on error
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  } finally {
    setLoading(false);
  }
};

  const verifyOTP = async () => {
    const otpValue = otp.join("");
    if (!otpValue || otpValue.length !== 6) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otpValue);
      const idToken = await result.user.getIdToken();

      // Step 1: Login the user
      const loginResponse = await LoginApi(idToken);

      if (loginResponse.success) {
        // Store sessionToken and userId in cookies
        Cookies.set("sessionToken", loginResponse.token, {
          expires: 7,
          secure: true,
        });
        Cookies.set("userId", loginResponse.userId, {
          expires: 7,
          secure: true,
        });


        // Step 2: Start a session after successful login
        const sessionResponse = await startSession(loginResponse.userId, "web");

        showSuccess("Login Successful", "Welcome! You have been logged in successfully.");

        // Check for stored redirect URL
        const redirectUrl = Cookies.get("redirectUrl");
        if (redirectUrl) {
          Cookies.remove("redirectUrl"); // Clear the stored URL
          navigate(redirectUrl); // Redirect to the stored URL (e.g., /Gallery)
        } else {
          navigate("/"); // Default redirect if no URL is stored
        }
      } else {
        const errorMessage = "Login failed. Please try again.";
        setError(errorMessage);
        showError("Login Failed", errorMessage);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err.message);
      const errorMessage = "Invalid OTP. Please try again.";
      setError(errorMessage);
      showError("OTP Verification Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Render the loader if showLoader is true
  if (showLoader) {
    return <Loader />;
  }

  return (
    <LoginContainer>
      <Logowithtitle />
      <div id="recaptcha-container"></div>
      <RightSection>
        {!otpSent ? (
          <LoginBox>
            <h2>Login</h2>
            <h5>You’ll receive a 6-digit code to verify next.</h5>

            <label htmlFor="phone">Phone Number</label>
            <InputWrapper>
              <CountryCode>+91</CountryCode>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                maxLength="10"
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendOTP();
                  }
                }}
              />
            </InputWrapper>
            {error && <ErrorText>{error}</ErrorText>}

            <Button
              onClick={sendOTP}
              disabled={error || phone.length < 10 || loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </LoginBox>
        ) : (
          <OtpBox>
            <OtpHeader>OTP Verification</OtpHeader>
            <p>
              OTP has been sent on mobile number
              <br /> Please enter OTP to verify the number
            </p>

            <OtpInputs>
              {otp.map((digit, index) => (
                <OtpInput
                  key={index}
                  id={`otp-input-${index}`}
                  type="tel"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    handleOtpKeyDown(index, e);
                    if (e.key === "Enter" && index === otp.length - 1) {
                      verifyOTP();
                    }
                  }}
                  onPaste={handleOtpPaste}
                />
              ))}
            </OtpInputs>
            {error && <ErrorText>{error}</ErrorText>}

            <Button onClick={verifyOTP} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </Button>
          </OtpBox>
        )}
      </RightSection>
    </LoginContainer>
  );
};

export default Login;