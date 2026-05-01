import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import { Error, Input } from "./FormElements";
import logo from "../../assets/logoc.png";
import Button from "./Button";
import styled from "styled-components";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const FormWrapper = styled.div`
  background-color: var(--color-primary-50);
  padding: 2rem;
  height: 500px;
  min-width: 350px;
  margin: auto auto;
  box-shadow: 0px 1px 10px rgba(var(--shadow-md), 0.1);
  border-radius: var(--radius-md);
`;
const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoWrapper = styled.div`
  width: 150px;
  margin: auto auto;
`;

const FormLogo = styled.img`
  width: 100%;
`;
function LoginForm() {
  const location = useLocation();

  const message = location.state?.message || null;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({});

  const { loginApi, isLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  });
  const handleLogin = (data) => {
    if (data.email !== "" && data.password !== "") {
      loginApi(
        { email: data.email, password: data.password },
        {
          onSuccess: () => {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard", {
              replace: true,
            });
          },
          onError: (error) => {
            setError("root", { message: error.message || "Login failed" });
          },
        },
      );
    }
  };
  return (
    <FormWrapper>
      <FormHeader>
        <LogoWrapper>
          <FormLogo src={logo} alt="Cabin Booking Logo" />
        </LogoWrapper>
        <h2>User Login</h2>
        {message && <Error>{message}</Error>}
        {errors.root && <Error>{errors.root.message}</Error>}
      </FormHeader>
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormRow label={"Email"}>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          <Error>{errors.email?.message}</Error>
        </FormRow>
        <FormRow label={"Password"}>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <Error>{errors.password?.message}</Error>
        </FormRow>
        <FormRow label={""}>
          <Button type="submit" disabled={isSubmitting} variation={"primary"}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </FormRow>
      </form>
    </FormWrapper>
  );
}

export default LoginForm;
