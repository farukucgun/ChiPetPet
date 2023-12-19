import {
  Card,
  Button,
  Row,
  Col,
  Pagination,
  Dropdown,
  Stack,
} from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";

import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { getAllShelters } from "../../apiHelper/backendHelper";
import ShelterContact from "./shelterContact";
import SearchPetPanel from "../SearchPetPanel";
import axios from "axios";

function SearchShelter() {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [page, setPage] = useState(1);
  const [shelters, setShelters] = useState([]);


  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [sortOption, setSortOption] = useState("None");

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/login_register/get_all_shelters_with_attributes/",
        {
          params: {
            name: name,
            address: address,
            sortOption: sortOption,
          },
        }
      )
      .then((res) => {
        setShelters(res.data.shelters);
      })
      .catch((err) => {
        setTimedAlert("Error retrieving shelters", "error", 3000);
      });
  }, [name, address]);


  let items = [];
  const shelterlPerPage = 6;
  let pageAmount = Math.floor(shelters.length / shelterlPerPage) + 1;
  for (let number = 1; number <= pageAmount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="p-0 w-100 h-100">
        <h1>Search Shelters </h1>
        <Button
          className="position-relative top-2 start-2"
          onClick={() => setCurrentPanel("back")}
        >
          Back
        </Button>
        <div className="d-flex align-items-center mb-5">
          <div className="d-flex mt-1">
            <input
              style={{ marginLeft: "5px" }}
              className="form-control"
              type="text"
              placeholder={name === "" ? "Name" : ""}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              style={{ marginLeft: "5px", marginRight: "5px" }}
              className="form-control"
              type="text"
              placeholder={address === "" ? "Address" : ""}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By{" "}
              {sortOption === "None"
                ? ""
                : sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("username");
                }}
              >
                {"Username(A-Z)"}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("address");
                }}
              >
                {"Address(A-Z)"}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div
          className="d-flex w-70 ms-3 mt-3 flex-column flex-wrap"
          style={{ height: "700px" }}
        >
          {shelters
            .slice(
              (page - 1) * shelterlPerPage,
              (page - 1) * shelterlPerPage + 6
            )
            .map((shelter) => (
              <Card
                key={shelter.user_id}
                className="mb-3 me-3"
                style={{ maxWidth: "576px" }}
              >
                <Row className="no-gutters">
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title>{shelter.username}</Card.Title>
                      <Card.Text>{shelter.address}</Card.Text>
                    </Card.Body>
                  </Col>
                  <Col xs={2} className="d-flex flex-column align-items-center">
                    <Button
                      style={{
                        marginTop: "10px",
                        width: "200px",
                        height: "40px",
                      }}
                      className="mb-2"
                      onClick={() =>
                        setCurrentPanel(
                          <ShelterContact shelterid={shelter.user_id} />
                        )
                      }
                    >
                      Contact
                    </Button>
                    <Button
                      style={{ width: "200px", height: "40px" }}
                      className="mb-2"
                      onClick={() =>
                        setCurrentPanel(
                          <SearchPetPanel shelterid={shelter.user_id} />
                        )
                      }
                    >
                      List Animals
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
        </div>
        <Pagination size="lg">{items}</Pagination>

      </div>
    </>
  );
}

export default SearchShelter;
