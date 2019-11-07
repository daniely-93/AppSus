export default{
    props:['info'],
    template:`
    <div class="note-cmp img-cmp">
        <img class="img" :src="info" />
        <div class="type"><i class="fa fa-image"></i></div>
    </div>
    `
}