import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "./style.scss";

function Filter({
  handleSubmit,
  onSearchChange,
  defaultDescription = "",
  defaultLocation = "",
}) {
  const [description, setDescription] = useState(defaultDescription);
  const [location, setLocation] = useState(defaultLocation);

  useEffect(() => {
    setDescription(defaultDescription);
  }, [defaultDescription]);

  useEffect(() => {
    setLocation(defaultLocation);
  }, [defaultLocation]);

  function searchChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const fieldCheck = e.target.checked;
    onSearchChange(fieldName, fieldValue, fieldCheck);
  }

  return (
    <div className="filter">
      <Form
        onSubmit={handleSubmit}
        className="flex items-center justify-between"
      >
        <FormGroup className="custom-input">
          <Label for="desc" className="mr-sm-2">
            Job Description
          </Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Filter by title, benefits, companies, expertise"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              searchChange(e);
            }}
          />
        </FormGroup>
        <FormGroup className="custom-input">
          <Label for="location" className="mr-sm-2">
            Location
          </Label>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Filter by city, state, zip code or country"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              searchChange(e);
            }}
          />
        </FormGroup>
        <FormGroup className="custom-input checkbox flex items-center space-x-2">
          <Input
            type="checkbox"
            name="fulltime"
            id="fulltime"
            onChange={searchChange}
          />
          <Label for="fulltime" className="mr-sm-2">
            Full Time Only
          </Label>
        </FormGroup>
        <Button>Search</Button>
      </Form>
    </div>
  );
}

export default Filter;
