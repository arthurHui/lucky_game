import React, { useEffect, useState } from 'react'
import { CIRCLE_DEGREE, ROUND_COLORS } from './constants';

type Award = {
  id: Number,
  name: String,
  level: String,
  color: String
}

const useRoulette = () => {

  const canvasRef = React.useRef(null);

  const drawCircle = () => {
    let canvas = canvasRef.current
    let startRadian = -90 * Math.PI / 180
    if(!!canvas){
      let context = canvas.getContext('2d');
      context.save();
      // 新建一个路径,画笔的位置回到默认的坐标(0,0)的位置
      // 保证了当前的绘制不会影响到之前的绘制
      context.beginPath();
      // 设置填充转盘用的颜色,fill是填充而不是绘制
      context.fillStyle = '#fff';
      // 绘制一个圆,有六个参数,分别表示:圆心的x坐标,圆心的y坐标,圆的半径,开始绘制的角度,结束的角度,绘制方向(false表示顺时针)
      context.arc(211, 211, 211, startRadian, Math.PI * 2 + startRadian, false);
      // 将设置的颜色填充到圆中,这里不用closePath是因为closePath对fill无效.
      context.fill();
      // 将画布的状态恢复到上一次save()时的状态
      context.restore();
    }
  }

  const drawWheel = (awards : Array<Award>) => {
    let canvas = canvasRef.current
    if(!!canvas){
      let context = canvas.getContext('2d');
      let startRadian = -90 * Math.PI / 180
      let RadianGap = Math.PI * 2 / awards.length, endRadian = startRadian + RadianGap;
      for (let i = 0; i < awards.length; i++) {
        context.save();
        context.beginPath();
        // 为了区分不同的色块,使用随机生成的颜色作为色块的填充色
        context.fillStyle = awards[i].color;
        // 这里需要使用moveTo方法将初始位置定位在圆点处,这样绘制的圆弧都会以圆点作为闭合点
        context.moveTo(211, 211);
        // 画圆弧时,每次都会自动调用moveTo,将画笔移动到圆弧的起点,半径设置的比转盘稍小一点
        context.arc(211, 211, 201, startRadian, endRadian, false);
        context.fill();
        context.restore();
        // 开始绘制文字
        context.save();
        //设置文字颜色
        context.fillStyle = '#f00';
        //设置文字样式
        context.font = "18px Arial";
        // 改变canvas原点的位置,简单来说,translate到哪个坐标点,那么那个坐标点就将变为坐标(0, 0)
        context.translate(
          211 + Math.cos(startRadian + RadianGap / 2) * 201,
          211 + Math.sin(startRadian + RadianGap / 2) * 201
        );
        // 旋转角度,这个旋转是相对于原点进行旋转的.
        context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
        // 这里就是根据获取的各行的文字进行绘制,maxLineWidth取70,相当与一行最多展示5个文字
        this.getLineTextList(context, awards[i].name, 70).forEach((line, index) => {
          // 绘制文字的方法,三个参数分别带:要绘制的文字,开始绘制的x坐标,开始绘制的y坐标
          context.fillText(line, -context.measureText(line).width / 2, ++index * 25)
        });
        context.restore();
        // 每个奖品色块绘制完后,下个奖品的弧度会递增
        startRadian += RadianGap;
        endRadian += RadianGap;
      }
    }

  }

  const onClickStart = () => {

  }

  useEffect(()=>{
    drawCircle()
  },[])

  return {
    canvasRef,
    onClickStart
  }
}

export default useRoulette