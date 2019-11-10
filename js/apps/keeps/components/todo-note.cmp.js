
export default{
    props:['info'],
    template:`
        <div class="todo-cmp note-cmp" v-bind:class="{hide : checkDone()}">
        <h3>Your todos are:</h3>
        <h6 v-for="(todo , idx) in todos" v-bind:class='{hide : isDone(idx)}'>{{idx+1}}) {{todo}}
            <button type="button" class="delete-todo"  @click="todoClicked(idx)"> X </button>
        </h6>
    </div>
    `,
    data(){
        return{
            todos : [],
            doneTodos : []
        }
    },
    created(){
        this.todos = this.info.split(',');
        var str = localStorage.getItem(this.info);
        if(!str){
            this.doneTodos = [];
        }
        else {
            this.doneTodos =  JSON.parse(str);
        }
    },
    methods:{
        todoClicked(idx){
            this.doneTodos.push(idx);
            localStorage.setItem(this.info, JSON.stringify(this.doneTodos));
        },
        isDone(idx){
            return this.doneTodos.includes(idx);
        },
        checkDone(){
            return this.todos.length > 1 && (this.doneTodos.length == this.info.split(',').length);
        }
    }
}