// Tabs handler
const tab_btn = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab");
tab_btn.forEach((ele_btn) => {
  ele_btn.addEventListener("click", function () {
    // close them all
    tabs.forEach((ele_tab) => {
      ele_tab.style.display = "none";
    });
    tab_btn.forEach((ele_tab) => {
      ele_tab.style.color = "black";
    });
    // open the selected one
    tabs.forEach((ele_tab) => {
      if (ele_tab.dataset.tab == this.dataset.tab) {
        ele_tab.style.display = "block";
        this.style.color = "#0000ff";
      }
    });
  });
});
