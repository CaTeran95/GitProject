const title = document.querySelector(".title");
const button = document.querySelector("#changeTitle");

button.addEventListener("click", () => {
    const message = prompt("Enter the title for this page:");
    title.innerText = message;
})
