// 对打包目录进行文件归类
const fs = require('fs');
const path = require('path');

// 获得第一个参数为扫描目录
const dir = process.argv.splice(2)[0];

// 文件分门别类
const handleMix = fileList => {
  const cssDir = path.join(dir, 'css');
  const imgDir = path.join(dir, 'img');
  const jsDir = path.join(dir, 'script');

  // 创建目录
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir);
  }
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
  }
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir);
  }

  // 扫描文件内容，改写路径
  fileList.forEach(file => {
    const ext = file.split('.').slice(-1)[0];
    const filePath = path.join(dir, file);

    // 可以改写的
    if (['html', 'css', 'js'].indexOf(ext) >= 0) {
      // 排除目录
      if (!fs.statSync(filePath).isFile()) return;
      let needReplaceContent = fs.readFileSync(filePath, 'utf8');

      fileList.forEach(file2 => {
        // 排除目录
        if (!fs.statSync(path.join(dir, file2)).isFile()) return;
        const ext2 = file2.split('.').slice(-1)[0];
        const expr = new RegExp(`${file2}`, 'g');
        // js地址重写
        if (ext2 === 'js') {
          if (ext === 'html') {
            needReplaceContent = needReplaceContent.replace(expr, `./script/${file2}`);
          }
        }
        // 图片地址重写
        if (['jpg', 'gif', 'png', 'svg', 'ico'].indexOf(ext2) >= 0) {
          if (ext === 'css') {
            needReplaceContent = needReplaceContent.replace(expr, `../img/${file2}`);
          }
          if (ext === 'html' || ext === 'js') {
            needReplaceContent = needReplaceContent.replace(expr, `./img/${file2}`);
          }
        }
        // 样式地址重写
        if (ext2 === 'css') {
          if (ext === 'html') {
            needReplaceContent = needReplaceContent.replace(expr, `./css/${file2}`);
          }
        }
      });
      // 重新写入文件
      fs.writeFileSync(filePath, needReplaceContent);
    }
  });

  // 将文件放入对应目录
  fileList.forEach(file => {
    const oldPath = path.join(dir, file);
    const ext = file.split('.').slice(-1)[0];
    // 排除目录
    if (!fs.statSync(oldPath).isFile()) return;
    if (ext === 'js' || ext === 'map') {
      fs.renameSync(oldPath, path.join(dir, 'script', file));
    }
    if (['jpg', 'gif', 'png', 'svg', 'ico'].indexOf(ext) >= 0) {
      fs.renameSync(oldPath, path.join(dir, 'img', file));
    }
    if (ext === 'css') {
      fs.renameSync(oldPath, path.join(dir, 'css', file));
    }
  });

  console.log('done!');
};

if (!dir) {
  return console.error('请输入需要分类的项目打包目录，如 ./zheshang/officialSite/build');
}

// 循环目录里的文件
try {
  handleMix(fs.readdirSync(dir));
} catch (e) {
  console.error(e);
}
