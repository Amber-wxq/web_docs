# 需求
基础逻辑
1. 分割线为一种 Block 类型；
1. 分割线支持两种样式：实线和虚线；
1. 若遇到分栏，分割线需动态适配当前分栏的宽度
入口
1. 新建 Block 菜单中，引用选项的后面；
1. 支持 MD 语法：--- 或 ***
	


界面交互
	
1. 默认为实线样式；
1. 左侧 Block 把手位置，新增切换样式的按钮；
1. 点击切换样式的按钮，换成另一种样式，反复点击反复切换；

其他兼容
1. 表格内须支持分割线；
2. 通过 MD 语法或「/」添加；	
3. 分割线需动态适配当前单元格的宽度；

优缺点：
   一像素矩形
div：
    border 的方案 居中
    与文字间的距离可控(都可控)
    花样更多 使用div和background-image
hr:
    自身带高度 设置css要计算自身高度问题
    自带样式
    语义更好，保持语义和可访问性
Figma URL
	
参考imageBlock

# /Users/wxq/Desktop/psp/packages/app/src/pages/index.tsx
    分割线模块在视图中添加 视图加载
    块添加


# /Users/wxq/Desktop/psp/packages/image/src/block.tsx

#  /Users/wxq/Desktop/psp/packages/image/src/consts.ts
    
# /Users/wxq/Desktop/psp/packages/image/src/Context.tsx
  
# /Users/wxq/Desktop/psp/packages/components/src/Text/Text.tsx
可以抽出来md  但是不做
配置markdown
TextProps 
handleMarkdown
    
  'HORIZONTAL_LINE'
  horizontalLine
输出的text
mdtype horizontalLine
index.esm.js:1039 text handleMarkdown {start: '---', end: undefined, style: 'horizontalLine', startLength: 3}
index.esm.js:1040 text 

找冒出去函数：handleConvert
packages/text/src/Context.tsx
convert函数 报错 text不能转换为horizontalLine

context.block.convert(style, {
            properties: {
              ...properties
            }
          });
packages/editor/src/blocks/node.ts
convert(
        toBlockType: string,
        options?: {
            // 使用自定义model，使用 properties 不再调用 getExportBlockData
            properties?: Record<string, any>;
            // 传入exportBlockData 的 payload
            exportPayload?: Record<string, unknown>;
            // 传入convertBlockData 的 payload
            convertPayload?: Record<string, unknown>;
        }
    ): boolean;

packages/editor/src/index.ts
console.error(`${thisBlock.type} 不能转换为 ${toBlockType}`);
editor.convertMap[thisBlock.type]
//['order', 'bullet', 'quote', 'todo', 'heading1', 'heading2', 'heading3', 'page']
解决  在pages的index修改horizontalLineBlock的加载方式
 # /Users/wxq/Desktop/psp/packages/components/src/Text/constants.ts
  {
    type: 'HORIZONTAL_LINE',  //可以改成自己定义的type？
    reg: /^(-{3}|\*{3})$/,
    start: '---'
  },
# /Users/wxq/Desktop/psp/packages/menu/src/menuConfig.ts
入口 搜索菜单
addMenuList: 
 {
        name: ['tp', 'tupian', 'image'],
        title: '图片',
        blockType: 'image',
        iconType: 'icon-photo'
    },

 {
        name: ['yjbt', 'yijibiaoti', 'heading1'],
        title: '一级标题',
        blockType: 'heading1',
        iconType: 'icon-header1'
    },

待解决问题：icon样式

# /Users/wxq/Desktop/psp/packages/app/src/pages/topbar/actions/Notification/MessageList/TitleIcon/
iconType: 

TitleIcon.tsx
type：‘Divider'
discussionId 
# /Users/wxq/Desktop/psp/packages/menu/src/BlockMenu/index.tsx
左侧按钮
selectedBlocks
 this.set('properties.isDashed', false);
# /Users/wxq/Desktop/psp/packages/image/src/components/menu/index.tsx
图片悬浮按钮

# /Users/wxq/Desktop/psp/packages/todo/src/modifier.ts
按钮function类似todo 的check
更新组件属性的函数？
# packages/components/src/Button/index.tsx
按钮样式声明文件 通过ButtonProps改变样式

# packages/table/src/blockTypes/Context.tsx
表格支持的菜单
supportBlock配置
# packages/menu/src/BlockMenu/index.tsx
blockMenu 样式配置
selectedBlocks.length === 1 && selectedBlocks[0].leftMenuConfig?.invisible?.copy
      ? null
      : {
          title: '复制',
          callback: () => {
            document.execCommand('copy');
            message.success('复制成功');
          },
          iconType: 'icon-copy'
        },

selectedBlocks.length === 1
      ? {
          title: '复制链接',
          callback: () => {
            const renderNode = selectedBlocks[0];
            if (renderNode.leftMenuConfig?.handleCopyLink) {
              renderNode.leftMenuConfig.handleCopyLink(renderNode.block.id);
              return;
            }
            copy(`${location.href.replace(location.hash, '')}#blockId=${renderNode.block.id}`, {
              format: 'text/plain'
            });
            message.success('链接已复制');
          },
          iconType: 'icon-appendix'
        }
选中块，并且


properties 里的type 控制渲染
menu 通过改变properties里的type值进行改变组件渲染

模型结构
最重要的ImageBlock
    const ImageBlock: BlockType = {
    type: 'image', ✅
    View: Image as React.ComponentType, ✅
    destroy: () => {},
    create(this: BlockNode) {
        const url = this.get('properties.url');
        const image = new globalThis.Image();
        image.onload = () => {
        this.set('properties.width', image.width);
        this.set('properties.height', image.height);
        };
        image.src = url;
    },
    html2Block,✅
    block2Html✅
    };


MD语法 ---
	参考标题模块
    const businessConf = {
        supportMarkdown: true,
        className: styles.heading1TextContainer
        };

        .heading1-text-container {
            font-size: 30px;
            }

代码：
props 定义
    export type LeftMenuProps = {
    editor: Editor;
    defaultVisible?: boolean;
    left: number;
    top: number;
    renderNode: RenderNode;
    onVisibleChange?: (visible: boolean) => void;
    };
showAddMenu：
空editor前的加号按钮

{!isEmptyTextBlock && (
        <BlockMenu>
text非空时显示的按钮BlockMenu

运行自己改的代码
psp run horizontalLine
运行整个项目
psp run app


待解决：
icon✅
markdown ✅
left按钮✅
表格里支持分割线✅

插入后，光标定位到下一个text
分栏自适应宽度

psp表格：
  新建后，在没有输入过内容的单元格，输入‘、’或者‘/’，没有弹出menu
  在输入过内容的单元格输入‘、’或者‘/’，会弹出menu

psp 上传图片的组件直接删除（通过backspace），无法删除


注入cookie，注入的是psp环境，不是轻雀


