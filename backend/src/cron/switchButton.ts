import cron from "node-cron";
import SwitchButtonByCronService from "../services/SwitchButtonByCronService";

function switchButton() {
  const switchButtonByCronService = new SwitchButtonByCronService();

  switchButtonByCronService.execute();
}

export default cron.schedule("* */1 * * * *", switchButton, {
  scheduled: false,
});
