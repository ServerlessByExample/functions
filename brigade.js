const { events, Job, Group } = require('brigadier');

const createJob = ({id, name, image, tasks}) => {
  let job = new Job(`${name}-${id}`, image);
  job.tasks = tasks;
  return job;
};

const run = async () => {
  let group = new Group();
  group.add(createJob(
    {
      id: 1,
      name: 'test-go',
      image: 'golang:1.8-jessie',
      tasks: [
        'cd /src/go',
        'go test',
      ],
    }
  ));
	group.add(createJob(
    {
      id: 2,
      name: 'test-node',
      image: 'node:latest',
      tasks: [
        'cd /src/node',
        'yarn install',
        'yarn test',
      ],
    }
	));

  await group.runAll();
};

events.on("exec", async (brigadeEvent, project) => {
  run();
  console.log("Done running")
});

events.on('push', (brigadeEvent, project) => {
  console.log('Hello world!');
});
