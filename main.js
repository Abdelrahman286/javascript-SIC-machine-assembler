// utility regex
const regex_line_to_mnemonics = /\S*\S/gi;

class SourceCode {
  constructor(lineNumber, label, operator, operand) {
    this.lineNumber = lineNumber;
    this.label = label;
    this.operator = operator;
    this.operand = operand;
  }
}
class PassOne {
  constructor(lineNumber, location, length, label, operator, operand) {
    this.lineNumber = lineNumber;
    this.location = location;
    this.length = length;
    this.label = label;
    this.operator = operator;
    this.operand = operand;
  }
}
class PassTwo {
  constructor(
    lineNumber,
    location,
    length,
    label,
    operator,
    operand,
    objectCode,
    hex
  ) {
    this.lineNumber = lineNumber;
    this.location = location;
    this.length = length;
    this.label = label;
    this.operator = operator;
    this.operand = operand;
    this.objectCode = objectCode;
    this.hex = hex;
  }
}
class SymbolTable {
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}

// Generating Tables
// fetching the source code from the textarea then map it into Objects
// example 1 : LENGTH ADD 0  >>>> {label : "LENGTH" , operator: "ADD" , operand:"0"}
// example 2 :   -  RSUB  - >>>> {label : "-" , operator: "RSUB" , operand:"-"}
function fetch_source_code() {
  const text_value = document.querySelector("textarea").value;
  const splitted_lines = [...text_value.split("\n")];

  const lines_without_empty = splitted_lines.filter((ele) => {
    // removing the empty lines and lines with spaces since they are different cases
    if (ele && ele.trim()) {
      return true;
    }
  });
  const sourceCodeTable = lines_without_empty.map((ele, i) => {
    const col = ele.match(regex_line_to_mnemonics);
    // using the classes blueprint to generate our objects
    const line = new SourceCode(i, col[0], col[1], col[2]);
    return line;
  });

  return sourceCodeTable;
}




// read the text file included in this folder to understand the syntax for object file
function generate_object_file(pass_two) {
  const header_line = function () {
    const program_name = pass_two[0].label;
    const starting_address = pass_two[0].operand;
    const program_length =
      pass_two[pass_two.length - 2].location - starting_address + 1;
    return `<p>H ${program_name}^${starting_address}^${program_length}</p>`;
  };

  const T_lines = function () {
    const lines = []; // array of <p> tags
    let line = "<p>T";
    let counter = 1;
    pass_two.forEach((ele) => {
      if (ele.hex != "-") {
        line += `^${ele.hex}`;
        counter++;
        if (counter >= 11) {
          counter = 1;
          lines.push(line);
          line = "<p>T";
        }
      } else {
        counter = 1;
        lines.push(line);
        line = "<p>T";
      }
    });

    const result = lines.filter((ele) => {
      if (ele.length != 4) {
        return true;
      }
    });
    return result;
  };
  const End_line = function () {
    const starting_address = pass_two[0].operand;
    return `<p>E ${starting_address}</p>`;
  };

  return `${header_line()} \n${T_lines()} \n${End_line()}`;
}

// listening to clicks on geneate button and render everything
generate_btn.addEventListener("click", () => {
  const source_code = fetch_source_code();
  render(source_code, source_code_destination, "source-code");

  const pass_one = generate_pass_one(source_code);
  render(pass_one, pass_one_destination, "pass-one");

  const symbol_table = generate_symbol_table(pass_one);
  render(symbol_table, symbol_table_destination, "symbol-table");

  const pass_two = generate_pass_two(pass_one, symbol_table);
  render(pass_two, passs_two_destination, "pass-two");

  const object_code_file = generate_object_file(pass_two);
  object_code_destination.innerHTML = object_code_file;
});
