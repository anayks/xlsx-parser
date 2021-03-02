const table = {
  file: "./../file1.xls", // НАЗВАНИЕ ФАЙЛА ДЛЯ ПАРСИНГА
  topOffset: 8, // ОТСТУП СВЕРХУ
  layer: 2, // НОМЕР СЛОЯ
  bottomOffset: 3, // ЕСЛИ ВНИЗУ ЕСТЬ ЧТО-ТО ЛИШНЕЕ
  leftOffset: 1, // ЕСЛИ ЕСТЬ ОТСТУП СЛЕВА
};

// LAYER 0

// TOP-OFFSET 8
// bottomOffset 3
// leftOffset 0

// LAYER 1 

// TOP-OFFSET 8
// bottomOffset 8
// leftOffset 0

// LAYER 2

// TOP-OFFSET 8
// bottomOffset 3
// leftOffset 1


module.exports = table;