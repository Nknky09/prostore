class Queue {
  constructor(limit = 10) {
    this.jobs = [];
    this.limit = limit;
    this.running = 0;
    this.index = 0;
  }

  add(jobs) {
    this.jobs.push(...jobs);
  }

  async start() {
    return new Promise(resolve => {
      const runNext = () => {
        if (this.index >= this.jobs.length && this.running === 0) {
          resolve();
          return;
        }

        while (this.running < this.limit && this.index < this.jobs.length) {
          const job = this.jobs[this.index++];
          this.running++;

          job()
            .catch(() => {})
            .finally(() => {
              this.running--;
              runNext();
            });
        }
      };
      runNext();
    });
  }
}

const delay = (ms, id) => () =>
  new Promise(resolve => {
    console.log(`Started job ${id}`);
    setTimeout(() => {
      console.log(`Finished job ${id}`);
      resolve();
    }, ms);
  });

const jobs = Array.from({ length: 25 }, (_, i) => delay(1000, i + 1));

const queue = new Queue(5);
queue.add(jobs);
queue.start().then(() => {
  console.log("All jobs completed");
});
