
export default {
    props: ['note'],
    template: `
        <div class="todo-cmp">
            <h3 v-for="(todo , idx) in todoList">{{idx+1}}) {{todo}}
            </h3>
            <div class="note-buttons">
                <button @click="togglePin(note)"><i class="fa fa-thumbtack"></i></button>
                <button><i class="fa fa-check"></i></button>
                <button @click="showColorPicker = !showColorPicker"><i class="fa fa-palette"></i></button>
                <button><i class="fa fa-edit"></i></button>
                <button @click="copy(note.data)"><i class="fa fa-copy"></i></button>
                <button @click="deleteNote(note.id)"><i class="fa fa-trash"></i></button>
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
            todos: [],
            doneTodos: [],
            showColorPicker: false
        }
    },
    created() {
        this.todos = this.note.data.split(',');
    },
    methods: {
        todoClicked(idx) {
            this.doneTodos.push(idx);
            localStorage.setItem(this.info, JSON.stringify(this.doneTodos));
        },
        deleteNote(){
            this.$emit('delete', this.note.id)
        },
        changeColor(color) {
            this.showColorPicker = false;
            this.$emit('changeColor', this.note.id, 'color', color);
        },
        togglePin(){
            this.$emit('togglePin', this.note);
        }
    },
    computed:{
        todoList(){
            return this.todos.map(todo => todo)
        }
    }
}


{/* <button type="button" class="delete-todo"  @click="todoClicked(idx)"> X </button> */ }