const { checkId } = require('./util');

const {
    getAllOwners,
    postNewOwner,
    getOwner,
    updateOwner,
    deleteOwner,
  } = require("../models/owners.model");

const { c_deletePetsByOwner, c_getPets, c_addPet } =  require("./pets.controller");

function c_getAllOwners(req, res)
{
    const ownersData = getAllOwners();
    res.send({ owners: ownersData });
}

function c_postNewOwner (req, res)
{
    try {
      const owner = postNewOwner(req.body.name, req.body.age);
      res.send({ owner });
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: "bad request" });
    }
}

function c_getOwner(req, res)
{
    try {
      const ownerId = req.params.id;
      checkId(ownerId);
      const owner = getOwner(ownerId);
      res.send({ owner });
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: "bad request" });
    }
}

function c_updateOwner(req, res)
{
    try
    {
      const ownerId = req.params.id;
      checkId(ownerId);
      const owner = getOwner(ownerId);
      const updatedOwner = updateOwner(ownerId, req.body.name, req.body.age);
  
      res.send({ owner: updatedOwner });
    }
    catch (err)
    {
      console.log(err);
      res.status(400).send({ msg: "bad request" });
    }
}

function c_deleteOwner(req, res)
{
    let errObj = { msg: "bad request" };
    let errCode = 400;
  
    try {
      const ownerId = req.params.id;
      checkId(ownerId);
  
      const owner = getOwner(ownerId);
  
      errObj = { msg: "internal server error" };
      errCode = 500;
  
      deleteOwner(ownerId);

      c_deletePetsByOwner(ownerId)

      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(errCode).send(errObj);
    }
  }
  
function c_ownerGetPets(req, res)
{
    try
    {
      const ownerId = req.params.id;
      checkId(ownerId);
      getOwner(ownerId);
      const petsData = c_getPets(ownerId);
      res.send({ pets: petsData });
    }
    catch (err)
    {
      console.log(err);
      res.status(400).send({ msg: "bad request" });
    }
}

function c_ownerPostPets(req, res)
{
    try
    {
      const ownerId = req.params.id;
      checkId(ownerId);
  
      const owner = getOwner(ownerId);
  
      const petData = c_addPet(
        ownerId,
        req.body.name,
        req.body.avatarUrl,
        req.body.favouriteFood,
        req.body.age,
        req.body.temperament
      );
      res.send({ pets: petData });
    }
    catch (err)
    {
      console.log(err);
      res.status(400).send({ msg: "bad request" });
    }
}  

module.exports = { c_getAllOwners, c_postNewOwner, c_getOwner, c_updateOwner, c_deleteOwner, c_ownerGetPets, c_ownerPostPets }
