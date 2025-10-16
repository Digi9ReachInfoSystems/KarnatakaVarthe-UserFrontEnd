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
    ForgotPasswordContainer,
  SubmitButton,
} from "./Sign-In.styles";
import { LoginPageApi } from "../../../services/auth/LoginApi";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const { showSuccess, showError, showWarning } = useToast();
  const [loading , setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const response = await LoginPageApi(payload);

      if (response?.success) {
        showSuccess("Login successful");
        Cookies.set("sessionToken", response.token, {
          expires: 7,
          secure: true,
        });
        Cookies.set("userId", response.userId, {
          expires: 7,
          secure: true,
        });

        Navigate("/");
      } else {
        showError("Login failed. Please try again.");
      }
    } catch (err) {
        console.log(err);
        const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please try again.";
    
      showError(errorMessage);
      console.error("Login Error:", err);
    
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
          <SocialButton>
            <img src={GoogleIcon} alt="Google" className="icon" />
            Sign in with Google
          </SocialButton>
          <IconButtonsWrapper>
            <IconButton>
              <FaFacebook className="icon facebook" />
            </IconButton>
            <IconButton>
              <FaApple className="icon apple" />
            </IconButton>
          </IconButtonsWrapper>
        </SocialButtonsContainer>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Enter your username or email address</Label>
            <Input
              type="text"
              placeholder="Username or email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormGroup>

         <FormGroup>
  <Label>Enter your Password</Label>
 <div style={{ position: 'relative' }}>
    <Input
      type={show ? "text" : "password"}
      placeholder="Password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      style={{ paddingRight: '40px' }} // Ensure there's space for the icon
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
  {/* <ForgotPasswordContainer>
    <StyledLink as={Link} to="/forgot-password">
      Forgot Password
    </StyledLink>
  </ForgotPasswordContainer> */}
</FormGroup>


          <SubmitButton type="submit" disabled={loading}>
          {loading ? (
    <>
      <Spinner />
      Signing in...
    </>
  ) : (
    "Sign in"
  )}
</SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

export default SignIn;
