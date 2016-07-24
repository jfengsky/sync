title: "swift 二维数组"
date: 2015-09-24 14:52:42
tags: 二维数组
categories: swift
---
二维数组的声明以及遍历

    // 方法一
    var array1 = [[Int]]() 
    // 方法二
    var array2 = Array<Array<Int>>()

    array1 = [[1,2], [3,4]]
    array2 = [[5,6,7],[8,9,0]]

    // 遍历
    for(var i = 0; i < 2; i++){
      for(var j = 0; j < 3; j++){
        print(array2[i][j])
      }
    }

另一种二维数组申明方法
    
    // 苹果官方的教程
    struct Matrix {
      let rows: Int, columns: Int
      var grid: [Int]
      init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(count: rows * columns, repeatedValue: 0)
      }
      func indexIsValidForRow(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
      }
      subscript(row: Int, column: Int) -> Int {
        get {
          assert(indexIsValidForRow(row, column: column), "Index out of range")
          return grid[(row * columns) + column]
        }
        set {
          assert(indexIsValidForRow(row, column: column), "Index out of range")
          grid[(row * columns) + column] = newValue
        }
      }
    }
    
    // 初始化
    var tempArray = Matrix(rows: 2, columns: 2)
    tempArray.grid = [0,1,2,3]
    
    // 遍历
    for(var i = 0; i < 2; i++){
      for (var j = 0; j < 2; j++){
        print(tempArray[i,j])
      }
    }

