title: "swift Dictionary 字典"
date: 2015-09-02 10:38:51
tags: swift,字典
categories: swift
---
  
    /*
     *定义一个字典
     */

    // 完整严格定义一个字典
    var dict: Dictionary<String,String> = ["apple": "苹果", "bag":"包"]

    // 简单定义一个字典
    var dict2 = [:]

    // 字典元素个数
    dict.count

    dict["apple"]

    // 更新值
    dict["bag"] = "包包"

    // 更新键 返回nil
    dict.updateValue("大苹果", forKey: "apple")

    // 当键不存在时会添加一个,返回nil
    dict.updateValue("电脑", forKey: "computer")

    // 删除一个键,返回被删除的值
    dict.removeValueForKey("computer")

    // 删除所有的值
    //dict.removeAll()

    /*
     * 遍历字典
     */

    for (key,value) in dict {
      println(key)
      println(value)
    }

    // 只遍历key
    for key in dict.keys {
      println(key)
    }

    // 只遍历value
    for value in dict.values {
      println(value)
    }