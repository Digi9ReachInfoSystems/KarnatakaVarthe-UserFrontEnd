import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Header,
  HeaderLeft,
  HeaderRight,
  Subtitle,
  Title,
  AccountText,
  StyledLink,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Spinner,
} from "./SignUp-Page.styles";
import { useToast } from "../../../context/ToastContext";
import {
  checkuserExists,
  UserSignupWithPhoneApi,
} from "../../../services/auth/SignupApi";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { showSuccess, showError, showWarning } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
    phone: ""
   
  });
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState(null);

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
        const res = await checkuserExists(`+91${formData.phone}`);
        if (res.success) {
          showError("User with this phone number already exists.");
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

        // FIX: Save the confirmation result to state
        setConfirmationResult(result);
        setOtpStep(true);
        showSuccess("OTP sent to your phone number.");
      } else {
        const code = otp.join("");

        if (code.length === 6 && confirmationResult) {
          const result = await confirmationResult.confirm(code);
          const firebaseUID = result.user.uid;
          showSuccess("OTP verified successfully!");
          // Call signup API with phone data
          const phoneData = {
            firebaseUid: firebaseUID,
            email: formData.email,
            phone_Number: `+91${formData.phone}`,
            displayName: formData.displayName,
          };
          try {
            const signupRes = await UserSignupWithPhoneApi(phoneData);
            if (signupRes.success) {
              showSuccess("Signup completed successfully!");
              // Optionally redirect or reset form
              navigate("/signin");
            } else {
              showError(signupRes.message || "Signup failed.");
            }
          } catch (err) {
            showError("Signup API error.");
          }
        } else {
          showError("Please enter a valid 6-digit OTP");
        }
      }
    } catch (err) {
      showError(err.message || "Error during signup."); // Show the real error
      // FIX: Clear the verifier so the user can retry
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
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
            <Title>Sign up</Title>
          </HeaderLeft>
          <HeaderRight>
            <AccountText>Have an Account?</AccountText>
            <StyledLink as={Link} to="/signin">
              Sign in
            </StyledLink>
          </HeaderRight>
        </Header>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>User name</Label>
            <Input
              type="text"
              placeholder="User name"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              disabled={otpStep}
            />
          </FormGroup>
          <FormGroup>
            <Label>Enter your email address</Label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={otpStep}
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
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
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 10);
                  setFormData({ ...formData, phone: val });
                }}
                maxLength={10}
                style={{ borderRadius: "0 4px 4px 0", marginLeft: "-1px" }}
                disabled={otpStep}
              />
            </div>
          </FormGroup>
          {otpStep && (
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

export default SignUp;
