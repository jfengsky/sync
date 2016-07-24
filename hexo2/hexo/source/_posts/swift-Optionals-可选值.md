title: "swift Optionals(可选值)"
date: 2015-06-18 14:06:26
tags: 可选值
categories: swift
---
* 声明后面加? 
* 可选值不能进行强制类型转换,需要解包
* 可选值后面加!来进行解包


    // 声明一个可选值
    let strA:String? = "test";
    // 可选值解包
    let strB:String! = strA;

    var a:Int;
    // println(a); 报错, a没有初始化值

    var age:Int?;
    println(age); // -> nil
    age = 12;
    println(age); // -> Optional(12) 表示可选值12

    if age != nil {
        println("you age is \(age)"); // -> you age is Optional(12)
        
        // 把可选值转化为可定有值(可选值的解包)
        println("you age is \(age!)"); // -> you age is 12
    }


    // String(age); 报错,可选值不能强制进行类型转换
    String(age!); // ->12