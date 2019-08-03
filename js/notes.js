$(document).ready(function() {
  let selectedNoteId;

  // Open Form
  $('#newNote').on('click', function() {
    $('#form-container').removeClass('hidden');
    $('#add-form').removeClass('hidden');
    $('#submit').text('Guardar');
    $('#title').val('');
    $('#description').val('');
  });

  // Close Form
  $('#cancel').on('click', function() {
    $('#form-container').addClass('hidden');
    $('#add-form').addClass('hidden');
    selectedNoteId = null;
  });

  // Add or Edit Listener
  $('#submit').on('click', function() {
    const title = $('#title').val();
    const description = $('#description').val();
    if (selectedNoteId !== null || selectedNoteId !== undefined) {
      $(`#${selectedNoteId} h4`).text(title);
      $(`#${selectedNoteId} p`).text(description);
      selectedNoteId = null;
    } else {
      $('#notes').append(createNote(Date.now(), title, description));
    }
    $('#form-container').addClass('hidden');
    $('#add-form').addClass('hidden');
    saveNotes();
  });

  // Add Note Function
  function createNote (id, title, description) {
    const note = $('<div class="note"></div>').attr('id', id);
    const titleElement = $('<h4></h4>').text(title);
    const descriptionElement = $('<p></p>').text(description);
    const editButton = $('<button class="edit-btn"><i class="fa fa-edit no-event"></i></button>');
    const deleteButton = $('<button class="delete-btn"><i class="fa fa-trash no-event"></i></button>');
    const commands = $('<div class="commands"></div>');
    commands.append(editButton);
    commands.append(deleteButton);
    note.append(commands);
    note.append(titleElement);
    note.append(descriptionElement);
    note.on('click', noteListener);
    return note;
  }

  // Note Command Listener
  function noteListener (e) {
    const targetElement = $(e.target);
    if (targetElement.hasClass('edit-btn')){
      editNote($(e.currentTarget)[0]);
    } else if (targetElement.hasClass('delete-btn')){
      deleteNote($(e.currentTarget));
    }
  }

  // Delete Note Function
  function deleteNote (element) {
    element.remove();
    saveNotes();
  }

  // Edit Note Function
  function editNote (element) {
    selectedNoteId = element.id;
    $('#form-container').removeClass('hidden');
    $('#add-form').removeClass('hidden');
    $('#title').val($(`#${selectedNoteId} h4`).text());
    $('#description').val($(`#${selectedNoteId} p`).text());
    $('#submit').text('Editar');
  }

  //Save Notes to Localstorage
  function saveNotes(){
    localStorage.setItem('notes', $('#notes').html());
  }

  //Load Notes from Localstorage
  function loadNotes(){
    const notes = localStorage.getItem('notes');
    $('#notes').append(notes);
    $('.note').on('click', noteListener);
  }

  loadNotes();
});