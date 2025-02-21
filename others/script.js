// Function to Add & Update To-Do List
function getAndUpdate() {
  let tit = document.getElementById("title").value.trim();
  let desc = document.getElementById("description").value.trim();

  if (tit === "" || desc === "") {
    alert("Title and Description cannot be empty!");
    return;
  }

  console.log("Updating List...");
  let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson") || "[]");

  itemJsonArray.push([tit, desc]);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

// Function to Update To-Do List Table
function update() {
  let tableBody = document.getElementById("tableBody");
  let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson") || "[]");

  tableBody.innerHTML = itemJsonArray
    .map(
      (element, index) =>
        `<tr>
            <th>${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td> 
            <td><button class="del" onclick="deleted(${index})">Delete</button></td>
          </tr>`
    )
    .join("");
}

document.getElementById("add").addEventListener("click", getAndUpdate);
update();

// Function to Delete an Item
function deleted(itemIndex) {
  if (confirm("Are you sure you want to delete this item?")) {
    let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  }
}

// Function to Clear Entire Storage
function clearStorage() {
  let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson") || "[]");

  if (itemJsonArray.length === 0) {
    alert("Nothing to clear!");
    return;
  }

  if (confirm("Do you really want to clear the entire list?")) {
    console.log("Clearing the storage");
    localStorage.removeItem("itemsJson");
    update();
  }
}

// Function to Search To-Do List
function searchTasks() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let rows = document.querySelectorAll("#tableBody tr");

  rows.forEach((row) => {
    let title = row.cells[1].textContent.toLowerCase();
    let description = row.cells[2].textContent.toLowerCase();

    row.style.display =
      title.includes(input) || description.includes(input) ? "" : "none";
  });
}

// Contact Form - EmailJS Integration
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("VzJtnRb3dPLzakSPu"); // Public Key

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let message = document.getElementById("message").value.trim();
      let responseMsg = document.getElementById("responseMsg");

      if (name === "" || email === "" || message === "") {
        responseMsg.textContent = "Please fill out all fields.";
        responseMsg.style.color = "red";
        return;
      }

      let templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      emailjs
        .send("service_5km9oh8", "template_bygibqe", templateParams)
        .then(() => {
          responseMsg.textContent = "Message sent successfully!";
          responseMsg.style.color = "green";
          document.getElementById("contactForm").reset();
        })
        .catch((error) => {
          responseMsg.textContent = "Failed to send message. Try again later.";
          responseMsg.style.color = "red";
          console.error("EmailJS Error:", error);
        });
    });
});
