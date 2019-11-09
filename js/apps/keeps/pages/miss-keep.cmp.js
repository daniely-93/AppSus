import noteService from '../services/notes-service.js';
import addNote from '../components/add-note.cmp.js';
import noteList from '../components/note-list.cmp.js';

export default {
    template: `
    <div class="container">
        <add-note @getAllNotes="getAllNotes"/>
        <div class="notes-container">
            <div class="pinned-notes">
                <h2>Pinned Notes</h2>
            </div>
            <div class="other-notes">
                <h2>Other Notes</h2>
                <note-list :notes="notes"/>
            </div>
        </div>
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