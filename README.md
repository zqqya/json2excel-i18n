# json2excel-i18n

用于基于Vue I18n实现国际化时json和excel互转

## 安装

`npm install json2excel-i18n`

## 方法

一、json2excel(inputDir, outputPath)

将一个文件夹下的所有特定格式json文件转换为一个excel文件

### 参数

inputDir: 必需，包含待转换json文件的文件夹路径

outputPath: 必需，excel输出路径

json文件格式示例：
```js
{
  "module1": {
    "key1": "1",
    "key2": "2"
  },
  "module2": {
    "key3": "3",
    "key4": "4"
  }
}
```

二、excel2json(inputPath, outputDir)

将一个excel文件转换为多个特定格式json文件

### 参数

inputPath: 必需，待转换excel路径

outputDir: 必需，多个json文件的输出路径（文件夹）

## 示例
json文件夹下有json文件如下：

zh.json
```js
{
  "module1": {
    "key1": "1",
    "key2": "2"
  },
  "module2": {
    "key3": "3",
    "key4": "4"
  }
}
```
en.json
```js
{
  "module1": {
    "key1": "en1",
    "key2": "en2"
  },
  "module2": {
    "key3": "en3",
    "key4": "en4"
  }
}
```

```js
var test = require('json2excel-i18n')
test.json2excel('./json', './excel/lang.xlsx')
```

最后输出lang.xlsx:
| module | key | zh | en |
| :-----| :----- | :----- | :----- |
| module1 | key1 | 1 | en1 |
| module1 | key2 | 2 | en2 |
| module2 | key3 | 3 | en3 |
| module2 | key4 | 4 | en4 |