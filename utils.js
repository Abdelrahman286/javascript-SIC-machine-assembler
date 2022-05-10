// HEX arithmetic functions (utility functions)
function addHex(h1, h2) {
  return (parseInt(h1, 16) + parseInt(h2, 16)).toString(16);
}

function hex2bin(hexValue) {
  const decimal_value = parseInt(hexValue, 16);
  const x = Number(decimal_value);
  return x.toString(2);
}

// filling the gaps in strings, example : abc.zfil(6)  >>>> 000abc
// zfil has the functionality to handle overflow as well: (1001 1001 1111 0101 ) >>>> (001 1001  1111 0101)
String.prototype.zfill = function (width) {
  let result = this;
  if (result.toString().length > width) {
    result = result.substring(1);
  }
  while (result.length < width) {
    result = `0${result}`;
  }
  return result.toString();
};
// filling the gaps in numbers, example : 234.zfil(6)  >>>> 000234
Number.prototype.zfill = function (width) {
  let result = this.toString();
  if (result.toString().length > width) {
    result = result.substring(1);
  }
  while (result.length < width) {
    result = `0${result}`;
  }
  return result.toString();
};

function bin2hex(bin_value) {
  let d;
  let hex;
  d = parseInt(bin_value.toString(), 2); // binary >> decimal
  hex = d.toString(16); // decimal >> hex
  return hex;
}

function clean_binary(bin_value) {
  const regex = /,/g;
  return bin_value.toString().replace(regex, "");
}
