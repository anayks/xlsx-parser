// type:
// WRITE - запись в бд
// READ - чтение из бд
// CONSOLE - запись в консоль

// path - путь к бд
// filename - название файла .db
// modelName - условное название модели

const table = {
  fileName: "nuvolaGrid",
  modelName: "nuvola",
  path: "../database/",
  type: "CONSOLE", 
};

module.exports = table;