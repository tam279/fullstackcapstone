import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { Task } from "../../problemdomain/Interface/Interface";

interface TaskTableProps {
  tasks: Task[];
  handleTaskClick: (task: Task) => void;
  handleEditModalShow: () => void;
  handleEditTask: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  handleTaskClick,
  handleEditModalShow,
  handleEditTask,
}) => {
  const [sortField, setSortField] = useState<keyof Task>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [secondarySortField, setSecondarySortField] = useState<
    keyof Task | "none"
  >("none");
  const [secondarySortOrder, setSecondarySortOrder] = useState<"asc" | "desc">(
    "asc"
  );

  const handleSort = (field: keyof Task) => {
    if (field === sortField) {
      // If the same field is clicked again, reverse the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different field is clicked, set it as the new sorting field with "asc" order
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSecondarySort = (field: keyof Task | "none") => {
    setSecondarySortField(field);
  };

  const handleSecondarySortOrder = (order: "asc" | "desc") => {
    setSecondarySortOrder(order);
  };

  // Custom primary sorting function that handles different data types
  const primarySort = (a: any, b: any) => {
    if (sortOrder === "asc") {
      if (
        typeof a[sortField] === "string" &&
        typeof b[sortField] === "string"
      ) {
        const result = a[sortField].localeCompare(b[sortField]);
        return result !== 0 ? result : secondarySort(a, b);
      } else {
        const result = a[sortField] - b[sortField];
        return result !== 0 ? result : secondarySort(a, b);
      }
    } else {
      if (
        typeof a[sortField] === "string" &&
        typeof b[sortField] === "string"
      ) {
        const result = b[sortField].localeCompare(a[sortField]);
        return result !== 0 ? result : secondarySort(a, b);
      } else {
        const result = b[sortField] - a[sortField];
        return result !== 0 ? result : secondarySort(a, b);
      }
    }
  };

  // Custom secondary sorting function that only applies to tied values
  const secondarySort = (a: any, b: any) => {
    if (secondarySortField === "none") {
      return 0;
    }

    if (
      typeof a[secondarySortField] === "string" &&
      typeof b[secondarySortField] === "string"
    ) {
      const result = a[secondarySortField].localeCompare(b[secondarySortField]);
      return secondarySortOrder === "asc" ? result : -result;
    } else {
      const result = a[secondarySortField] - b[secondarySortField];
      return secondarySortOrder === "asc" ? result : -result;
    }
  };

  // Sort the tasks based on the selected sorting criteria and order
  const sortedTasks = tasks.slice().sort(primarySort);

  const getSortingIndicator = (field: keyof Task) => {
    if (field === sortField) {
      return sortOrder === "asc" ? "↑" : "↓";
    } else if (
      field === secondarySortField &&
      sortField !== secondarySortField
    ) {
      return ` (↑↓${secondarySortOrder === "asc" ? "asc" : "desc"})`;
    }
    return null;
  };

  // State variables for filters
  const [nameFilter, setNameFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [technicianFilter, setTechnicianFilter] = useState<string>("");
  const [dependencyFilter, setDependencyFilter] = useState<string>("");

  // Filter the tasks based on the filter values
  const filteredTasks = sortedTasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      task.status.toLowerCase().includes(statusFilter.toLowerCase()) &&
      task.priorityLevel
        .toString()
        .toLowerCase()
        .includes(priorityFilter.toLowerCase()) &&
      task.technicians.some((tech) =>
        `${tech.firstName} ${tech.lastName}`
          .toLowerCase()
          .includes(technicianFilter.toLowerCase())
      ) &&
      (task.dependencies
        ? task.dependencies
            .join(", ")
            .toLowerCase()
            .includes(dependencyFilter.toLowerCase())
        : true)
    );
  });

  return (
    <>
      <Button variant="primary" onClick={handleEditModalShow}>
        + New Task
      </Button>
      <button>Filter</button>
      <div>
        <label>Secondary Sort:</label>
        <select
          value={secondarySortField}
          onChange={(e) =>
            handleSecondarySort(e.target.value as keyof Task | "none")
          }
        >
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
          <option value="priorityLevel">Priority</option>
          <option value="technicians">Technician name</option>
          <option value="dependencies">Dependency</option>
        </select>
        {secondarySortField !== "none" && (
          <select
            value={secondarySortOrder}
            onChange={(e) =>
              handleSecondarySortOrder(e.target.value as "asc" | "desc")
            }
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        )}
      </div>

      <div>
        <label>Filter by Name:</label>
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <label>Filter by Status:</label>
        <input
          type="text"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <label>Filter by Priority:</label>
        <input
          type="text"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        />
        <label>Filter by Technician:</label>
        <input
          type="text"
          value={technicianFilter}
          onChange={(e) => setTechnicianFilter(e.target.value)}
        />
        <label>Filter by Dependency:</label>
        <input
          type="text"
          value={dependencyFilter}
          onChange={(e) => setDependencyFilter(e.target.value)}
        />
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {getSortingIndicator("name")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {getSortingIndicator("status")}
            </th>
            <th onClick={() => handleSort("priorityLevel")}>
              Priority {getSortingIndicator("priorityLevel")}
            </th>
            <th onClick={() => handleSort("technicians")}>
              Technician name {getSortingIndicator("technicians")}
            </th>
            <th onClick={() => handleSort("dependencies")}>
              Dependency {getSortingIndicator("dependencies")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} onClick={() => handleTaskClick(task)}>
              <td>
                <Button
                  variant="link"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEditTask(task);
                  }}
                >
                  <AiFillEdit size={20} />
                </Button>
                {task.name}
              </td>
              <td>{task.status}</td>
              <td>
                <Form.Control as="select">
                  <option>{task.priorityLevel}</option>
                </Form.Control>
              </td>
              <td>
                {task.technicians
                  ? task.technicians
                      .map((tech) => `${tech.firstName} ${tech.lastName}`)
                      .join(", ")
                  : ""}
              </td>
              <td>
                {task.dependencies ? (
                  <span>{task.dependencies.join(", ")}</span>
                ) : (
                  <span>No Dependency</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TaskTable;
