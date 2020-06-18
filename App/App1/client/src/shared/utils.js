export function isEmpty(string) {
  return string === null || string === "" || string === undefined;
}

export function isNotEmpty(string) {
  return !isEmpty(string);
}

export function formatDate(date) {
  let processDate = new Date(date),
    month = "" + (processDate.getMonth() + 1),
    day = "" + processDate.getDate(),
    year = processDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

export function getWarehouseNameByWarehouseCode(warehouses, selectedCode) {
  let warehouseName = "";

  warehouses.map(warehouse => {
    if (warehouse.wareHouseCode === selectedCode) {
      warehouseName = warehouse.name;
    }
    return null;
  });
  return warehouseName;
}

export function changeDateFormat(date, dateFormat) {
  let processDate = new Date(date),
    month = "" + (processDate.getMonth() + 1),
    day = "" + processDate.getDate(),
    year = processDate.getFullYear(),
    monthName = processDate.toLocaleDateString("default", { month: "short" });

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  switch (dateFormat) {
    case "dd/MM/yyyy":
      return [day, month, year].join("/");
    case "MM/dd/yyyy":
      return [month, day, year].join("/");
    case "dd/MMM/yyyy":
      return [day, monthName, year].join("/");
    case "MMM/dd/yyyy":
      return [monthName, day, year].join("/");
    default:
      return [day, month, year].join("/");
  }
}

export function isEvenNumber(number) {
  if (parseFloat(number) % 2 === 0) {
    return true;
  }
  return false;
}

export function ArrayToString(array) {
  return array.join("^");
}

export function textTruncate(str = "", length = 100, ending = "...") {
  if (str === null || str === undefined) {
    return "";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
