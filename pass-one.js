function generate_pass_one(source_code) {
  const pass_one_array = [];

  function check_operator_length(operatorName) {
    let isExist = false;
    for (let el of opcode_table) {
      if (el.hasOwnProperty(operatorName)) {
        isExist = true;
        break;
      }
    }
    return isExist;
  }
  // filling the length col
  const pass_one_code = source_code.forEach((ele) => {
    let location;
    let length;
    const operator = ele.operator.toString();
    if (check_operator_length(operator)) {
      // Not an assembler directive
      length = 3;
    } else if (assembler_directive_table.includes(operator)) {
      // assembler directive
      // setting the length
      if (operator == "RESW" && ele.operand) {
        // fixed bug
        length = (3 * parseInt(ele.operand)).toString(16);
      } else if (
        operator == "START" ||
        operator == "END" ||
        operator == "BASE" ||
        operator == "NOBASE"
      ) {
        length = 0;
      } else if (operator == "RESB") {
        length = parseInt(ele.operand).toString(16);
      } else if (operator == "WORD") {
        length = 3;
      } else if (operator == "BYTE") {
        if (ele.operand.startsWith("C")) {
          let text = ele.operand.split(/['']/);
          length = text[1].length.toString(16);
        } else if (ele.operand.startsWith("X")) {
          length = 1;
        }
      }
    } else {
      length = 0;
    }
    // console.log(0, length, ele.label, ele.operator, ele.operand);
    pass_one_array.push(
      new PassOne(
        ele.lineNumber,
        0,
        length,
        ele.label,
        ele.operator,
        ele.operand
      )
    );
  });
  // filling the location col

  // setting intial address
  pass_one_array[1].location = pass_one_array[0].operand;
  // reaching to the last element
  for (let i = 1; i < pass_one_array.length - 1; i++) {
    pass_one_array[i + 1].location = addHex(
      pass_one_array[i].location,
      pass_one_array[i].length
    );
  }
  return pass_one_array;
}

function generate_symbol_table(pass_one_code) {
  const symbol_table = [];
  pass_one_code.forEach((ele) => {
    if (ele.label != "-") {
      symbol_table.push(new SymbolTable(ele.label, ele.location));
    }
  });
  return symbol_table;
}
