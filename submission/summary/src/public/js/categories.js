
window.onload = function(){
    Vue.component('modify-category-modal',{
        template: `
            <div id="modifyCategory" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Create New Category</h4>
                        </div>
                        <div class="modal-body">
                            <table class="m-auto">
                                <tr>
                                    <td colspan="2">
                                        <label for="title">Category Title:</label><br>
                                        <input type="text" name="title" class="w-100" v-model="category.title">
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button id="btnNewJoke" type="button" class="btn btn-default" data-dismiss="modal" v-on:click="modifyCate">Confirm</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        data: function(){
            return {
                category:{}
            };
        }
    });

    new Vue({
        el:'#container',
        data:{
            selectedAll: false,
            selected: [],
            categories: [],
            category: {
                title: ''
            },
            modifiedCategory:{}
        },
        created: function(){
            this.retrieveCategories();
        },
        methods:{
            createNewCate(){
                const that = this;
                axios({
                    method:'post',
                    url:'http://localhost:8080/api/categories/new',
                    contentType:"application/json;charset:utf-8",
                    dataType:"json",
                    data: {
                        category: this.category.title
                    }
                }).then(function(resp){
                    that.categories.push(resp.data.content);
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
            modifyCate(){
                const that = this;
                axios({
                    method:'post',
                    url:'http://localhost:8080/api/categories/update',
                    contentType:"application/json;charset:utf-8",
                    dataType:"json",
                    data: {
                        id: this.modifiedCategory._id,
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