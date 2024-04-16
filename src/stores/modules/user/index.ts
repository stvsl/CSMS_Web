import { defineStore } from "pinia";
// 定义状态的类型 一般情况下Pinia会自动推断出state的类型，你就无需定义接口。如果state的数据类型比较复杂，推荐你定义一个接口来描述state的类型
interface IUserState {
  status: number; // 0 未登录 1 管理员 2 普通用户
  ID: number;
  Name: string;
  Tel: string;
  Passwd: string;
}
const useUserStore = defineStore("user", {
  state: (): IUserState => ({
    status: 0,
    ID: 0,
    Name: "",
    Tel: "",
    Passwd: "",
  }),
  getters: {
    getAll(): IUserState {
      return this;
    },
  },
  actions: {
    loginStatus() {
      return this.status;
    },
    exitStatus() {
      this.status = 0;
      this.ID = 0;
      this.Name = "";
      this.Tel = "";
      this.Passwd = "";
    },
    logout() {
      this.exitStatus();
    },
    updateAdmin(user: any) {
      this.exitStatus();
      this.status = 1;
      console.log(user);
      this.ID = user.ID;
      this.Name = user.Name;
      this.Tel = user.Tel;
      this.Passwd = user.Passwd;
    },
  },
  persist: true,
});
export default useUserStore;
