# UniNode

```Universal Environment for Node + Express + ReactJS in Typescript.```

Dream comes true. 1 for all, you don't need to separate FrontEnd / BackEnd. Check it out!!

Example make call from client - server:

Create a service in service folder:

```
export class HelloWorldService {
  async sayHello() {
    return "hello from server!"
  }
}
```

List service in Services.ts

```
export services = { HelloWorldService };
```

Call from client:

```
async callHelloWorld() {
  const service = new HelloWorldService();
  try {
    console.log(await service.sayHello());
  } catch (exception) {
    console.log(exception);
  }
}
```

or (not recommended)

```
const service = new HelloWorldService();
service.sayHello().then(result => console.log(result));
```

Run the web:

`npm start` then visit website at `http://localhost:3000`
