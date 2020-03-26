<template>
    <layout :padding="0">
        <hr>
        <div class="add-data">
            <h3>添加列表,<span>目前数据条数：{{total}}条</span></h3>
            <el-form ref="form" :rules="rules" :model="form" label-width="60px">
                <el-form-item label="姓名" prop="addName">
                    <el-input v-model="form.addName" type="text"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" type="text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addHandle">添加</el-button>
                    <el-button @click="open">自定义弹窗</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <div class="dialog" v-show="customDialogShow">
            <div class="dialog-content">
                <div class="dialog-title">
                    <div class="dialog-title-left">自定义弹窗</div>
                    <div class="dialog-title-close" @click="close">X</div>
                </div>
                <div class="dialog-content-box">
                    <el-table
                        class="dialog-content-table"
                        :data="getTableData()"
                        height="320px"
                        :row-class-name="tableRowClassName">
                        <el-table-column
                            prop="id"
                            label="编号"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                    <div class="dialog-pagination" v-if="total > size">
                        <el-pagination
                            @current-change="currentChange"
                            :page-size="size"
                            :pager-count="5"
                            :current-page="current"
                            layout="prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
                <div class="dailog-btn">
                    <el-button type="success" size="mini">确认</el-button>
                    <el-button type="info" size="mini" @click="close">关闭</el-button>
                </div>
            </div>
            <div class="dialog-mask"></div>
        </div>
    </layout>
</template>

<script>
	import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';
	import Axios from 'axios';

	export default {
		name: 'app',
		components: {},
		data() {
			return {
				showLoad: false,
				customDialogShow: false,
				munber: '',
				tableData: [],
				total : 31,
				size: 30,
				current : 2,
                id: 1,
				form: {
					addName: '',
					address: "",
                },
                
				rules: {
					addName: {
						required: true,
						message: '请添加姓名',
					},
					address: {
						required: true,
						message: '请添加地址',
					},
                }
			}
		},
		computed: {
			...mapState(['$md5', '$base64', '$page', '$lodash', '$helper', '$route', '$iframeHeight']),
			...mapGetters('userInfo', []),
		},

		created() {
            let createData = ()=>{
				let name = '王小虎';
				for(let i = 0 ; i < this.total ; i++) {
					let temp = {};
					temp['id'] = i + 1;
					temp['name']  = name;
					let date = new Date().getTime() - this.random(50000, 29999900);
					let myDate = new Date(date);
					temp['date'] = `${myDate.getFullYear()}-${myDate.getMonth() +1}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes()}`;
					temp['address'] = `上海市普陀区金沙江路 ${1000+i} 弄`;
					this.tableData.push(temp);
					this.id = temp['id'];
                }
            };
			createData();
		},

		methods: {
			...mapActions(['LOADING', 'SET_TITLE']),
			...mapMutations(['PRIVATE_LOADING']),
			close() {
				this.customDialogShow = !this.customDialogShow;
			},

			addHandle(){
				this.$refs.form.validate(valid => {
					if (valid) {
						let temp = {};
						temp['id'] = this.id + 1;
						temp['name'] = this.form.addName;
						temp['address'] = this.form.address;
						let myDate = new Date();
						temp['date'] = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()} ${myDate.getHours()}:${myDate.getMinutes()}`;
						this.tableData.push(temp);
						this.total = this.tableData.length;
                    }
                })
            },
            
            getTableData(){
				console.log(this.tableData.slice((this.current - 1) * this.size, this.current*this.size), (this.current - 1) * this.size)
				return this.tableData.slice((this.current-1)* this.size, this.current* this.size);
            },

			random(min, max) {
				let Range = max - min;
				let Rand = Math.random();
				return (min + Math.round(Rand * Range));
			},

			open() {
				this.customDialogShow = true;
			},

			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 3) {
					return 'success-row';
				}
				return '';
			},

			currentChange(num){
				this.current = num;
            }

		}
	};
</script>

<style type="scss">
    .add-data { width: 600px; margin: 30px auto 0; padding:20px; background: #fff;}
    .add-data h3 { padding-bottom: 20px;}
    .add-data h3 span {color: #c00;}
    .dialog-content-table { margin: 10px 15px; width: 570px;}
    .el-table .warning-row {
        background: oldlace;
    }
    
    .el-table .success-row {
        background: #f0f9eb;
    }
    
    .dialog-pagination {
        padding: 5px 15px;
        text-align: right;
    }
    
    .dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        
    }
    
    .dialog-content {
        position: absolute;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
        width: 600px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        z-index: 1010;
        border-radius: 4px;
        
    }
    
    .dialog-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0 15px;
    }
    
    .dialog-title-close {
        width: 20px;
        height: 20px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
    }
    
    .dialog-content-box {
        max-height: 500px;
        max-height: -moz-calc(500px - 88px);
        max-height: -webkit-calc(500px - 88px);
        max-height: calc(500px - 88px);
        overflow-y: auto;
        overflow-x: hidden;
    }
    
    .dailog-btn {
        padding: 10px 25px;
        text-align: right;
        background: #eee;
        border-top: 1px solid #ccc;
        border-radius: 0 0 4px 4px;
    }
    
    .dialog-title {
        height: 40px;
        background: #eee;
        border-bottom: 1px solid #ccc;
        border-radius: 4px 4px 0 0;
    }
    
    .dialog-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 1009;
    }
</style>
