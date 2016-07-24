title: "break continue"
date: 2015-09-02 10:45:09
tags: swift, break, continue
categories: swift
---
* break 跳出剩余循环


    var array = [3, 4, 5, 6, 7, 8, 9]
    for (index, value) in enumerate(array) {
      if value % 5 == 0 {
        println(index)
        break
      }
    }


* continue 跳出本次循环


    var array = [3, 4, 5, 6, 7, 8, 9]
    for (index, value) in enumerate(array) {
      if value % 2 != 0 {
        println(index)
        continue
      }
    }