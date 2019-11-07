import noteService from '../services/notes-service.js';

export default {
    template: `
    <div class="notes-maker">
        <input type="text" class="url-txt" v-model="txt" placeholder="whats on your mind..."></input>
        <button type="button" class="noteTxt note-btn" @click="changeNote('noteTxt')" v-bind:class="{active: isActive('noteTxt')}"><i class="fa fa-font"></i></button>
        <button type="button" class="noteImage note-btn" @click="changeNote('noteImage')" v-bind:class="{active: isActive('noteImage')}"><i class="fa fa-image"></i></button>
        <button type="button" class="noteVideo note-btn" @click="changeNote('noteVideo')" v-bind:class="{active: isActive('noteVideo')}"><i class="fa fa-youtube"></i></button>
        <button type="button" class="noteSound note-btn" @click="changeNote('noteSound')" v-bind:class="{active: isActive('noteSound')}"><i class="fa fa-volume-up"></i></button>
        <button type="button" class="noteTodo note-btn" @click="changeNote('noteTodo')" v-bind:class="{active: isActive('noteTodo')}"><i class="fa fa-list"></i></button>
        <button type="button" class="noteTodo note-btn" @click="addNote"><i class="fa fa-download save"></i></button>
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