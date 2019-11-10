import noteService from '../services/notes-service.js';
import { eventBus } from '../../../services/eventbus-service.js';

export default {
    template: `
    <div class="notes-maker">
        <input type="text" class="url-txt" v-model="txt" placeholder="whats on your mind..."></input>
        <div class="btn-notes">
            <button type="button" class="btn-note-type" @click="changeNote('noteTxt')" v-bind:class="{'note-type-active': type === 'noteTxt'}"><i class="fa fa-font"></i></button>
            <button type="button" class="btn-note-type" @click="changeNote('noteImage')" v-bind:class="{'note-type-active': type === 'noteImage'}"><i class="fa fa-image"></i></button>
            <button type="button" class="btn-note-type" @click="changeNote('noteVideo')" v-bind:class="{'note-type-active': type === 'noteVideo'}"><i class="fab fa-youtube"></i></button>
            <button type="button" class="btn-note-type" @click="changeNote('noteSound')" v-bind:class="{'note-type-active': type === 'noteSound'}"><i class="fa fa-volume-up"></i></button>
            <button type="button" class="btn-note-type" @click="changeNote('noteTodo')" v-bind:class="{'note-type-active': type === 'noteTodo'}"><i class="fa fa-list"></i></button>
            <button type="button" class="btn-note-type" @click="addNote" @keyup.enter="addNote"><i class="fa fa-download save"></i></button>
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
            if(!this.txt) return;
            eventBus.$emit('addNote', this.type, this.txt);
        }
    }
}