# Exploring node js
## What is node js?
> Node.js is an open-source and cross-platform JavaScript runtime environment.
> Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. This allows Node.js to be very performant.

> A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking. In addition, libraries in Node.js are generally written using non-blocking paradigms. Accordingly, blocking behavior is the exception rather than the norm in Node.js.

> When Node.js performs an I/O operation, like reading from the network, accessing a database or the filesystem, instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.

> This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.

## Installing node js
1. Go to the official Node.js Download Page.
2. Download and run the LTS (Long Term Support) installer for your computer.
3. Open your terminal (Command Prompt/PowerShell on Windows, Terminal on Mac/Linux).
4. Verify it installed correctly by typing node -v and pressing Enter.
   1. It should display a version number (e.g., v20.x.x or v22.x.x).

## Running your first
- Create a file say: app.js
- Add valid javascript code, like: `console.log("hello world");`
- Run the node js script by running command: `node <FILE_PATH>`

## Importing modules/dependencies
As your project grows to stay organised you will need to create several files and folder   
and use them in other files in your project. You may also need to use inbuilt node js libraries.  
like `fs, process, https, etc.` or npm modules like `express, axios, etc.`.  
To be able to use these modules you should know how to import modules.

- Import your own code
  - Check `math.js` and `math-utils.js` in `Supplementary snippets/exploring-node-js`
- Import an npm module
  - Check `console-says.js` in `Supplementary snippets/exploring-node-js`
- Import built nodejs libs
  - Check `says-hi.js` in `Supplementary snippets/exploring-node-js`

To be able to use external dependencies like figlet you'll need to initialize npm by running `npm init`, npm is node package manager btw.
### There are different kind of dependencies that you can use in a project, read more at: https://medium.com/javascript-in-plain-english/what-the-dependency-types-of-dependencies-in-a-node-js-application-explained-904a5424fbd3

### Important: Node.js has two module systems: CommonJS modules and ECMAScript modules. Use 
> ECMAScript modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variety of import and export statements.

In ES Modules (ESM), you share code between files using Named Exports and Default Exports.
1. Named Exports. \
Use these to export multiple variables, functions, or classes from a single file. You must import them using the exact same name inside curly braces {}.  
  
      **Inline Exporting**\
      Place the export keyword directly in front of the declaration
      ```
      // math.js
      export const PI = 3.14159;
    
      export function add(a, b) {
        return a + b;
      }
    
      export class Calculator {}
      ```
      **Bottom Exporting**\
      Declare everything first, then export them all at once at the bottom of the file.
      ```
      // math.js
      const PI = 3.14159;
      function add(a, b) { return a + b; }
    
      export { PI, add };
      ```
      **How to Import Named Exports**
      ```
      // app.js
      import { PI, add } from './math.js';
    
      console.log(add(2, 3)); // 5
      ```

2. Default Exports. \
Use this when a file only exports one main thing (like a single configuration object, component, or class). You can only have one default export per file.\
      **Inline Default Export**
      ```
      // logger.js
      export default function log(message) {
        console.log(`[LOG]: ${message}`);
      }
      ```
      **Bottom Default Export**
      ```
      // logger.js
      function log(message) {
        console.log(`[LOG]: ${message}`);
      }
      
      export default log;
      ```
      
      **How to Import a Default Export**\
      When importing a default export, you do not use curly braces. You can also rename it to whatever you want during the import.
      ```
      // app.js
      import myCustomLogName from './logger.js';
      
      myCustomLogName('Hello World'); // [LOG]: Hello World
      ```

3. Combining Both\
      **A single file can contain both multiple named exports and one default export.**
      ```
      // user.js
      export const userAge = 30; // Named
      
      export default function getUser() {  // Default
        return { name: 'Alice' };
      }
      ```
      
      **How to Import Both Together**
      ```
      // app.js
      import getUser, { userAge } from './user.js';
      ```
    

## Command line arguments
Simplest way to get user arguments in node js script is using command line arguments.  
When you run a Node.js application, terminal inputs are captured in a global array called process.argv. The first two slots of this array are automatically reserved: index 0 holds the path to the Node.js binary, and index 1 holds the path to your executed script. Every item listed after these first two represents a custom command-line argument passed into your app.  

Example: running `node Supplementary\ snippets/exploring-node-js/math-with-args.js 4 5` should yeild `9`

## Debugging Node js
There are several ways to go about it, you can definetly use console.log or other console statements to understand what's going on, but more sophisticated way would be to use node debugger. To debug a script you can use: `node inspect <FILE_PATH>` after that head over to `chrome://inspect` in your Chrome browser to see your available debugging targets. Just click `"inspect"` next to your Node.js process, and the familiar `Chrome DevTools window` will pop right open. You can add `debugger` statement in code to add `breakpoints`

## File operations and making external APIs requests
### File Ops
- Read a File
  - Review `read-file.js` in `Supplementary snippets/exploring-node-js`
- Write a File
  - Review `write-file.js` in `Supplementary snippets/exploring-node-js`
- Append to a File
  - Review `append-file.js` in `Supplementary snippets/exploring-node-js`
- Delete (Unlink) a File
  - Review `delete-file.js` in `Supplementary snippets/exploring-node-js`
- Check if a File Exists
  - Review `check-file-exists.js` in `Supplementar snippets/exploring-node-js`

### Making an external request
Go with native fetch method or got(3rd party robust npm package for making request) __**both supports await**__\
Review `fetch-location.js` in `Supplementar snippets/exploring-node-js`