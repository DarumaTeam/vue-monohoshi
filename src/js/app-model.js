import publisher from "./publisher";

class AppModel {
  constructor() {
    this.status = "OFF";

    publisher.subscribeModel("status", status => {
      this.status = status;
    });
  };

  toggleStatus() {
    publisher.publish("status", (this.status === "OFF") ? "ON" : "OFF");
  }
}

export default new AppModel();
