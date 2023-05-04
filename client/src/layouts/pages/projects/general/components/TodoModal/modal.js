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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

import { useState } from "react";
import { useCookies } from "react-cookie";

function Modal({
  id,
  project,
  title,
  description,
  date,
  progress,
  authors,
  setModal,
  getData,
  email,
  mode,
}) {
  const editMode = mode === "edit" ? true : false;
  const createProjectMode = mode === "createProject" ? true : false;
  const [cookie, setCookie, removeCookie] = useCookies(null);

  const [data, setData] = useState({
    email: editMode ? email : cookie.email,
    description: editMode ? description : "",
    title: editMode ? title : "",
    progress: editMode ? progress : 0,
    date: editMode ? date : new Date(),
    project: editMode ? project : project,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const editTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (response.status === 200) {
        setModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 200) {
        setModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          }}
        >
          <SoftBox mb={3}>
            <SoftButton
              component={Link}
              to={"/projects"}
              variant="outlined"
              size="small"
              color={"primary"}
              onClick={() => setModal(false)}
            >
              Close
            </SoftButton>
          </SoftBox>
          {createProjectMode ? (
            <SoftBox pt={1} px={0.5} mb={5}>
              <SoftTypography variant="h5" textTransform="capitalize">
                Project Title
              </SoftTypography>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftInput
                  type="text"
                  value={data.project}
                  onChange={handleChange}
                  name="project"
                  placeholder="Project Title"
                />
              </SoftBox>
            </SoftBox>
          ) : null}
          <SoftBox pt={1} px={0.5}>
            <SoftBox mb={3}>
              <SoftTypography variant="h6" textTransform="capitalize">
                Task Title
              </SoftTypography>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftInput
                  type="text"
                  value={data.title}
                  onChange={handleChange}
                  name="title"
                  placeholder="Task Title"
                />
              </SoftBox>
            </SoftBox>
            <SoftBox mb={3} lineHeight={0}>
              <SoftTypography variant="h6" textTransform="capitalize">
                Task Description
              </SoftTypography>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftInput
                  type="text"
                  value={data.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Task Description"
                />
              </SoftBox>
            </SoftBox>
            <SoftBox mb={3} lineHeight={0}>
              <SoftTypography variant="h6" textTransform="capitalize">
                Progress
              </SoftTypography>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftInput
                  type="number"
                  value={data.progress}
                  onChange={handleChange}
                  name="progress"
                  placeholder="Task Progress"
                />
              </SoftBox>
            </SoftBox>
            <SoftBox mb={3} lineHeight={0}>
              <SoftTypography variant="h6" textTransform="capitalize">
                Date
              </SoftTypography>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftInput
                  type="date"
                  value={data.date}
                  onChange={handleChange}
                  name="date"
                  placeholder="Task Date"
                />
              </SoftBox>
            </SoftBox>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SoftBox display="flex"></SoftBox>
              <SoftBox>
                <SoftButton
                  component={Link}
                  to={"/projects"}
                  variant="outlined"
                  size="small"
                  color={"info"}
                  type="submit"
                  onClick={editMode ? editTodo : postTodo}
                >
                  SUBMIT
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </div>
    </div>
  );
}

// Setting default values for the props of DefaultProjectCard
Modal.defaultProps = {
  id: "Default id",
  title: "Default title",
  description: "Default description",
  date: "Default date",
  progress: 0,
};

// Typechecking props for the DefaultProjectCard
Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};

export default Modal;
