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
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dasboard PRO Material components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// General page components
import Todo from "layouts/pages/projects/general/components/Todo";
import Modal from "../TodoModal/modal";

import { useState } from "react";

function TodoList({ project, todos, getData }) {
  //Sort the todos by date
  const sortedTodos = todos?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const [modal, setModal] = useState(false);

  return (
    <div>
      <div>
        <Card>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={2}
            px={2}
          >
            <SoftTypography variant="h6" fontWeight="medium">
              {project}
            </SoftTypography>
            <SoftBox>
              <SoftButton
                to={"/projects"}
                variant="outlined"
                size="small"
                color={"dark"}
                type="submit"
                onClick={() => setModal(true)}
              >
                CREATE TASK
              </SoftButton>
            </SoftBox>
          </SoftBox>
          <Divider />
          <SoftBox pb={2} px={2}>
            <SoftBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
            >
              {sortedTodos?.map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  project={todo.project}
                  description={todo.description}
                  date={todo.added_date}
                  progress={todo.progress}
                  getData={getData}
                />
              ))}
            </SoftBox>
          </SoftBox>
        </Card>
      </div>

      <div>
        {modal && <Modal mode={'create'} setModal={setModal} getData={getData} project={project} />}
      </div>
    </div>
  );
}

TodoList.propTypes = {
  project: PropTypes.string.isRequired,
};

export default TodoList;
