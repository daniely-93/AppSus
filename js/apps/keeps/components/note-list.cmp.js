import noteTxt from '../components/txt-note.cmp.js'
import noteImage from '../components/img-note.cmp.js'
import noteVideo from '../components/video-note.cmp.js'
import noteTodo from '../components/todo-note.cmp.js'
// import noteSound from '../components/sound-note.cmp.js'
import keepService from '../services/notes-service.js';
import { eventBus } from '../../../services/eventbus-service.js';

export default {
    template: `
        <transition-group tag="div" name="flip-list" class="notes">
            <div class="note" v-for="note in notes" :key="note.id" :style="{background: note.color}">
                <p class="pinned" v-if="note.isPinned"><i class="fa fa-thumbtack"></i></p>
                <component @togglePin="togglePin" @delete="deleteNote" @changeColor="updateNote" v-if="note" :is="note.type" :note="note"></component>
            </div>
       </transition-group>
    `,
    data() {
        return {
            notes: [],
        }
    },
    methods: {
        getNotes() {
            this.notes = keepService.getNotes();
        },
        copy(data) {
            document.execCommand('copy');
        },
        togglePin(note) {
            keepService.togglePin(note).then(() => {
                _.shuffle(this.getNotes());
            })
        },
        deleteNote(id) {
            keepService.deleteNote(id).then(() => this.getNotes())
        },
        updateNote(id, key, value) {
            keepService.updateNote(id, key, value).then(() => {

            })
        }
    },
    components: {
        noteTxt,
        noteImage,
        noteVideo,
        noteTodo
    },
    created() {
        this.getNotes();
        eventBus.$on('addNote', (type, data) => {
            keepService.addNote(type, data).then(() => {
                _.shuffle(this.getNotes());
            }).catch(err => console.log(err))
        });
    }
}