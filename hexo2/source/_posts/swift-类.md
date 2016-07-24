title: "swift 类"
date: 2015-09-09 14:33:40
tags: 类
categories: swift
---
  
    /**
     类
     */

    // 定义一个类,与结构体非常相似,只是类没有逐一成员构造器
    struct Rect {
      var width: Double = 0.0
      var height: Double = 0.0
      
      // 类的方法
      func getWidth() -> Double{
        return width
      }
      
      func show(){
        println("width=\(width), height=\(height)")
      }
    }

    // 实例化一个类
    var rect: Rect = Rect()

    // 访问实例类的变量
    rect.width

    var rect1: Rect = Rect()
    rect1.width = 100
    rect1.height = 200

    var rect2: Rect = Rect()
    rect2.height

    // 调用类的方法
    rect2.getWidth()
    rect2.show()

    // 类整体赋值
    // rect3与rect2指向同一块内存引用,当其中一个改变一个后,另外一个会改变
    var rect3 = rect2

    rect2.width = 400

    // === !== 恒等运算符,只能用于类的实例判断,判断两个类的实例是否相等
    if rect3 === rect2 {
      println("equal")
    } else {
      println("not equal")
    }