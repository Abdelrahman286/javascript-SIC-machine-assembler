function generate_pass_two(pass_one, symbol_table) {
  const pass_two_array = [];

  function find_label_value(label) {
    const table = generate_symbol_table(pass_one);
    let value;
    table.forEach((ele) => {
      if (ele.label == label) {
        value = ele.value;
      }
    });
    return value;
  }

  function find_opcode_value(opcode) {
    let value;
    opcode_table.forEach((ele) => {
      if (ele.hasOwnProperty(opcode)) {
        value = ele[`${opcode}`];
      }
    });
    return value;
  }

  pass_two_code = pass_one.forEach((ele) => {
    let BIN_objectCode;
    let cleaned_bin;
    let final_object_code;
    // All lines are in this format: [8 bit opecode] === [1 bit for index] ===== [15 bit address]
    if (
      ele.operator != "START" &&
      ele.operator != "END" &&
      ele.operator != "BASE" &&
      ele.operator != "NOBASE" &&
      ele.operator != "RESW" &&
      ele.operator != "RESB"
    ) {
      if (ele.operand.includes(",X")) {
        // then it's indexed addressing
        // splitting it : "BUFFER,X"  >>> "BUFFER"
        const splitted_operand = ele.operand.split(/[",]/)[0];
        BIN_objectCode = `${hex2bin(find_opcode_value(ele.operator)).zfill(
          8
        )},${1},${hex2bin(find_label_value(splitted_operand)).zfill(15)}`;
        cleaned_bin = clean_binary(BIN_objectCode).toString();
        final_object_code = bin2hex(cleaned_bin).zfill(6);
      } else {
        if (ele.operator == "BYTE" && ele.operand.includes("C'")) {
          let text = ele.operand.split(/['']/)[1];
          let sum_of_ASCII_chars = "";
          for (let i = 0; i < text.length; i++) {
            sum_of_ASCII_chars += text.charCodeAt(i).toString(16);
          }
          BIN_objectCode = `${hex2bin(sum_of_ASCII_chars)}`;
          cleaned_bin = clean_binary(BIN_objectCode).toString();
          final_object_code = bin2hex(cleaned_bin);
        } else if (ele.operator == "BYTE" && ele.operand.includes("X'")) {
          BIN_objectCode = `${hex2bin(ele.operand.split(/['']/)[1]).zfill(24)}`;
          cleaned_bin = clean_binary(BIN_objectCode).toString();
          final_object_code = bin2hex(cleaned_bin).zfill(6);
        } else if (ele.operator == "WORD") {
          BIN_objectCode = `${hex2bin(ele.operand.toString(16)).zfill(24)}`;
          cleaned_bin = clean_binary(BIN_objectCode).toString();
          final_object_code = bin2hex(cleaned_bin).zfill(6);
        } else if (ele.operator && ele.operand != "-") {
          // handling overflow
          console.log(hex2bin(find_label_value(ele.operand)).toString());
          BIN_objectCode = `${hex2bin(find_opcode_value(ele.operator)).zfill(
            8
          )},${0},${hex2bin(find_label_value(ele.operand)).zfill(15)}`;
          cleaned_bin = clean_binary(BIN_objectCode).toString();
          final_object_code = bin2hex(cleaned_bin).zfill(6);
        } else if (ele.operator && ele.operand == "-") {
          BIN_objectCode = `${hex2bin(
            find_opcode_value(ele.operator)
          )}0000000000000000`;
          cleaned_bin = clean_binary(BIN_objectCode).toString();
          final_object_code = bin2hex(cleaned_bin).zfill(6);
        }
      }
    } else {
      final_object_code = "-";
      BIN_objectCode = `-`;
    }
    pass_two_array.push(
      new PassTwo(
        ele.lineNumber,
        ele.location,
        ele.length,
        ele.label,
        ele.operator,
        ele.operand,
        BIN_objectCode,
        final_object_code
      )
    );
  });

  return pass_two_array;
}
