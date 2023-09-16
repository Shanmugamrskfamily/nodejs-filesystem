const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const ouputFolder="./Output";
if (!fs.existsSync(ouputFolder))
{
    fs.mkdirSync(ouputFolder)
}
const PORT =3000;

app.use(express.json());

// Set up your routes here

app.listen(PORT, () => {
  console.log(`Server is running : http://localhost:${PORT}`);
});

app.post("/createTextFile", (req, res) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString();
    const date = currentTime.getDate().toString();
    const hrs = currentTime.getHours().toString();
    const mins = currentTime.getMinutes().toString();
    const secs = currentTime.getSeconds().toString();
  
    const dateTimeForFileName = `${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`;
  
    const filePath = path.join(ouputFolder, dateTimeForFileName);
  
    fs.writeFile(filePath, currentTime.toISOString(), (err) => {
      if (err) {
        res.status(500).send(`Error creating file: ${err}`);
        return;
      }
  
      res.send(`File created successfully at: ${filePath}`);
    });
  });
    
  app.get('/getTextFiles',(req,res)=>{
    fs.readdir(ouputFolder,(err,files)=>{
        if(err){
            res.status(500).send(`Error Occured on Reading Files: ${err}`);
            return
        }
        console.log("List of files: \n", files);
        const textFiles = files.filter((file) => path.extname(file) === ".txt");
    
        res.json(textFiles);
    })
});