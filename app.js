const express = require("express");
const app = express();
const fs = require("fs");
const { logRequest } = require("./controllers/util");
const {
  c_getAllOwners,
  c_postNewOwner,
  c_getOwner,
  c_updateOwner,
  c_deleteOwner,
  c_ownerGetPets,
  c_ownerPostPets,
} = require("./controllers/owners.controller");
const {
  c_getPetsX,
  c_getPet,
  c_deletePet,
} = require("./controllers/pets.controller");

app.use(express.json());

app.use(logRequest);

app.get("/api/owners", c_getAllOwners);
app.post("/api/owners", c_postNewOwner);
app.get("/api/owners/:id", c_getOwner);
app.patch("/api/owners/:id", c_updateOwner);
app.delete("/api/owners/:id", c_deleteOwner);
app.get("/api/owners/:id/pets", c_ownerGetPets);
app.post("/api/owners/:id/pets", c_ownerPostPets);
app.get("/api/pets", c_getPetsX);
app.get("/api/pets/:id", c_getPet);
app.delete("/api/pets/:id", c_deletePet);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
