export default{
    props:['info'],
    template:`
    <div class="note">
        <h3>Todos</h3>
        <h6 v-for="(todo , idx) in todos" @click="$event.target.classList.toggle('done')">{{idx+1}}) {{todo}}
            <button type="button" class="delete-todo" @click="$event.target.parentNode.classList.toggle('hide')"> X </button>
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
    },
    methods:{
        todoClicked(idx){
            doneTodos.push(idx);
        },
        isDone(idx){
            return this.doneTodos.contains(idx);
        },
        toggleDone(){

        }
    }
}