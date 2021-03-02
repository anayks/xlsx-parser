const xlsx = require("node-xlsx");
const SellItem = require("../classes/sellItem");
const input_config = require("./../config/input.js");

const ITEM_SIZES = [
  3, // Альба
  5, // Бьянко
  5, // БС
  5, // Сабина
  5, // Оливия
  1,
  1,
  1,
  1,
  1,
  4,
  4,
  5,
  3,
  4,
  4,
  3,
  3,
  3,
  1,
  3,
  3,
  3,
];

// НУЖНО РУЧКАМИ ПРОПИСЫВАТЬ В 
// ЭТОМ МАССИВЕ РАЗМЕРЫ ИТЕМОВ В СТРОКАХ

let summ = 0;
ITEM_SIZES.map((data) => summ += data);
console.log(summ);

function sliceList(array) {
  array = array.slice(OFFSET_TOP, array.length - OFFSET_BOTTOM);
  // console.log(array);
  return array;
}

function separateList(array) {
  const NEW_LIST = [];
  for(let i = 0; i < ITEM_SIZES.length; i++) {
    const ARRAY_ITEM = [];
    let START_ITER = 0;
    for(let k = 0; k < i; k++) {
      START_ITER += ITEM_SIZES[k];
    }
    const END_ITER = START_ITER + ITEM_SIZES[i];
    for(let k = START_ITER; k < END_ITER; k++) {
      ARRAY_ITEM.push(array[k]);
    }
    NEW_LIST.push(ARRAY_ITEM);
  }
  return NEW_LIST;
}

const reg_height = /([0-9]{1,})\*{1,}/;

function getSize(width, height) {
  if(!width || !height) {
    return ``;
  }
  return ` ${width}x${height} `;
}

function parseList(target, data) {
  for(let i = 0; i < data.length; i++) {
    for(let k = 0; k < data[i].length; k++) {
      data[i][k] = data[i][k].slice(OFFSET_LEFT, data[i][k].length);
      console.log(data[i][k]);
      const data_item = data[i][k];
      const LIST_WIDTH = [190, 200];
      for(let j = 0; j < LIST_WIDTH.length; j++) {
        const obj = {};
        let name = null; 
        if(!data[i][k][0]) {
          name = data[i][0][0].replace(/\n/g, '');
        } else {
          name = data[i][k][0].replace(/\n/g, '');
        }
        if(!data_item[2] && j == 1) {
          continue;
        }
        let result = null;
        if(!data_item[2]) {
          result = null;
        } else {
          result = data_item[2].match(reg_height);
        }
        const secondCategory = parseInt(data_item[8]);
        obj.name = `${name} ${getSize(result != null ? result[1] : null, LIST_WIDTH[j])} 1 категория`;
        obj.sale = parseInt(data_item[4]);
        obj.price = parseInt(data_item[3]);
        let item = new SellItem(obj);
        target.push(item);
        if(isNaN(secondCategory)) {
          // console.log(data_item[8]);
          continue;
        }
        obj.name = `${name} ${getSize(result != null ? result[1] : null, LIST_WIDTH[j])} 2 категория`;
        obj.sale = parseInt(data_item[9]);
        obj.price = parseInt(data_item[8]);
        item = new SellItem(obj);
        target.push(item);
        obj.name = `${name} ${getSize(result != null ? result[1] : null, LIST_WIDTH[j])} 3 категория`;
        obj.sale = parseInt(data_item[12]);
        obj.price = parseInt(data_item[11]);
        item = new SellItem(obj);
        target.push(item);
      }
    }
  }
}

const LAYER = input_config.layer;
const OFFSET_TOP = input_config.topOffset;
const OFFSET_BOTTOM = input_config.bottomOffset;
const OFFSET_LEFT = input_config.leftOffset;

module.exports = async () => {
  const LIST = [];
  const workSheetsFromFile = xlsx.parse(input_config.file);
  const sheet = workSheetsFromFile[LAYER].data;
  const slicedList = sliceList(sheet, OFFSET_TOP, OFFSET_BOTTOM);
  const separatedList = separateList(slicedList);
  parseList(LIST, separatedList);
  return LIST;
}