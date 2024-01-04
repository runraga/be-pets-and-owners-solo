const fs = require("fs");

exports.getPets = (ownerId) => {
  const petFilenames = fs.readdirSync("./data/pets");
  const petsData = [];
  for (const pet of petFilenames) {
    const petData = JSON.parse(fs.readFileSync("./data/pets/" + pet, "utf-8"));
    if (ownerId === undefined || petData.owner === ownerId) {
      petsData.push(petData);
    }
  }
  return petsData;
};
exports.getPet = (petId) => {
  const pathToDatafile = "./data/pets/" + petId + ".json";
  const pet = JSON.parse(fs.readFileSync(pathToDatafile, "utf-8"));
  return pet;
};
exports.deletePet = (petId) => {
  fs.unlinkSync("./data/pets/" + petId + ".json");
};
exports.addPet = (
  ownerId,
  name,
  avatarUrl,
  favouriteFood,
  age,
  temperament
) => {
  const args = [name, avatarUrl, favouriteFood, age, temperament];
  for (const arg of args) {
    if (arg === undefined) {
      throw new Error("Pet key missing");
    }
  }
  const petId = `p${Date.now()}`;
  const petFilename = "./data/pets/" + petId + ".json";
  const petData = {
    id: petId,
    owner: ownerId,
    name,
    avatarUrl,
    favouriteFood,
    age,
    temperament,
  };
  fs.writeFileSync(petFilename, JSON.stringify(petData));
  return petData;
};
