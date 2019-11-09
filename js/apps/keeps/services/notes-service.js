import utilService from '../../../services/utils-service.js';

export default {
    getNotes,
    addNote,
    clearNotes
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

function _saveNotes() {
    utilService.saveToStorage(NOTES_KEY, notes)
}

function _loadNotes() {
    return utilService.loadFromStorage(NOTES_KEY);
}

function addNote(type, data) {
    let newKeep = _createNote(type, data);
    notes.push(newKeep);
    _saveNotes();
}

function _createNote(type, data) {
    return {
        id: utilService.getRandomId(),
        color: utilService.getRandomColor(true),
        type,
        data
    }
}

function clearNotes() {
    notes = [];
    _saveNotes();
}