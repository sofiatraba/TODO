/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Sofia Traba (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Switch from "@mui/material/Switch";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import { useCookies } from "react-cookie";

// Images
import rocket from "assets/images/illustrations/rocket-white.png";

function IllustrationSignUp() {
  const [agreement, setAgreemnet] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetAgremment = () => setAgreemnet(!agreement);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [cookie, setCookie, removeCookie] = useCookies([null]);
  const [error, setError] = useState(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [fname, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogIn = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const title = isLogIn ? "Log In" : "Sign Up";

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords do not match");
      console.log(error);
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, fname }),
        }
      );
      const data = await response.json();
      if (data.message) {
        setError(data.message);
      } else {
        setCookie("AuthToken", data.token);
        setCookie("email", email);
        window.location.reload();
      }
    }
  };

  return (
    <IllustrationLayout
      title={title}
      illustration={{
        image: rocket,
        title: "Your journey starts here",
        description: "Time is not refundable; use it with intention.",
      }}
    >
      <SoftBox component="form" role="form">
        {!isLogIn ? <SoftBox mb={2}>
          <SoftInput
            placeholder="Name"
            size="large"
            onChange={(e) => setName(e.target.value)}
          />
        </SoftBox>: null}
        <SoftBox mb={2}>
          <SoftInput
            type="email"
            placeholder="Email"
            size="large"
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="password"
            placeholder="Password"
            size="large"
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        {!isLogIn ? (
          <div>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Confirm Password"
                size="large"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                {error && <p>{error}</p>}
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
          </div>
        ) : (
          <div>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                {error && <p>{error}</p>}
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </SoftTypography>
            </SoftBox>
          </div>
        )}
        <SoftBox mt={4} mb={1}>
          <SoftButton
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
            variant="gradient"
            color="info"
            size="large"
            fullWidth
          >
            SUBMIT
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          {isLogIn ? (
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Don't have and account?&nbsp;
              <SoftTypography
                onClick={() => viewLogIn(false)}
                variant="button"
                color="info"
                fontWeight="bold"
                textGradient
              >
                Sign up
              </SoftTypography>
            </SoftTypography>
          ) : (
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Already have an account?&nbsp;
              <SoftTypography
                onClick={() => viewLogIn(true)}
                variant="button"
                color="info"
                fontWeight="bold"
                textGradient
              >
                Log in
              </SoftTypography>
            </SoftTypography>
          )}
        </SoftBox>
      </SoftBox>
    </IllustrationLayout>
  );
}

export default IllustrationSignUp;
