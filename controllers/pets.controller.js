const { checkId } = require("./util");
const { getPets, deletePet, addPet, getPet } = require("../models/pets.model");

function c_deletePetsByOwner(ownerId) {
  const petsData = getPets(ownerId);
  for (const pet of petsData) {
    deletePet(pet.id);
  }
}

function c_getPetsX(req, res) {
  let sort = "id";
  let order = "asc";

  if (req.query.sort_by) {
    sort = req.query.sort_by;
  }
  if (req.query.order) {
    sort = req.query.order;
  }
  const petsData = getPets();
  petsData.sort((a, b) => {
    return a[sort] - b[sort];
  });
  res.send({ pets: petsData });
}

function c_getPets(ownerId) {
  return getPets(ownerId);
}

function c_addPet(ownerId, name, avatarUrl, favouriteFood, age, temperament) {
  return addPet(ownerId, name, avatarUrl, favouriteFood, age, temperament);
}

function c_getPet(req, res) {
  try {
    const petId = req.params.id;
    checkId(petId);

    const pet = getPet(petId);
    res.send({ pet });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "bad request" });
  }
}

function c_deletePet(req, res) {
  try {
    const petId = req.params.id;
    checkId(petId);

    deletePet(petId);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "bad request" });
  }
}

module.exports = {
  c_deletePetsByOwner,
  c_getPets,
  c_addPet,
  c_getPetsX,
  c_getPet,
  c_deletePet,
};
