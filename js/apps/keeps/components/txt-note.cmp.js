export default {
    props: ['note'],
    template: `
    <div>
        <h3 class="txt">{{note.data}}</h3>
        <div class="note-bottom">
            <p class="note-type-icon"><i class="fa fa-font"></i></p>
            <div class="note-buttons">
                <button @click="togglePin"><i class="fa fa-thumbtack"></i></button>
                <button><i class="fa fa-check"></i></button>
                <button @click="showColorPicker = !showColorPicker"><i class="fa fa-palette"></i></button>
                <button><i class="fa fa-edit"></i></button>
                <button @click="copy(note.data)"><i class="fa fa-copy"></i></button>
                <button @click="deleteNote(note.id)"><i class="fa fa-trash"></i></button>
            </div>
        </div>
        <transition name="slide-fade">
        <div v-if="showColorPicker" class="color-picker">
            <button class="btn-color" @click="changeColor('white')" style="background: white"></button>
            <button class="btn-color" @click="changeColor('#ff888a')" style="background: #ff888a"></button>
            <button class="btn-color" @click="changeColor('#ffcc87')" style="background: #ffcc87"></button>
            <button class="btn-color" @click="changeColor('#fffd8e')" style="background: #fffd8e"></button>
            <button class="btn-color" @click="changeColor('#cbffa0')" style="background: #cbffa0"></button>
            <button class="btn-color" @click="changeColor('#acffef')" style="background: #acffef"></button>
            <button class="btn-color" @click="changeColor('#88ddfd')" style="background: #88ddfd"></button>
            <button class="btn-color" @click="changeColor('#88bbff')" style="background: #88bbff"></button>
            <button class="btn-color" @click="changeColor('#dfbbff')" style="background: #dfbbff"></button>
            <button class="btn-color btn-more-colors"></button>
        </div>
        </transition>
    </div>
    `,
    data() {
        return {
            showColorPicker: false
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete', this.note.id)
        },
        changeColor(color) {
            this.showColorPicker = false;
            this.$emit('changeColor', this.note.id, 'color', color);
        },
        togglePin(){
            this.$emit('togglePin', this.note);
        }
    }
}