import React,{useState} from 'react';
import type { BlockProps } from '@psp/editor-react';
import {BlockType, BlockCopy, BlockNode} from '@psp/editor';
import styles from './block.less';
import { Business, BusinessText, BusinessComponentProps, defaultValue, normalize } from '@psp/text';

//block组件设计
export type Props=BlockProps;

//定义组件
function horizontalLine(props:BlockProps){
    const {block} = props;
    //表示 type为properties的值
    const {properties: {type}}  = block;

    const [isDashed,setIsDashed] = useState(false);

    changeType(type: enum) {
        block.set('properties.isDashed', type)
    }

    return(
        <div className={type === '' ?styles.dashedLine : styles.solidLine} >
            
        </div>
    )
}

//组件转化视图等函数
// useMemo 绑定className和参数
//复制是
function html2Block(
    domNode: HTMLElement,
    next: (domNode: HTMLElement) => BlockCopy[]
    ):BlockCopy[]|null{
        if(domNode.tagName==='hr'){
            const lineType=domNode.getAttribute('className');
            let blockData:BlockCopy={
                type:'horizontalLine',
                properties:{lineType},
                children:[]
            };
            return [blockData]
        }
        return null;
}
function block2Html(
    blockNodeList:BlockNode[],
    next:(blockNodeList:BlockNode[]) => string
    ):string{
      let htmlStr='';
      for(let blockNode of blockNodeList){
        if(blockNode.type==='horizontalLine'){
            const {lineType} =blockNode.properties;
            htmlStr+= `<div class='${lineType}' ></div>`;
        }
      }  
      return htmlStr;
    }
//修改样式
function changeType(){
    block.set('properties.isDashed', )
}
//const { blockIds } = useOperationContext();
//   //要修改blockIds  要用context里定义的方法修改
//   return (
//     <div className={styles.blockIds}></div>

//组件块-- 模型设计
// 要有的参数 type View 两个函数 html2Bllock  block2Html
const horizontalLineBlock:BlockType={
    type: "horizontalLine",

    View: horizontalLine as React.ComponentType,
    destroy:()=>{},
    html2Block,
    block2Html
};

//导出组件块
export default horizontalLineBlock;