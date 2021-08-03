import switchButton from "./cron/switchButton";

class ManagerCron {
  private jobs = [] as any[];
  constructor() {
    this.jobs = [switchButton];
  }

  run() {
    this.jobs.forEach((job) => job.start());
  }
}

export default ManagerCron;
