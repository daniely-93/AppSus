import utilService from '../../../services/utils-service.js';

export default {
    getNotes,
    addNote,
    clearNotes,
    deleteNote,
    togglePin,
    updateNote
};

const NOTES_KEY = 'notes';

var notes = getNotes();

function getNotes() {
    notes = _loadNotes();
    if (!notes) {
        notes = [];
        _saveNotes();
    }
    return notes;
}

function togglePin(note){
    let currPinIdx = notes.findIndex(resNote => resNote.id === note.id);
    note.isPinned = !note.isPinned;
    if(note.isPinned){
        note.pinnedFrom = currPinIdx;
        notes.splice(currPinIdx, 1);
        notes.unshift(note);
    }else{
        notes.splice(currPinIdx, 1);
        notes.splice(note.pinnedFrom, 0, note);
        delete note.pinnedFrom
    }
    _saveNotes();
    return Promise.resolve(notes);
}

function updateNote(id, key, value) {
    let note = notes.find(note => note.id === id);
    note[key] =  value;
    _saveNotes();
    return Promise.resolve(notes)
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    _saveNotes();
    return Promise.resolve(notes);
}

function addNote(type, data) {
    if (!data) return Promise.reject();
    let newKeep = _createNote(type, data);
    notes.push(newKeep);
    _saveNotes();
    return Promise.resolve(notes);
}


function clearNotes() {
    notes = [];
    _saveNotes();
}

function _createNote(type, data) {
    return {
        id: utilService.getRandomId(),
        color: utilService.getRandomColor(true),
        type,
        isPinned: false,
        data
    }
}

function _saveNotes() {
    utilService.saveToStorage(NOTES_KEY, notes)
}

function _loadNotes() {
    return utilService.loadFromStorage(NOTES_KEY);
}