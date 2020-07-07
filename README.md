# Dile Components

Dile components is a collection of Web Components created and maintained by @EscuelaIT's students and instructors.

This components are created to solve common purpouses in websites and web applications. Each compoment has many of CSS custom properties to adapt the component look & feel to your neeeds. 

## Usage

1.- **Install any of the web components**

```
npm install @dile/dile-input
```

2.- **Import the component**

Into your HTML page

```
<script src="./node_modules/@dile/dile-input/dile-input.js" type="module"></script>
```

... or into your module script

```
import '@dile/dile-input/dile-input';
```

3.- **Use the component**

```
<dile-input
  name="name"
  label="Name"
  value="John"
></dile-input>
```

4.- **Read the component documentation** for more information about component properties, CSS custom properties, API methods and custom events.

Each component documentation is on the related package folder. For example, the ```<dile-input>``` documentation is located on  the file:  ```packages/dile-input/README.md```. 

5.- **Serve your proyect**

There are many development servers to help you in this area. Our recomendation is to use [es-dev-server](https://open-wc.org/developing/es-dev-server.html).

To use serve your proyect launch this command on your project root folder. 

```npx es-dev-server --node-resolve --watch```

6.- **Enjoy!**

## Develop

This is a monorepository managed by [Lerna](https://github.com/lerna/lerna).

To develop web components or run the demos allocated on the ```demo``` folder, you need to use Lerna to solve the common dependencies installed on the monorepo.

1.- Clone this repository

2.- Run ```npm install``` to install the dependencies

3.- Run ```npm run lerna bootstrap``` to link local packages together

4.- Run ```npm run start``` to launch the demos

