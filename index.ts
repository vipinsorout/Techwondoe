import app from './app';
const port = 3000;

app.listen(port,() => {
    console.log("application is up & running at http://localhost:"+port);
})
