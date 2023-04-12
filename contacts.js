const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);
    console.table(parsedData);
  } catch (error) {
    console.log(error.message);
  }
};
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);
    console.log(JSON.parse(data).find((item) => item.id === contactId));
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);
    const idx = parsedData.indexOf(
      parsedData.find((item) => item.id === contactId)
    );
    if (idx !== -1) {
      parsedData.splice(idx, idx + 1);
      const writeData = await fs.writeFile(
        contactsPath,
        JSON.stringify(parsedData)
      );
      listContacts();
    } else {
      return console.log("Contact doesn't exist");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, phone, email) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);
    if (
      !parsedData.find(
        (item) =>
          item.name === name || item.phone === phone || item.email === email
      )
    ) {
      parsedData.push({ id: nanoid(), name, phone, email });
      const writeData = await fs.writeFile(
        contactsPath,
        JSON.stringify(parsedData)
      );
      listContacts();
    } else {
      return console.log("Contact exists");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const functions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
module.exports = functions;
