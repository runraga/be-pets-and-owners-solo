const fs = require("fs");

exports.getAllOwners = () => {
  const ownersFilenames = fs.readdirSync("./data/owners");
  const ownersData = [];
  for (const owner of ownersFilenames) {
    const ownerData = fs.readFileSync("./data/owners/" + owner, "utf-8");
    ownersData.push(JSON.parse(ownerData));
  }
  return ownersData;
};
exports.postNewOwner = (name, age) => {
  if (name === undefined || age === undefined) {
    throw new Error("Object needs age and name keys");
  }
  const ownerId = `o${Date.now()}`;
  const pathToDatafile = "./data/owners/" + ownerId + ".json";
  const owner = { id: ownerId, name, age };
  fs.writeFileSync(pathToDatafile, JSON.stringify(owner));
  return owner;
};
exports.getOwner = (ownerId) => {
  const pathToDatafile = "./data/owners/" + ownerId + ".json";
  return JSON.parse(fs.readFileSync(pathToDatafile, "utf-8"));
};
exports.updateOwner = (ownerId, name, age) => {
  if (name === undefined || age === undefined) {
    throw new Error("Object needs age and name keys");
  }
  const pathToDatafile = "./data/owners/" + ownerId + ".json";
  const owner = { id: ownerId, name, age };
  fs.writeFileSync(pathToDatafile, JSON.stringify(owner));
  return owner;
};
exports.deleteOwner = (ownerId) =>{
    const pathToDatafile = "./data/owners/" + ownerId + ".json";
    fs.unlinkSync(pathToDatafile);
}
