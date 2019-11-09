export default{
    props:['info'],
    template:`
    <div>
        <img class="img" :src="info" />
        <div class="note-bottom">
            <p class="note-type-icon"><i class="fa fa-font"></i></p>
            <div class="note-buttons">
                <button><i class="fa fa-thumbtack"></i></button>
                <button><i class="fa fa-check"></i></button>
                <button><i class="fa fa-palette"></i></button>
                <button><i class="fa fa-edit"></i></button>
                <button><i class="fa fa-copy"></i></button>
                <button><i class="fa fa-trash"></i></button>
            </div>
        </div>
    </div>
    `
}