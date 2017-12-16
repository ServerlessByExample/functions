const { events, Job, Group } = require('brigadier');

const artifacts = "/mnt/brigade/share/fibonacci"

const createJob = ({name, image, tasks}) => {
  let job = new Job(name, image);
  job.tasks = tasks;
  return job;
};

const runGo = async () => {
  let group = new Group();
  group.add(createJob(
    {
      name: 'test-go',
      image: 'golang:1.9.2',
      tasks: [
        'cd /src/go',
        'go test',
      ],
    }
  ));
	group.add(createJob(
    {
      name: 'build-go',
      image: 'golang:1.9.2',
      tasks: [
        'cd /src/go',
        'go build -buildmode=plugin -o fibonacci.so fibonacci.go',
      ],
    }
	));
	await group.runEach();
}

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

const deploy = async () => {
  await createJob(
    {
      name: 'deploy',
      image: 'jskswamy/fission-deployer:latest',
      tasks: [
        'cd /src/',
        'deployer',
      ],
    }
  ).run();
}

const run = async () => {
  await runGo();
  await runNode();
  await deploy();

};

events.on("exec", async (brigadeEvent, project) => {
  run();
  console.log("Done running")
});

events.on('push', (brigadeEvent, project) => {
  console.log('Hello world!');
});
