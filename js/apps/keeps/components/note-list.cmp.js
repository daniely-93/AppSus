import noteTxt from '../components/txt-note.cmp.js'
import noteImage from '../components/img-note.cmp.js'
import noteVideo from '../components/video-note.cmp.js'
import noteTodo from '../components/todo-note.cmp.js'
// import noteSound from '../components/sound-note.cmp.js'

export default{
    props:['notes'],
    template:`
    <div v-if="notes" class="notes">
        <component v-for="note in notes" :style="{background: note.color}" :key="note.id" :is="note.type" :info="note.data" class="note"></component>
    </div>
    `,
    data(){
        return{

        }
    },
    components:{
        noteTxt,
        noteImage,
        noteVideo,
        noteTodo
    }
}