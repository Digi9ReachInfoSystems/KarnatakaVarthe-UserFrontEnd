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
import { SignupPageApi } from "../../../services/auth/SignupApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


  const SignUp = () => {
  const { showSuccess, showError, showWarning } = useToast();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        displayName: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };
      if (!payload.displayName || !payload.email || !payload.password) {
        showWarning("All fields are required");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        showWarning("Invalid email format");
        return;
      }
      const res = await SignupPageApi(payload);

      if (res.success) {
        showSuccess(
          "Signup successful. Please check your email for verification."
        );
        setFormData({ email: "", username: "", password: "" });
        Navigate("/signin");
      } else {
        showError("Signup failed. Please try again.");
        if(res.message){
          showError(res.message);
        }
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong. Please try again.";
  
    showError(errorMessage);
    console.error("Signup Error:", err);
   
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <HeaderLeft>
            <Subtitle>
              Welcome to <span className="highlight">DIPR</span>
            </Subtitle>
            <Title>Sign up</Title>
          </HeaderLeft>
          <HeaderRight>
            <AccountText>Have an Account ?</AccountText>
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
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
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
            />
          </FormGroup>

          <FormGroup>
            <Label>Enter your Password</Label>
            <div style={{ position: "relative" }}>
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                style={{ paddingRight: "40px" }}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
  {loading ? (
    <>
      <Spinner /> Signing up...
    </>
  ) : (
    "Sign up"
  )}
</SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUp;
