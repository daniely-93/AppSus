export default {
    props: ['info'],
    template: `
    <div class="note-cmp video-cmp">
        <iframe width="220" height="220" :src="this.url">
        </iframe>
        <div class="type"><i class="fa fa-youtube"></i></div>
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