import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaApple } from "react-icons/fa";
import GoogleIcon from "../../../assets/Google.png";
import { Spinner } from "./Sign-In.styles";

import {
  Container,
  Card,
  Header,
  HeaderLeft,
  HeaderRight,
  Subtitle,
  Title,
  NoAccountText,
  StyledLink,
  SocialButtonsContainer,
  SocialButton,
  IconButton,
  IconButtonsWrapper,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
} from "./Sign-In.styles";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import {
  checkuserExists,
  UserSignupWithPhoneApi,
} from "../../../services/auth/SignupApi";
import { LoginUsingPhoneApi } from "../../../services/auth/SignupApi";
import { Cookie } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const { showSuccess, showError, showWarning } = useToast();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!otpStep) {
        if (!formData.phone || formData.phone.length !== 10) {
          showWarning("Please enter a valid 10-digit phone number");
          setLoading(false);
          return;
        }
        const res = await checkuserExists({
          phone_Number: `+91${formData.phone}`,
        });
        console.log("User existence check:", res);
        if (!res.success) {
          showError("No user found with this phone number.");
          setLoading(false);
          return;
        }
        // Setup reCAPTCHA and get the verifier
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const fullPhoneNumber = `+91${formData.phone}`;
        const result = await signInWithPhoneNumber(
          auth,
          fullPhoneNumber,
          appVerifier
        );
        setConfirmationResult(result);
        setOtpStep(true);
        showSuccess("OTP sent to your phone number.");
      } else {
        const code = otp.join("");
        if (code.length === 6 && confirmationResult) {
          const result = await confirmationResult.confirm(code);
          const firebaseUID = result.user.uid;
          showSuccess("OTP verified successfully!");
          // Call login API with phone data

          try {
            const loginRes = await LoginUsingPhoneApi(firebaseUID);
            console.log("Login response:", loginRes);
            if (loginRes.success) {
              showSuccess("Login successful!");
              Cookies.set("token", loginRes.accessToken, {
                expires: 7,

                secure: true,
              });
              Cookies.set("firebaseUID", firebaseUID, {
                expires: 7,
                secure: true,
              });
              Cookies.set("userId", loginRes.data._id, {
                expires: 7,

                secure: true,
              });

              Cookies.set("Phone", loginRes.data.phone_Number, {
                expires: 7,
                secure: true,
              });

              Cookies.set("UserName", loginRes.data.displayName || "", {
                expires: 7,

                secure: true,
              });

              navigate("/");
            } else {
              showError(loginRes.message || "Login failed.");
            }
          } catch (err) {
            showError("Login API error.");
          }
        } else {
          showError("Please enter a valid 6-digit OTP");
        }
      }
    } catch (err) {
      showError(err.message || "Error during login.");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const res = await checkuserExists({ email: user.email });
      console.log("User existence check:", res);
      if (!res.success) {
        const phonedata = {
          firebaseUid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        await UserSignupWithPhoneApi(phonedata);
        console.log("User signed up successfully:", phonedata);
      }
      const loginRes = await LoginUsingPhoneApi(user.uid);
      console.log("Login response:", loginRes);
      if (loginRes.success) {
        showSuccess("Login successful!");
        Cookies.set("firebaseUID", loginRes.data.firebaseUid, {
          expires: 7,
          secure: true,
        });
        Cookies.set("token", loginRes.accessToken, {
          expires: 7,
        });
        Cookies.set("userId", loginRes.data._id, {
          expires: 7,
        });
        Cookies.set("Email", loginRes.data.email || "", {
          expires: 7,
        });
        Cookies.set("UserName", loginRes.data.displayName || "", {
          expires: 7,
        });
      }

      navigate("/");
    } catch (err) {
      showError(err.message || "Error during Google sign-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div id="recaptcha-container"></div>
      <Card>
        <Header>
          <HeaderLeft>
            <Subtitle>
              Welcome to <span className="highlight">DIPR</span>
            </Subtitle>
            <Title>Sign in</Title>
          </HeaderLeft>
          <HeaderRight>
            <NoAccountText>No Account ?</NoAccountText>
            <StyledLink as={Link} to="/signup">
              Sign up
            </StyledLink>
          </HeaderRight>
        </Header>
        <SocialButtonsContainer>
          <SocialButton onClick={handleGoogleSignIn}>
            <img src={GoogleIcon} alt="Google" className="icon" />
            Sign in with Google
          </SocialButton>
          {/* <IconButtonsWrapper>
            <IconButton>
              <FaFacebook className="icon facebook" />
            </IconButton>
            <IconButton>
              <FaApple className="icon apple" />
            </IconButton>
          </IconButtonsWrapper> */}
        </SocialButtonsContainer>
        <Form onSubmit={handleSubmit}>
          {!otpStep ? (
            <FormGroup>
              <Label>Enter your Phone Number</Label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    padding: "8px 12px",
                    background: "#f3f3f3",
                    border: "1px solid #ccc",
                    borderRadius: "4px 0 0 4px",
                    fontSize: "14px",
                  }}
                >
                  +91
                </span>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone || ""}
                  onChange={(e) => {
                    const val = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 10);
                    setFormData({ ...formData, phone: val });
                  }}
                  maxLength={10}
                  style={{ borderRadius: "0 4px 4px 0", marginLeft: "-1px" }}
                />
              </div>
            </FormGroup>
          ) : (
            <FormGroup>
              <Label>Enter OTP</Label>
              <div style={{ display: "flex", gap: "8px" }}>
                {otp.map((digit, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    style={{
                      width: "56px",
                      height: "56px",
                      fontSize: "16px",
                      textAlign: "center",
                      border: "1px solid #585757ff",
                      borderRadius: "4px",
                      background: "#fff",
                      color: "#222",
                    }}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      const newOtp = [...otp];
                      newOtp[idx] = val;
                      setOtp(newOtp);
                      // Focus next box if filled
                      if (val && idx < 5) {
                        const next = document.getElementById(
                          `otp-box-${idx + 1}`
                        );
                        if (next) next.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        e.preventDefault();
                        const newOtp = [...otp];
                        newOtp[idx] = "";
                        setOtp(newOtp);
                        if (!digit && idx > 0) {
                          const prev = document.getElementById(
                            `otp-box-${idx - 1}`
                          );
                          if (prev) prev.focus();
                        }
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasteData = e.clipboardData
                        .getData("text/plain")
                        .trim();
                      if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
                        const newOtp = pasteData.split("").slice(0, 6);
                        setOtp(newOtp);
                        // Focus the last box if all digits are filled
                        if (newOtp.every((d) => d)) {
                          const lastBox = document.getElementById(
                            `otp-box-${5}`
                          );
                          if (lastBox) lastBox.focus();
                        }
                      }
                    }}
                    id={`otp-box-${idx}`}
                  />
                ))}
              </div>
            </FormGroup>
          )}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner /> {otpStep ? "Verifying OTP..." : "Sending OTP..."}
              </>
            ) : otpStep ? (
              "Verify OTP"
            ) : (
              "Send OTP"
            )}
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

export default SignIn;
