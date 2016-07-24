title: "NSString"
categories: swift
---

### NSString对象的一些方法总结
* NSString对象一旦被创建就不可以修改.如果需要一个可以更改的字符串对象,需要创建NSMutableString实例


    /*
     *  创建字符串
     */
    // 创建一个字符串常量
    NSString *string1 = @"这是一个字符串常量";

    // 创建一个空的字符串
    NSString *string2 = [[NSString alloc] init];  // 实例方法创建
    NSString *string3 = [NSString string];        // 类方法创建

    // 快速创建一个字符串
    NSString *string4 = [[NSString alloc] initWithString: @"abc"];   // 实例方法创建
    NSString *string5 = [NSString stringWithString:@"xyz"];          // 类方法创建

    // 创建一个格式化的字符串
    NSString *string6 = [[NSString alloc] initWithFormat:@"整数:%d", 10];  // 实例方法创建
    NSString *string7 = [NSString stringWithFormat:@"浮点数:%f", 10.8];      // 类方法创建

    /*
     *  比较字符串是否相等
     */
    if ([string4 isEqualToString:string5]) {
        NSLog(@"same");
    } else {
        NSLog(@"different");
    }

    /*
     *  测试字符串是否为同一对象
     */
    if (string4 == string5) {
        NSLog(@"same pointer");
    } else {
        NSLog(@"different pointer");
    }

    /*
     *  比较字符串的大小
     *  caseInsensitiveCompare 升序
     *  localizedCompare
     */
    NSComparisonResult result = [string4 caseInsensitiveCompare:string5];

    /**
     *  求字符串的长度
     */
    NSLog(@"%d", [string4 length]);

    /**
     *  字符串的转换
     */
    [string4 uppercaseString];   // 字母都大写
    [string4 lowercaseString];   // 字母都小写
    [string4 capitalizedString]; // 首字幕大写

    /**
     *  字符串转化为基本数据类型
     */
    float floatNumber = [string7 floatValue];  // 转化为浮点数

    /**
     * 把字符串转化为数组
     */
    NSString *string8 = @"abc def xyz";
    NSArray *array1 = [string8 componentsSeparatedByString:@" "];
    NSLog(@"%@", array1);

    /**
     * 字符串的截取
     */
    NSString *string9 = @"abcde";
    NSString *subString1 = [string9 substringToIndex:3];   // 截取到哪个位置 => abc
    NSString *subString2 = [string9 substringFromIndex:3]; // 从哪个位置开始截取 => de
    NSRange range;
    range.location = 1;
    range.length = 3;
    NSString *subString3 = [string9 substringWithRange:range];
    NSLog(@"%@", subString3);

    /**
     * 字符串的拼接
     */
    NSString *string16 = @"abc";
    NSString *string17 = @"xyz";
    
    NSString *addString1 = [[NSString alloc] initWithFormat:@"%@%@", string16, string17];
    NSString *addString2 = [string16 stringByAppendingFormat:@"%@", string17];
    NSString *addString3 = [string16 stringByAppendingString:string17];
    NSLog(@"%@", addString1);
    NSLog(@"%@", addString2);
    NSLog(@"%@", addString3);
        
    /**
     * 查找字符串
     */
    NSString *link = @"abcdefgtargetxyz";
    NSRange range1 = [link rangeOfString:@"target"];
    NSLog(@"%@", NSStringFromRange(range1));
    if(range1.location != NSNotFound) {
        NSLog(@"founded");
    }
    
    /**
     * 可变字符串
     */
    
    // 插入
    NSMutableString *mutableString1 = [[NSMutableString alloc] initWithFormat:@"abc"];
    [mutableString1 insertString:@"..xyz.." atIndex:1];
    NSLog(@"%@", mutableString1);
    
    // 替换
    [mutableString1 replaceCharactersInRange:NSMakeRange(1, 2) withString:@"efg"];
    NSLog(@"%@", mutableString1);
    
    // 删除
    [mutableString1 deleteCharactersInRange:NSMakeRange(0, 3)];
    NSLog(@"%@", mutableString1);
