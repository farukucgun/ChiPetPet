import {
  Card,
  Button,
  Row,
  Col,
  Pagination,
  Dropdown,
  Stack,
} from "react-bootstrap";
import emptyImg from "../assets/empty.png";
import { PanelContext } from "../contexts/panelContext";
import React, { useContext, useState, useEffect } from "react";
import AdoptionApply from "./AdoptionApply";
import ShelterContact from "./shelter/shelterContact";
import { getPetById } from "../apiHelper/backendHelper";
import { useAlert } from "../AlertContext";
import HealthRecords from "./healthRecords";

function SingleAnimalPanel(props) {
  const { setTimedAlert } = useAlert();

  let petid = props.petid;
  const [pet, setPet] = useState([]);

  useEffect(() => {
    // Fetch pets data from the backend when the component mounts
    getPetById(petid)
      .then((res) => {
        setPet(res.data.pet);
        console.log(res.data.pet);
      })
      .catch((err) => {
        setTimedAlert("Error retrieving animals", "error", 3000);
      });
  }, []);

  const { setCurrentPanel } = useContext(PanelContext);

  return (
    <>
      <div className="p-0">
        <Button
          className="position-relative top-2 start-2"
          onClick={() => setCurrentPanel("back")}
        >
          Back
        </Button>

        <div className="d-flex w-70 ms-3 mt-3">
          <img
            src={
              pet.photo === null
                ? emptyImg
                : `data:image/png;base64, ${pet.photo}`
            }
            style={{ objectFit: "cover", maxWidth: "50%" }}
          />
          <div className="ms-3">
            <h1>Hi, I am {pet.name}</h1>
            <p>From: {pet.shelter_name}</p>
            <div className="mt-3 d-flex flex-wrap">
              <div className="column me-4">
                <p>Species: {pet.species}</p>
                <p>Breed: {pet.breed}</p>
              </div>
              <div className="column" style={{ marginLeft: "50px" }}>
                <p>Age: {pet.age}</p>
                <p>Gender: {pet.gender}</p>
              </div>
            </div>
            <p>I am: {pet.description}</p>
          </div>
        </div>
        <div className="mt-3"></div>
        <div className="mt-3">
          {/* Add buttons below */}
          <Button
            variant="primary"
            className="me-2"
            disabled={pet.adoption_status === "ADOPTED"}
            style={{ borderWidth: "3px", color: "white", borderRadius: "20px" }}
            onClick={() =>
              setCurrentPanel(
                <AdoptionApply
                  pet_id={petid}
                  animal_shelter_id={pet.shelter_id}
                  pet_name={pet.name}
                  animal_shelter_name={pet.shelter_name}
                />
              )
            }
          >
            Apply For Adoption
          </Button>
          <Button
            variant="primary"
            className="me-2"
            style={{
              borderWidth: "3px",
              background: "white",
              borderRadius: "20px",
              color: "#f0087c",
            }}
            onClick={() =>
              setCurrentPanel(
                <HealthRecords petid={petid} petname={pet.name} />
              )
            }
          >
            See Health Report
          </Button>
          <Button
            variant="primary"
            className="me-2"
            style={{
              borderWidth: "3px",
              background: "white",
              borderRadius: "20px",
              color: "#f0087c",
            }}
            onClick={() =>
              setCurrentPanel(<ShelterContact shelterid={pet.shelter_id} />)
            }
          >
            Contact With Shelter
          </Button>
        </div>
      </div>
    </>
  );
}

export default SingleAnimalPanel;
