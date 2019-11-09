export default {
    props: ['info'],
    template: `
    <div>
        <iframe class="yt-iframe" :src="this.url"></iframe>
        <div class="note-bottom">
            <p class="note-type-icon"><i class="fab fa-youtube"></i></p>
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
    `,
    data() {
        return {
            url: null
        }
    },
    methods: {
        getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
    },
    created() {
        let value = this.getParameterByName('v', this.info);
        this.url = `https://www.youtube.com/embed/${value}`;
    }
}