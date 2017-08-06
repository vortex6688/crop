# Crop

## Instruction

### To get started, there is a few simple steps:

- Open a command line tool and navigate to the folder with the project like so:
`cd path-to-the-project/`

- Run `npm install` to install the dependencies 

- To build a project, run `gulp`, it will build the project into `docs` folder and start the website in your browser automatically

#### Note!

If website did not open or you close the browser tab and need to reopen it in a new tab or another browser, symply use 
`http://localhost:3000`

Make sure the port `:3000` is not used by other applications.

### Workflow instruction:

- Any updates or changes should be made only in a `src/` folder, gulp will take care of it and rebuild the project into the`docs/` folder.

`docs` folder used as a `"Production"` part of the project.

To use a development built mode, run `gulp` or `gulp dev`

To use a production built mode, run `gulp prod` (note that this built will work to holt the website using github pages and it was not tested with any other hostings).