window.onload = function(){
    new Vue({
        el:'#container',
        data:{
            selectedAll: false,
            selected: [],
            users: [],
            newUser: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                avatar: '',
                password: '',
                cpassword: '',
            },
            modifiedUser:{}
        },
        created: function(){
            this.retrieveUsers();
        },
        methods:{
            createNewUser(){
                if(this.newUser.password === this.newUser.cpassword){
                    const that = this;
                    axios({
                        method:'post',
                        url:'http://localhost:8080/api/users/new',
                        contentType:"application/json;charset:utf-8",
                        dataType:"json",
                        data: {
                            firstName: this.newUser.firstName,
                            lastName: this.newUser.lastName,
                            username: this.newUser.username,
                            email: this.newUser.email,
                            password: this.newUser.password,
                            avatar: this.newUser.avatar
                        }
                    }).then(function(resp){
                        that.users.push(resp.data.content);
                    }).catch(resp => {
                        console.log('Failure request：'+resp.status+','+resp.statusText);
                    });
                }else{
                    alert();
                }
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
                        that.selected.push(false);
                    }
                }).catch(resp => {
                    console.log('Failure request：'+resp.status+','+resp.statusText);
                });
            },
            onSelected(){
                for (let index = 0; index < this.selected.length; index++) {
                    Vue.set(this.selected,index,this.selectedAll);
                }
            },
            modifyUser(){
                const that = this;
                axios({
                    method:'post',
                    url:'http://localhost:8080/api/users/update',
                    contentType:"application/json;charset:utf-8",
                    dataType:"json",
                    data: {
                        id: this.modifiedUser._id,
                        category: this.modifiedCategory.title
                    }
                }).then(function(resp){
                    that.categories.length = 0;
                    that.retrieveCategories();
                }).catch(resp => {
                    console.log('Failure request：'+resp.status+','+resp.statusText);
                });
            },
            onModifyCate(index){
                this.modifiedCategory = this.categories[index];
            },
            onDelete(){
                var ids = [];
                for (let index = 0; index < this.selected.length; index++) {
                    if (this.selected[index] == true) {
                        ids.push(this.categories[index]._id);
                    }
                }

                this.categories.length = 0;
                const that = this;
                axios({
                    method:'post',
                    url:'http://localhost:8080/api/categories/delete',
                    contentType:"application/json;charset:utf-8",
                    dataType:"json",
                    data: {
                        ids: ids
                    }
                }).then(function(resp){
                    that.retrieveCategories();
                }).catch(resp => {
                    console.log('Failure request：'+resp.status+','+resp.statusText);
                });
            }
        }
    });
};