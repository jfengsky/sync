title: "swift 枚举类型"
date: 2015-09-08 14:17:35
tags: 枚举, enum
categories: swift
---
  
    /**
     * swift 枚举类型
     */

    // 声明枚举 下面两种方法等价
    enum Method {
    //  case Add
    //  case Sub
    //  case Mul
    //  case Div
      case Add, Sub, Mul, Div
    }

    // 使用枚举的两种写法
    var m0: Method = .Add
    var m1 = Method.Sub

    // switch匹配枚举
    func chooseMethod(op: Method) -> (Double, Double) -> Double {
      switch op {
        case .Add:
          func add(a:Double, b:Double) -> Double {
            return a + b
          }
          return add
        case .Sub:
          return {
            (a:Double, b:Double) -> Double in
            return a - b
          }
        case .Mul:
          return {
            return $0 * $1
          }
        case .Div:
          return {
            $0 / $1
          }
    //  default:
    //    return { $0 / $1}
      }
    }

    let val = chooseMethod(.Mul)(30, 5)

    // 枚举的原始值
    // 可以为任意类型,整型可以不指定值,默认从0开始向后+1,其它类型声明时必须全部都指定值
    enum MethodInt: Int {
      
      // 这里Add是0, Sub是1, Mul是2, Div是3
      // case Add, Sub, Mul, Div
      case Add = 5, Sub = 9, Mul, Div
    }

    enum MethodStr: String {
      case Add = "add", Sub = "sub", Mul = "mul", Div = "div"
    }

    // 获取枚举的原始值
    MethodInt.Sub.rawValue
    Method.Mul.hashValue
    MethodStr.Add.rawValue


    // 枚举关联值
    // 用元祖方式每个枚举可以设置多个关联值
    enum LineSegment {
      case StartAndEnd(start: Double, end:Double)
      case StartAndPattern(start: Double, pattern: Double)
    }
    var lsd = LineSegment.StartAndEnd(start: 10, end: 20)
    switch lsd {
    case .StartAndEnd(let s, let e):
      println("\(s) -> \(e)")
    case .StartAndPattern(let s, let len):
      println("\(s) -> \(len)")
    }
    // -> "10.0 -> 20.0"

