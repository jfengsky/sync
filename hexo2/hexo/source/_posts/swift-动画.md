title: "swift 动画"
date: 2015-09-21 14:43:50
tags: 动画
categories: swift
---
### 动画关键方法 <code>animateWithDuration</code>
    
    animateWithDuration(
      动画持续时间: Double,
      动画延迟执行时间: Double,
      弹性参数: Double,
      弹性起始值: Double,
      运动曲线: CurveEaseInOut(平滑),
      动画执行方法: Func,
      执行完回调方法: Func
    )


例子: 缩放运动变色的红球
  
    let redBall = UIView(frame: CGRectMake(50, 50, 100, 100))
    redBall.backgroundColor = UIColor.redColor()
    
    // 设置圆角
    redBall.layer.cornerRadius = 50
    
    self.view.addSubview(redBall)
    
    // 创建缩放动画
    UIView.animateWithDuration(
      0.5, 
      delay: 0,
      usingSpringWithDamping: 0.3,
      initialSpringVelocity: 0.2, 
      options: UIViewAnimationOptions.CurveEaseInOut, 
      animations: { () -> Void in
      
        // 只是放大2倍
        // redBall.transform = CGAffineTransformMakeScale(2, 2)
        
        // 只是位移动画
        // redBall.transform = CGAffineTransformMakeTranslation(158, 58)
        
        
        // 两个动画组合在一起
        redBall.transform = CGAffineTransformConcat(

          // 缩放
          CGAffineTransformMakeScale(2, 2), 

          // 位移
          CGAffineTransformMakeTranslation(158, 58)
        )
        
        // 颜色变绿
        redBall.backgroundColor = UIColor.greenColor()
      
      }, 
      completion: nil
    )