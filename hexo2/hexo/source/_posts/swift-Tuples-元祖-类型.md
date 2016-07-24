title: "swift Tuples(元祖)类型"
date: 2015-06-18 13:33:12
tags: 元祖类型
categories: swift
---
  
* 将多个不同的值集合成一个数据
* 可以有任意多个值
* 不同的值可以是不同的类型

    
    // 声明一个元祖类型
    let tuplesTest:(Bool, Int, String) = (false, 404, "Not Found");

    // 元祖类型示例
    let tuples1 = (false, 404, "Not Found");
    // key:value形式
    let tuples2 = (isSuccess: false, errorCode: 404, errorMessage: "Not Found");

    /* 
     * 访问元祖中的数据
    */
    // 1.通过定义常量访问
    let (isSuccess, errorCode, errorMessage) = tuples1;
    println(isSuccess); // -> false
    println(errorCode); // -> 404
    println(errorMessage); // -> "Not Found"

    // 2.直接通过下标访问
    println(tuples1.0); // -> false
    println(tuples1.1); // -> 404
    println(tuples1.2); // -> "Not Found"

    // 3.通过key来访问
    println(tuples2.isSuccess); // -> false
    println(tuples2.errorCode); // -> 404
    println(tuples2.errorMessage); // -> "Not Found"

    // 使用下划线 _ 忽略部分数值
    let (_, _, errorMessage2) = tuples1;
    println(errorMessage2); // -> "Not Found"