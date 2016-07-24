title: "swift 模糊效果"
date: 2015-09-21 16:10:10
tags: 模糊效果
categories: swift
---
  
    // 创建一个背景图片在视图上
    let imgView = UIImageView(image: UIImage(named: "test.png"))
    imgView.frame = CGRectMake(0, 0, view.frame.width, view.frame.height)
    self.view.addSubview(imgView)
    
    // 创建模糊效果实例, 除了light, 还有其它各种模糊效果
    let blurEffect = UIBlurEffect(style: .Light)
    
    // 创建模糊视图实例
    let blurView = UIVisualEffectView(effect: blurEffect)
    
    // 模糊实例位置
    blurView.frame.size = CGSize(width: view.frame.width, height: view.frame.height)
    
    self.view.addSubview(blurView)