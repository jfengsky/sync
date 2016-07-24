title: "NSNumber"
categories: swift
---

### NSNumber对象的一些方法总结

    // 创建一个基本的NSNumber对象
    NSNumber *numberInt = [NSNumber numberWithInt: 10];   // 创建和初始化类方法
    NSNumber *numberFloat = [[NSNumber alloc] initWithFloat: 10.8]; // 初始化实例方法
    
    // 还原成基本数据类型
    int basicInt = [numberInt intValue];
    float baseFloat = [numberFloat floatValue];

    // 比较两个对象是否相等
    if ([numberInt isEqualToNumber: numberFloat] == YES) {
      NSLog(@"相等");
    } else {
      NSLog(@"不等");
    }

    // 比较两个对象的大小
    if ( [numberInt compare:numberFloat] == NSOrderedAscending) {  
      NSLog(@"左边的数字小");  
    } else {  
      NSLog(@"左边的数字大");  
    }