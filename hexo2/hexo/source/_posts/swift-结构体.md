title: "swift 结构体"
date: 2015-09-08 14:59:52
tags: 结构体
categories: swift
---
  
    /**
     结构体
     */

    // 定义一个结构体
    struct Rect {
      var width: Double = 0.0
      var height: Double = 0.0
      
      // 结构体的方法
      func getWidth() -> Double{
        return width
      }
      
      func show(){
        println("width=\(width), height=\(height)")
      }
    }

    // 实例化一个结构体
    var rect: Rect = Rect()

    // 访问实例结构体的变量
    rect.width

    var rect1: Rect = Rect()
    rect1.width = 100
    rect1.height = 200

    // 结构体逐一成员构造器
    var rect2: Rect = Rect(width: 300, height: 23)
    rect2.height

    // 调用结构体的方法
    rect2.getWidth()
    rect2.show()

    // 结构体整体赋值
    // rect3与rect2指向同一块内存,但rect3与rect2是两个不同的实例,只是内容一致
    var rect3 = rect2

    rect2.width = 400