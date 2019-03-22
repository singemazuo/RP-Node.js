window.onload = function(){
    new Vue({
        el:'#container',
        data:{
            selectedAll: false,
            selected: [],
            categories: [],
            users: [],
            jokes: [],
            joke: {
                title: '',
                teaser: '',
                text: '',
                visible: false,
                author: '',
                category: ''
            },
            ui: {
                checkedInvisible: false
            }
        },
        created: function(){
            this.retrieveJokes();
            this.retrieveCategories();
            this.retrieveUsers();
        },
        methods:{
            retrieveJokes(){
                const that = this;
                axios({
                    method: 'get',
                    url:'http://localhost:8080/api/jokes',
                    dataType:"json"
                }).then(function(resp){
                    for (let index = 0; index < resp.data.content.length; index++) {
                        that.jokes.push(resp.data.content[index]);
                        that.selected.push(false);
                    }
                }).catch(resp => {
                    console.log('Failure request：'+resp.status+','+resp.statusText);
                });
            },
            retrieveCategories(){
                const that = this;
                axios({
                    method: 'get',
                    url:'http://localhost:8080/api/categories',
                    dataType:"json"
                }).then(function(resp){
                    for (let index = 0; index < resp.data.content.length; index++) {
                        that.categories.push(resp.data.content[index]);
                    }
                }).catch(resp => {
                    console.log('Failure request：'+resp.status+','+resp.statusText);
                });
            },
            retrieveUsers(){
                const that = this;
                axios({
                    method: 'get',
                    url:'http://localhost:8080/api/users',
                    dataType:"json"
                }).then(function(resp){
                    for (let index = 0; index < resp.data.content.length; index++) {
                        that.users.push(resp.data.content[index]);
                    }
                }).catch(resp => {
                    console.log('Failure request：'+resp.status+','+resp.statusText);
                });
            },
            refreshPage(){
                if(this.ui.checkedInvisible){
                    
                }
            },
            createNewJoke(){
                const that = this;
                axios({
                    method:'post',
                    url:'http://localhost:8080/api/jokes/new',
                    data: {
                        title: this.joke.title,
                        teaser: this.joke.teaser,
                        text: this.joke.text,
                        visible: false,
                        user: this.joke.author,
                        category: this.joke.category
                    }
                }).then(function(resp){
                    that.retrieveJokes();
                }).catch(resp => {
                    console.log('Failure request：'+resp.status+','+resp.statusText);
                });
            },
            onSelected(){
                for (let index = 0; index < this.selected.length; index++) {
                    Vue.set(this.selected,index,this.selectedAll);
                }
            },
            onClickNew(){
                // axios({
                //     method: 'get',
                //     url: 'http://localhost:8080/api/categories'
                // }).then(resp => {
                //     this.categories = resp.data;
                // }).catch(resp => {

                // });

                // axios({
                //     method: 'get',
                //     url: 'http://localhost:8080/api/users'
                // }).then(resp => {
                //     this.users = resp.data;
                // }).catch(resp => {

                // });
            }
        }
    });
};