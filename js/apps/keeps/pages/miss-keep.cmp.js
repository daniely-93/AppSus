import noteService from '../services/notes-service.js';
import addNote from '../components/add-note.cmp.js';
import noteList from '../components/note-list.cmp.js';

export default {
    template: `
    <div class="notes-container">
            <header class="notes-header"></header>
            <add-note @getAllNotes="getAllNotes"/>
            <div class="pinned-notes">SAVED NOTES</div>
            <note-list :notes="notes"/>
    </div>
    `,
    data() {
        return {
            notes: []
        }
    },
    methods: {
        getAllNotes() {
            this.notes = noteService.getNotes();
        }
    },
    created() {
        this.getAllNotes()
    },
    components: {
        addNote,
        noteList
    }
}