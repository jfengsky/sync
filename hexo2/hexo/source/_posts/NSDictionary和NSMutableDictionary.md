title: "NSDictionary和NSMutableDictionary"
categories: swift
---
### NSDictionary的一些方法总结
    
    NSDictionary *dic1 = [NSDictionary dictionaryWithObject:@"value" forKey:@"k1"];
    NSDictionary *dic2 = [NSDictionary dictionaryWithObjectsAndKeys:@"v1",@"k1",@"v2",@"k2",@"v3",@"k3", nil];
    NSDictionary *dic3 = [NSDictionary dictionaryWithDictionary:dic1];
    NSLog(@"%@", dic1);
    NSLog(@"%@", dic2);
    NSLog(@"%@", dic3);
    
    // 获取字典的数量
    int count = [dic2 count];
    NSLog(@"count : %d", count);
    
    // 获取字典的value
    NSString *string1 = [dic2 objectForKey:@"k3"];
    NSLog(@"value: %@", string1);
    
    // 获取字典的所有key
    NSArray *keyArray = [dic2 allKeys];
    NSLog(@"%@", keyArray);
    
    // 获取字典的所有value
    NSArray *valueArray = [dic2 allValues];
    NSLog(@"%@", valueArray);



### NSMutableDictionary的一些方法总结
* NSMutableDictionary继承自NSDictionary


    NSMutableDictionary *mutableDic1 = [[NSMutableDictionary alloc] initWithObjectsAndKeys:@"v1",@"k1",@"v2",@"k2",@"v3",@"k3",@"v4",@"k4", nil];
    NSLog(@"mutableDict1: %@", mutableDic1);
    
    // 可变字典加入元素
    NSDictionary *dic4 = [NSDictionary dictionaryWithObject:@"v5" forKey:@"k5"];
    [mutableDic1 addEntriesFromDictionary:dic4];
    NSLog(@"mutableDict1: %@", mutableDic1);
    
    // 可变字典中直接添加新的
    [mutableDic1 setValue:@"object" forKey:@"key"];
    NSLog(@"mutableDict1: %@", mutableDic1);
    
    // 创建一个空的可变字典
    NSMutableDictionary *mutableDic2 = [NSMutableDictionary dictionary];
    [mutableDic2 setDictionary:mutableDic1];
    NSLog(@"mutableDict2: %@", mutableDic2);
    
    // 根据指定的key
    [mutableDic2 removeObjectForKey:@"k4"];
    NSLog(@"mutableDict2: %@", mutableDic2);
    
    // 删除一组key
    NSArray *keys = [NSArray arrayWithObjects:@"k1",@"k2", nil];
    [mutableDic2 removeObjectsForKeys:keys];
    NSLog(@"mutableDict2: %@", mutableDic2);

    // 删除所有的内容
    [mutableDic2 removeAllObjects];

### 遍历字典
    
    for (int index = 0; index < [mutableDic1 count]; index++) {
      NSString *object = [mutableDic1 objectForKey:[[mutableDic1 allKeys] objectAtIndex:index]];
      NSLog(@"object: %@", object);
    }
    
    // 快速枚举
    for (id key in mutableDic1) {
      NSString *object = [mutableDic1 objectForKey:key];
      NSLog(@"object: %@", object);
    }
    
    // 使用枚举类型
    NSEnumerator *enumerator = [mutableDic1 keyEnumerator];
    id key = [enumerator nextObject];
    while (key = [enumerator nextObject]) {
      id object = [mutableDic1 objectForKey:key];
      NSLog(@"%@", object);   
    }