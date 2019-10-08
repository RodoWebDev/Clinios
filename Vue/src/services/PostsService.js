import Api from "./api";

export default {
  getPatients() {
    return Api().get("getPatients");
  },
  searchPatients(data) {
    return Api().post("getPatients", data);
  },
  getUsers() {
    return Api().get("getUsers");
  },
  updateUser(data) {
    return Api().post("updateUser", data);
  },
  insertUser(data) {
    return Api().post("insertUser", data);
  },
  deleteUser(data) {
    return Api().post("deleteUser", data);
  }
};
