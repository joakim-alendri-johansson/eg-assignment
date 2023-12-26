# Work assignment


**Install**  
`npm i` or `npm ci`, verified with Node v20.10.0/npm v10.2.3.

**Run**  
`npm run start` to start the dev server with hot reloading and all that jazz.

OR

`npm run msw`/`npm run dev` to start the dev server with Mock Service Worker which will intercept api requests. An explanation of MSW will be displayed when entering the page, console will say _"[MSW] Mocking enabled."_ and the document title will have "[MSW]" prepended to it.  

**Tests**  
`npm run test` to run tests. A few have been added to show how to do it without going overboard in this demo app.

**Build**  
`npm run build` will build the project to `/dist` folder. It takes 2-4s on my test laptops, not including `npm i`. Dev tools like MSW is stripped.

## Notes
Based on how the position I am applying for has been described I am choosing to interpret this assignment as targeting laptops and desktops in terms of modes of interaction and screen resolutions. Therefor it is responsive from about 1000px width and stops scaling its main content at about 1600px.

Given the number of colleagues that will be using the tools I help develop some will statistically have deviations in eye sight, therefor offering different themes may be a big quality of life boon, I chose to add Dark/Light themes to showcase this.
