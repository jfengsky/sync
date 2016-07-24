title: "NSArray和NSMutableArray"
categories: swift
---
### NSArray的一些方法总结
  
    // 数组的创建
    NSArray *array1 = [NSArray arrayWithObject:@"one"];
    NSArray *array2 = [NSArray arrayWithObjects:@"one", @"two", @"three", @"four", @"five",nil];
    NSArray *array3 = [NSArray arrayWithArray:array2];
    NSLog(@"array1 : %@", array1);
    NSLog(@"array2 : %@", array2);
    NSLog(@"array3 : %@", array3);
    NSArray *array4 = [[NSArray alloc] initWithArray:array1];
    
    // 获取数组中元素的个数
    int count = [array2 count];
    NSLog(@"%d", count);   // => 5
    
    NSString *string1 = [array2 objectAtIndex:1];
    NSLog(@"%@", string1);  // => two
    
    // 追加对象,返回一个新的数组
    NSArray *array5 = [array2 arrayByAddingObject:@"six"];
    NSLog(@"array5 : %@", array5);
    
    // 用指定的字符串把数组中的元素连接起来
    NSString *string2 = [array5 componentsJoinedByString:@"|"];
    NSLog(@"%@", string2);
    
    // 判断数组中是否存在一个指定的对象
    BOOL isContain = [array5 containsObject:@"three"];
    NSLog(@"%d", isContain);
    
    // 根据指定的对象返回索引下标
    NSInteger index = [array5 indexOfObject:@"three"];
    NSLog(@"%d", index);
    
    // 返回数组中的最后一个元素
    NSString *lastObject = [array5 lastObject];
    NSLog(@"%@", lastObject);


### NSMutableArray的一些方法总结
* NSMutableArray继承自NSArray


    // 可变数组
    NSMutableArray *mArray1 = [NSMutableArray array];
    NSLog(@"%@", mArray1);
    
    // 创建一个有5个元素的可变数组
    NSMutableArray *mArray2 = [NSMutableArray arrayWithCapacity:5];
    NSLog(@"%@", mArray2);
    
    NSMutableArray *mArray3 = [NSMutableArray arrayWithObjects:@"one", @"two", nil];
    NSLog(@"%@", mArray3);
    
    //添加元素
    [mArray3 addObject:@"three"];
    NSLog(@"%@", mArray3);
    
    // 插入元素
    [mArray3 insertObject:@"four" atIndex:3];
    NSLog(@"%@", mArray3);
    
    // 移除最后一个元素
    [mArray3 removeLastObject];
    NSLog(@"%@", mArray3);
    
    // 移除指定元素
    [mArray3 removeObject:@"two"];
    NSLog(@"%@", mArray3);
    
    // 根据索引下标删除
    [mArray3 removeObjectAtIndex:1];
    NSLog(@"%@", mArray3);
    
    [mArray3 addObject:@"six"];
    [mArray3 addObject:@"seven"];
    [mArray3 addObject:@"eight"];
    
    // 根据数组删除
    NSArray *deleteArray = [NSArray arrayWithObjects:@"seven",@"eight",nil];
    [mArray3 removeObjectsInArray:deleteArray];
    NSLog(@"%@", mArray3);
    
    // 替换指定下标的元素
    [mArray3 replaceObjectAtIndex:1 withObject:@"replace"];
    NSLog(@"%@", mArray3);

### 遍历数组
    
    for (NSString *tempString in array5) {
      NSLog(@"found: %@", tempString);
    }
    
    // 当不确定数组的元素的类型时,可以选择用id
    for (id tempString in array5) {
      NSLog(@"id found: %@", tempString);
    }