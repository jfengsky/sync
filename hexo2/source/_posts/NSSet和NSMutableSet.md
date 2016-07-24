title: "NSSet和NSMutableSet"
---

### NSSet
  
    // 集合的创建
    NSSet *set1 = [NSSet setWithObjects:@"1",@"2", nil];
    NSSet *set2 = [[NSSet alloc] initWithObjects:@"2",@"3",@"4",@"5", nil];
    NSArray *array1 = [NSArray arrayWithObjects:@"7",@"8", @"10",@"11", nil];
    NSSet *set3 = [NSSet setWithArray:array1];
    NSSet *set4 = [NSSet setWithSet:set2];
    NSLog(@"set1: %@", set1);
    NSLog(@"set2: %@", set2);
    NSLog(@"set3: %@", set3);
    NSLog(@"set4: %@", set4);
    
    // 集合中元素的个数
    int count = [set2 count];
    NSLog(@"%d", count);
    
    // 将集合返回一个数组
    NSArray *objects = [set1 allObjects];
    NSLog(@"objects : %@", objects);
    
    // 获取集合中任意一个对象
    id object = [set2 anyObject];
    NSLog(@"%@", object);
    
    // 集合是否包含某个元素
    BOOL isContain = [set2 containsObject:@"3"];
    NSLog(@"%d", isContain);
    
    // 集合间是否存在交集
    BOOL isIntersect = [set1 intersectsSet:set2];
    NSLog(@"%d", isIntersect);
    
    // 集合是否另一个集合匹配
    BOOL isEqual = [set1 isEqualToSet:set2];
    NSLog(@"%d", isEqual);
    
    // 集合是否是另一个集合的子集
    BOOL isSub = [set1 isSubsetOfSet:set2];
    NSLog(@"%d", isSub);
    
    // 追加新的集合
    NSSet *set5 = [NSSet setWithObjects:@"one", nil];
    NSSet *appSet1 = [set5 setByAddingObject:@"two"];
    NSLog(@"%@", appSet1);
    
    NSSet *appSet2 = [set5 setByAddingObjectsFromSet: set1];
    NSLog(@"%@", appSet2);
    
    NSSet *appSet3 = [set5 setByAddingObjectsFromArray:array1];
    NSLog(@"%@", appSet3);

### NSMutableSet

    NSMutableSet *set6 = [NSMutableSet setWithObjects:@"1", @"2", @"a" , nil];
    NSMutableSet *set7 = [NSMutableSet setWithObjects:@"1", @"3", @"a" , nil];
    
    // 减去相同的元素
     [set6 minusSet:set7];
    
    // 取得两个集合的交集
     [set6 intersectSet:set7];
    
    // 两个集合的并集
     [set6 unionSet:set7];
    
    // 删除指定的对象
    [set6 removeObject:@"2"];
    
    NSLog(@"set6: %@", set6);