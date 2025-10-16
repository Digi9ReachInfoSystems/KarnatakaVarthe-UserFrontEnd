import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignupContainer,
  LeftSection,
  RightSection,
  SignupBox,
  Input,
  Button,
  LinkText,
} from "../signuppage/Signup.styles";
import Logowithtitle from "../../components/Logowithtitle/Logowithtitle";
import { SignupApi } from "../../services/auth/SignupApi";
import { CiMail } from "react-icons/ci";
import Cookies from "js-cookie"; // Import js-cookie
import { useToast } from "../../context/ToastContext";

const SignUppage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    displayName: "",
    phone_Number: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    displayName: "",
    phone_Number: "",
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    let errorMsg = "";
    if (value.trim() === "") {
      errorMsg = `${name} is required.`;
    } else if (name === "phone_Number") {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(value)) {
        errorMsg = "Enter a valid phone number (10-15 digits).";
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = "Enter a valid email address.";
      }
    } else if (name === "password") {
      if (value.length < 8) {
        errorMsg = "Password must be at least 8 characters.";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const isFormValid = () => {
    return (
      formData.displayName.trim() &&
      formData.phone_Number.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      !errors.displayName &&
      !errors.phone_Number &&
      !errors.email &&
      !errors.password
    );
  };

  const handleSignup = async () => {
    if (!isFormValid()) return;
    setIsLoading(true);
    const userData = {
      displayName: formData.displayName,
      phone_Number: formData.phone_Number,
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await SignupApi(userData);
      if (response.success) {
        showSuccess("Signup successful!", "Please login.");
        navigate("/login");
      } else {
        showError("Signup failed", response.message || "Signup failed.");
      }
    } catch (err) {
      showError("Signup API Error", "Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupContainer>
      <LeftSection>
        <Logowithtitle />
      </LeftSection>
      <RightSection>
        <SignupBox>
          <h2>Sign up</h2>
          <label>Full Name</label>
          <Input
            type="text"
            name="displayName"
            placeholder="Enter your full name"
            value={formData.displayName}
            onChange={handleChange}
          />
          {errors.displayName && <p>{errors.displayName}</p>}

          <label>Phone Number</label>
          <Input
            type="text"
            name="phone_Number"
            placeholder="Enter your phone number"
            value={formData.phone_Number}
            onChange={handleChange}
          />
          {errors.phone_Number && <p>{errors.phone_Number}</p>}

          <label>Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}

          <label>Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}

          <Button disabled={!isFormValid() || isLoading} onClick={handleSignup}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>

          <p>
            Do you have an account? <LinkText onClick={() => navigate("/login")}>Login now</LinkText>
          </p>
        </SignupBox>
      </RightSection>
    </SignupContainer>
  );
};

export default SignUppage;