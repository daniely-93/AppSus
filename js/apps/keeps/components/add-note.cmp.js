import noteService from '../services/notes-service.js';

export default {
    template: `
    <div class="notes-maker">
        <input type="text" class="url-txt" v-model="txt" placeholder="whats on your mind..."></input>
        <div class="btn-notes">
            <button type="button" class="noteTxt btn-note-type" @click="changeNote('noteTxt')" v-bind:class="{active: isActive('noteTxt')}"><i class="fa fa-font"></i></button>
            <button type="button" class="noteImage btn-note-type" @click="changeNote('noteImage')" v-bind:class="{active: isActive('noteImage')}"><i class="fa fa-image"></i></button>
            <button type="button" class="noteVideo btn-note-type" @click="changeNote('noteVideo')" v-bind:class="{active: isActive('noteVideo')}"><i class="fab fa-youtube"></i></button>
            <button type="button" class="noteSound btn-note-type" @click="changeNote('noteSound')" v-bind:class="{active: isActive('noteSound')}"><i class="fa fa-volume-up"></i></button>
            <button type="button" class="noteTodo btn-note-type" @click="changeNote('noteTodo')" v-bind:class="{active: isActive('noteTodo')}"><i class="fa fa-list"></i></button>
            <button type="button" class="noteTodo btn-note-type" @click="addNote"><i class="fa fa-download save"></i></button>
        </div>
    </div>
    `,
    data() {
        return {
            type: 'noteTxt',
            txt: null
        }
    },
    methods: {
        changeNote(noteType) {
            this.type = noteType;
        },
        isActive(noteType) {
            return this.type == noteType
        },
        addNote() {
            noteService.addNote(this.type, this.txt);
            this.$emit('getAllNotes');
        }
    }
}