// Render function for printing all tables
const generate_btn = document.querySelector(".generate");
const source_code_destination = document.querySelector(".source-code table");
const pass_one_destination = document.querySelector(".pass-one table");
const passs_two_destination = document.querySelector(".pass-two table");
const symbol_table_destination = document.querySelector(".symbol-table table");
const object_code_destination = document.querySelector(
  ".object-code-destination"
);

function render(table, destination, flag) {
  let template;
  if (flag == "source-code") {
    template =
      ` <tr>
                 <th>Line Number</th>
                 <th>Label</th>
                 <th>Operator</th>
                 <th>Operand</th>
             </tr>
     ` +
      table
        .map((ele) => {
          return `
                   <tr>
                     <td>${ele.lineNumber}</td>
                     <td>${ele.label}</td>
                     <td>${ele.operator}</td>
                     <td>${ele.operand}</td>
                  </tr>
         `;
        })
        .join("");
  } else if (flag == "pass-one") {
    template =
      ` 
             <tr>
                 <th>Line Number</th>
                 <th>Location</th>
                 <th>Length</th>
                 <th>Label</th>
                 <th>Operator</th>
                 <th>Operand</th>
             </tr>

     ` +
      table
        .map((ele) => {
          return `
                     <tr>
                     <td>${ele.lineNumber}</td>
                     <td>${ele.location}</td>
                     <td>${ele.length}</td>
                     <td>${ele.label}</td>
                     <td>${ele.operator}</td>
                     <td>${ele.operand}</td>
                 </tr>
       `;
        })
        .join("");
  } else if (flag == "pass-two") {
    template =
      `
             <tr>
                 <th>Line Number</th>
                 <th>Location</th>
         re        <th>Length</th>
                 <th>Label</th>
                 <th>Operator</th>
                 <th>Operand</th>
                 <th>Opcode,X,Disp</th>
                 <th>Object Code</th>
             </tr>
     ` +
      table
        .map((ele) => {
          return `
                     <tr>
                     <td>${ele.lineNumber}</td>
                     <td>${ele.location}</td>
                     <td>${ele.length}</td>
                     <td>${ele.label}</td>
                     <td>${ele.operator}</td>
                     <td>${ele.operand}</td>
                     <td>${ele.objectCode}</td>
                     <td>${ele.hex}</td>
                 </tr>
       `;
        })
        .join("");
  } else if (flag == "symbol-table") {
    template =
      `
             <tr>
                 <th>Label</th>
                 <th>value</th>
             </tr>
          ` +
      table
        .map((ele) => {
          return `
                 <tr>
                     <td>${ele.label}</td>
                     <td>${ele.value}</td>
                 </tr>
        `;
        })
        .join("");
  }
  destination.innerHTML = template;
}
