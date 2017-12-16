const { events, Job, Group } = require('brigadier');

const createJob = ({name, image, tasks}) => {
  let job = new Job(name, image);
  job.tasks = tasks;
  return job;
};

const runNode = async () => {
  let group = new Group();
  group.add(createJob(
    {
      name: 'test-node',
      image: 'node:latest',
      tasks: [
        'cd /src/node',
        'yarn install',
        'yarn test'
      ],
    }
  ));
  await group.runEach();
}

const run = async () => {
  await runNode();
};

events.on("exec", async (brigadeEvent, project) => {
  run();
});

events.on('push', (brigadeEvent, project) => {
  run();
});
