import noteService from '../services/notes-service.js';
import addNote from '../components/add-note.cmp.js';
import noteList from '../components/note-list.cmp.js';

export default {
    template: `
    <div class="container">
        <add-note />
        <div class="notes-container">
            <note-list />
        </div>
    </div>
    `,
    components: {
        addNote,
        noteList
    }
}