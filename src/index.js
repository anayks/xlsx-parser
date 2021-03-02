const Mattress = require("./db/index.js");
const parser = require("./parser/index.js");
const config = require("./config/output.js");

const WRITE = config.type;

if(WRITE == "CONSOLE") {
  async function consoleParser() {
    const list = await parser();
    console.log(list);
  }
  consoleParser();
} else if(WRITE == "READ") {
  async function getData() {
    const Table = await Mattress();
    const result = await Table.findAll();
    console.log(result);
  }
  
  getData();
} else if(WRITE == "WRITING") {
  async function pushListInDataBase() {
    const Table = await Mattress();
    const list = await parser();
    for(let i = 0; i < list.length; i++) {
      const item = list[i];
      const obj = {
        name,
        price,
        sale,
        price_opt,
        created_at,
        updated_at,
      } = item;
      Table.create(obj);
    }
  }
  
  pushListInDataBase();
}