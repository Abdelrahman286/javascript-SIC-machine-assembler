const ratio_btn = document.querySelector(".ratio-divider");
const ratios_window = document.querySelector(".ratios");
const ratios = document.querySelectorAll(".ratio");
const editor = document.querySelector(".editor");
const output = document.querySelector(".output");

ratio_btn.addEventListener("click", (e) => {
  // e.stopPropagation();
  if (ratios_window.style.display == "none") {
    ratios_window.style.display = "flex";
  } else {
    ratios_window.style.display = "none";
  }
});

ratios.forEach((ele) => {
  ele.addEventListener("click", (event) => {
    event.stopPropagation();
    ratios_window.style.display = "none";
    const ratio = event.target.textContent;
    if (ratio == "1/1") {
      editor.style.height = "50vh";
      output.style.height = "50vh";
    } else if (ratio == "1/2") {
      editor.style.height = "20vh";
      output.style.height = "80vh";
    } else if (ratio == "2/1") {
      editor.style.height = "80vh";
      output.style.height = "20vh";
    }
  });
});
