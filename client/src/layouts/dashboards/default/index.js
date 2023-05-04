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

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import TodoList from "layouts/pages/projects/general/components/TodoList";
import Modal from "layouts/pages/projects/general/components/TodoModal/modal";
import IllustrationSignUp from "layouts/authentication/sign-up/illustration";


// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// React components
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

function Default() {
  const { values } = breakpoints;

  const [cookie, setCookie, removeCookie] = useCookies();

  const email = cookie.email;
  const authToken = cookie.AuthToken;

  const [todos, setTodos] = useState(null);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(null);
  
  // const getNames = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_SERVERURL}/users/${email}`
  //     );
  //     const json = await response.json();
  //     setCookie("name", json.name);
  //     // setCookie("lastName", json.last_name);
  //     // setCookie("profilePicture", json.profile_picture);
  //   } catch (err) {
  //     console.error(err.message); 
  //   }
  // };

  const getName = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/users/${email}`
      );
      const json = await response.json();
      setName(json);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${email}`
      );
      const json = await response.json();
      setTodos(json);
      console.log(todos);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
    getName();
  }, []);

  //group the todos by project
  const todosByProject = todos
    ? todos.reduce((acc, todo) => {
        if (!acc[todo.project]) {
          acc[todo.project] = [];
        }
        acc[todo.project].push(todo);
        return acc;
      }, {})
    : {};

  const todoLists = Object.entries(todosByProject).map(
    ([project, todos, index]) => (
      <SoftBox py={3}>
        <TodoList
          key={`${project}-${index}`}
          project={project}
          todos={todos}
          getData={getData}
        />
      </SoftBox>
    )
  );

  return (
    <div>
      {!authToken && <IllustrationSignUp/>}
      {authToken && (
        <div>
          <DashboardLayout>
            <DashboardNavbar />
            <SoftBox mb={3} p={1} py={3}>
              <Grid container>
                <Grid item xs={12} lg={12}>
                  <SoftBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                    px={2}
                  >
                    <SoftTypography
                      variant={window.innerWidth < values.sm ? "h3" : "h2"}
                      textTransform="capitalize"
                      fontWeight="bold"
                    >
                      hello, {name}
                    </SoftTypography>
                    <SoftBox>
                      <SoftButton
                        to={"/projects"}
                        variant="outlined"
                        size="small"
                        color={"primary"}
                        type="submit"
                        onClick={() => setModal(true)}
                      >
                        CREATE NEW PROJECT
                      </SoftButton>
                    </SoftBox>
                  </SoftBox>

                  <Grid spacing={3} ml={1}>
                    {todoLists}
                  </Grid>
                </Grid>
              </Grid>
              {/* <SoftBox mb={3} p={1}>
                <MiniStatisticsCard
                  title={{ text: "today's users", fontWeight: "bold" }}
                  count="2,300"
                  percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </SoftBox> */}
            </SoftBox>
            <Footer />
          </DashboardLayout>
          <SoftBox>
            {modal && (
              <Modal
                id={""}
                project={" "}
                title={""}
                description={""}
                date={""}
                progress={0}
                setModal={setModal}
                getData={getData}
                mode={"createProject"}
              />
            )}
          </SoftBox>
        </div>
      )}
    </div>
  );
}

export default Default;
