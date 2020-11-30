const fs = require('fs'); //引用文件系统模块
const image = require("imageinfo"); //引用imageinfo模块

const list = getFiles.getImageFiles("./src");
console.log(list)
for(let item of list) {
  const oImg = new Image();
  oImg.src = require(`./src/${fileName}`); //当成模块引入图片
  document.body.appendChild(oImg);
}


function readFileList(path, filesList) {
  const files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
    const stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + "/", filesList)
    } else {

      const obj = {}; //定义一个对象存放文件的路径和名字
      obj.path = path; //路径
      obj.filename = itm //名字
      filesList.push(obj);
    }

  })

}
const getFiles = {
  //获取文件夹下的所有文件
  getFileList: function (path) {
    const filesList = [];
    readFileList(path, filesList);
    return filesList;
  },
  //获取文件夹下的所有图片
  getImageFiles: function (path) {
    const imageList = [];
    this.getFileList(path).forEach((item) => {
      const ms = image(fs.readFileSync(item.path + item.filename));
      ms.mimeType && (imageList.push(item.filename))
    });
    return imageList;
  }
};

