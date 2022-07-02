<template>
  <div class="account-title">
    <el-row :gutter="20">
      <el-col :span="10">日托账号管理</el-col>
      <el-col :span="10"></el-col>
      <el-col :span="2">
        <el-button type="primary" @click="showAddAccountDialog = true">新增</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
  </div>
  <el-table :data="accountList" style="width: 100%">
    <el-table-column prop="id" label="ID" width="50" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="account" label="账号" width="180" />
    <el-table-column label="服务器" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.server == 0 ? '官服' : 'B服' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.delete == 0 ? '正常' : '已删除' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="expireTime" label="到期时间" width="180" />
    <el-table-column align="right">
      <template #default="scope">
        <el-button size="small" @click=";(configureAccountDialog = true), (selectID = scope.row.id)">编辑</el-button>
        <el-button size="small" type="danger" @click=";(deleteConfirmationDialog = true), (selectID = scope.row.id)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="showAddAccountDialog" title="新增账号" width="30%">
    <el-row :gutter="20">
      <el-col :span="8"><span>名称</span></el-col>
      <el-col :span="16">
        <el-input v-model="newAccount.name" placeholder="输入昵称" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>账号</span></el-col>
      <el-col :span="16">
        <el-input v-model="newAccount.account" placeholder="输入账号" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>密码</span></el-col>
      <el-col :span="16">
        <el-input v-model="newAccount.password" placeholder="输入密码" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>服务器</span></el-col>
      <el-col :span="16">
        <el-radio-group v-model="newAccount.server">
          <el-radio label="0">官服</el-radio>
          <el-radio label="1">B服</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>到期时间</span></el-col>
      <el-col :span="16">
        <el-date-picker
          v-model="newAccount.expireTime"
          type="date"
          placeholder="账号到期时间"
          format="YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
        />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAddAccountDialog = false">取消</el-button>
        <el-button type="primary" @click="addNewAccount">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="deleteConfirmationDialog" title="警告" width="30%">
    <span>确定删除账号 {{ selectID }} 吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="deleteConfirmationDialog = false">取消</el-button>
        <el-button type="danger" @click="delOldAccount">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="configureAccountDialog" title="账号配置" width="50%">
    <el-row :gutter="20">
      <el-col :span="8"><span>名称</span></el-col>
      <el-col :span="16">
        <el-input v-model="getAccountByID(selectID).name" :placeholder="getAccountByID(selectID).name" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>账号</span></el-col>
      <el-col :span="16">
        <el-input v-model="getAccountByID(selectID).account" :placeholder="getAccountByID(selectID).account" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>密码</span></el-col>
      <el-col :span="16">
        <el-input v-model="getAccountByID(selectID).password" :placeholder="getAccountByID(selectID).password" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>服务器</span></el-col>
      <el-col :span="16">
        <el-radio-group v-model="getAccountByID(selectID).server">
          <el-radio label="0">官服</el-radio>
          <el-radio label="1">B服</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><span>战斗</span></el-col>
      <el-col :span="20">
        <span>
          <el-form :model="accountList" label-width="120px" class="demo-dynamic">
            <el-form-item v-for="fightTask in accountList[getIndexByID(selectID)].config.daily.fight">
              <el-col :span="10"><el-input v-model="fightTask.level" /></el-col>
              <el-col :span="8"><el-input v-model="fightTask.num" /></el-col>
              <el-col :span="6"><el-button @click.prevent="removeOption(fightTask)">删除</el-button></el-col>
            </el-form-item>
            <el-form-item>
              <el-button @click="addOption">新建</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"><span>激活时间</span></el-col>
      <el-col :span="3">
        <span>
          <el-checkbox v-model="accountList[getIndexByID(selectID)].active.monday.enable">周一</el-checkbox>
        </span>
      </el-col>
      <el-col :span="3">
        <span>
          <el-checkbox v-model="accountList[getIndexByID(selectID)].active.tuesday.enable">周二</el-checkbox>
        </span>
      </el-col>
      <el-col :span="3">
        <span>
          <el-checkbox v-model="accountList[getIndexByID(selectID)].active.wednesday.enable">周三</el-checkbox>
        </span>
      </el-col>
      <el-col :span="3">
        <span>
          <el-checkbox v-model="accountList[getIndexByID(selectID)].active.thursday.enable">周四</el-checkbox>
        </span>
      </el-col>
      <el-col :span="3">
        <span>
          <el-checkbox v-model="accountList[getIndexByID(selectID)].active.friday.enable">周五</el-checkbox>
        </span>
      </el-col>
      <el-col :span="3">
        <span>
          <el-checkbox v-model="accountList[getIndexByID(selectID)].active.saturday.enable">周六</el-checkbox>
        </span>
      </el-col>
      <el-col :span="3">
        <span>
          <el-checkbox v-model="accountList[getIndexByID(selectID)].active.sunday.enable">周天</el-checkbox>
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8"><span>到期时间</span></el-col>
      <el-col :span="16">
        <el-date-picker
          v-model="accountList[getIndexByID(selectID)].expireTime"
          type="date"
          placeholder="设备到期时间"
          format="YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
        />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="configureAccountDialog = false">取消</el-button>
        <el-button type="success" @click="updateOldAccount">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-pagination background layout="prev, pager, next" :page-count="page_count" @update:current-page="updatePage" />
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive, ref } from 'vue'
import { InitData } from '../types/account'
import { updateAccount, delAccount, addAccount, searchAccount } from '../http/api'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    const showAddAccountDialog = ref(false)

    const deleteConfirmationDialog = ref(false)

    const configureAccountDialog = ref(false)

    const refresh = () => {
      searchAccount({
        current: data.current_page,
        size: 10,
      }).then((res) => {
        data.accountList = res.data
        console.log(data.accountList)
        console.log(data.selectID)
        console.log(getIndexByID(data.selectID))
      })
    }

    onMounted(() => {
      refresh()
    })

    const addNewAccount = () => {
      addAccount(data.newAccount).then(() => {
        showAddAccountDialog.value = false
        refresh()
      })
    }

    const delOldAccount = () => {
      delAccount({ id: data.selectID }).then(() => {
        refresh()
      })
    }

    const updatePage = (page: number) => {
      data.current_page = page
      refresh()
    }

    const getAccountByID = (id: number) => {
      data.accountList.forEach((item) => {
        if (item.id === id) {
          data.oldAccount = item
        }
      })
      return data.oldAccount
    }

    const getIndexByID = (id: number) => {
      let index = 0
      let res = 0
      data.accountList.forEach((item) => {
        if (item.id == id) {
          res = index
        }
        index++
      })
      return res
    }

    interface fightTask {
      num: number
      level: string
    }

    const removeOption = (item: fightTask) => {
      var newList: {
        num: number
        level: string
      }[] = []
      data.accountList[getIndexByID(data.selectID)].config.daily.fight.forEach((element) => {
        if (element !== item) {
          newList.push(element)
        }
      })
      data.accountList[getIndexByID(data.selectID)].config.daily.fight = newList
    }

    const addOption = () => {
      data.accountList[getIndexByID(data.selectID)].config.daily.fight.push({
        num: 0,
        level: '',
      })
    }

    const updateOldAccount = () => {
      updateAccount(data.accountList[getIndexByID(data.selectID)]).then(() => {
        refresh()
      })
    }

    const getDay = (day: string) => {
      let res = ''
      switch (day) {
        case 'sunday':
          res = '周日'
          break
        case 'monday':
          res = '周一'
          break
        case 'tuesday':
          res = '周二'
          break
        case 'wednesday':
          res = '周三'
          break
        case 'thursday':
          res = '周四'
          break
        case 'friday':
          res = '周五'
          break
        case 'saturday':
          res = '周六'
          break
      }
      return res
    }

    return {
      ...toRefs(data),
      showAddAccountDialog,
      deleteConfirmationDialog,
      configureAccountDialog,
      refresh,
      updatePage,
      addNewAccount,
      delOldAccount,
      getAccountByID,
      removeOption,
      addOption,
      getIndexByID,
      updateOldAccount,
      getDay,
    }
  },
})
</script>

<style scoped>
.el-pagination {
  margin: 20px auto;
  padding-left: 25%;
}
</style>
