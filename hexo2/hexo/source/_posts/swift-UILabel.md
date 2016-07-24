title: "swift UILabel"
date: 2015-08-11 13:22:59
tags: UILabel
categories: swift
---

        // 设置label位置和大小
        let textLabel = UILabel(frame:CGRectMake(0, 30, 300, 30));

        // 设置文本
        textLabel.text = "测试label";
        
        // 设置背景颜色
        var redColor = UIColor(red:1.0,green:0,blue:0,alpha:1.0);
        textLabel.backgroundColor = redColor;
        
        // 设置文本对其方式
        textLabel.textAlignment = NSTextAlignment.Center;
        
        // 设置字体颜色
        textLabel.textColor = UIColor.blueColor();
        
        // 设置字体和大小
        textLabel.font = UIFont(name:"Thonburi",size:30);
        
        let Color1 = UIColor(red:255,green:255,blue:0,alpha:1);
        
        
        // 把UILabel放入视图
        self.view.addSubview(textLabel)
