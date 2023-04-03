const openBtn = document.querySelector(".openbtn");
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".sidebar-btn");

openBtn.addEventListener("click", () => {
  sidebar.style.width = "200px";
});

sidebarBtn.addEventListener("click", () => {
  if (sidebar.style.width === "200px") {
    sidebar.style.width = "0";
  }
});