const socket = io("http://localhost:3000");

socket.on("newNote", (note) => {
  appendNoteToList(note);
});

socket.on("noteDeleted", (id) => {
  removeNoteFromList(id);
});

function createNote() {
  const noteInput = document.getElementById("noteInput");
  const descriptionInput = document.getElementById("descriptionInput");

  const title = noteInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title !== "" && description !== "") {
    socket.emit("createNote", { title, description });
    noteInput.value = "";
           descriptionInput.value = "";
  }
}

function deleteNote(id) {
  socket.emit("deleteNote", id);
}

function appendNoteToList(note) {
  const notesList = document.getElementById("notesList");
  const li = document.createElement("li");
  li.id = note._id;
  li.innerHTML = `
    <strong>${note.title}</strong>
    <p>${note.description}</p>
    <button onclick="deleteNote('${note._id}')">Delete</button>
  `;
  notesList.appendChild(li);
}

function removeNoteFromList(id) {
  const noteElement = document.getElementById(id);
  if (noteElement) {
    noteElement.remove();
  }
}
