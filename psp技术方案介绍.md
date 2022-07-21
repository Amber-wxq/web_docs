# block
一个block是一个具备与服务端双向同步能力、协同能力的JSON Object（实体）
解读：
    创建一个block，然后调用block的api对block进行操作，block的变更实时同步到服务端，其他人对block进行变更导致服务端的block变更后，也会同步到本地的block，block是字段级的协同，即非同一字段的变更并不会冲突，以及对数组支持细粒度的更新。
## block的数据结构
一个block必须包含 id version 两个字段 其他字段可以任意扩展
    {
        "id": string;
        "version": number;
    }
id为uuid，全局唯一，version为递增的版本号

## 渲染层
一个block只是一个JSON Object 不强制有渲染层，是否有渲染层自己定义

# block app
包含一个block的集合及对这个集合的管理
能力：负载block的加载、保存、提供block相关的api 暴露block相关的事件
record stack： block app中所有block的创建、更新、删除等操作会记录在stack中
# block editor是什么
基于 block 的 editor 是一个特殊的 block app，一个具有光标选区、撤销重做、复制粘贴等功能的block app。

# block api

## methods
    prepend(...blockNodes: BlockNode[]): void;
    append(...blockNodes: BlockNode[]): void;
    before(...blockNodes: BlockNode[]): void;
    after(...blockNodes: BlockNode[]): void;
    remove(): void;
    contains(blockNode: BlockNode): boolean;
    getRootNode(): BlockNode;
    hasChildNodes(): boolean;
    set(path: path, value: any): void;
    get(path: path): any;
    on: EventEmitter['on'];
    off: EventEmitter['off'];
    once: EventEmitter['once'];
    sync: () => void;
    unsync: () => void;
## property
    parentNode: BlockNode | null;
    nextSibling: BlockNode | null;
    nextSiblings: BlockNode[] | [];
    previousSibling: BlockNode | null;
    previousSiblings: BlockNode[] | [];
    firstChild: BlockNode | null;
    lastChild: BlockNode | null;
    path: BlockId[];
    dom: HTMLDivElement | null;
## event
    create?: (...args: any[]) => void,
    load: (...args: any[]) => void,
    beforeChange?: (...args: any[]) => void,
    change?: (...args: any[]) => void,
    beforeUpdate?: (...args: any[]) => void,
    update?: (...args: any[]) => void,
    render?: (...args: any[]) => void,
    beforeSync?: (...args: any[]) => void,
    sync?: (...args: any[]) => void,
    destroy?: (...args: any[]) => void,

# block editor api

## methods
createBlock(type: string, options?: CreateBlockOptions): BlockNode
define(type: string, options: BlockDefineOptions)
loadBlock(blockId: BlockId, deep = false)
getBlockById(blockId: BlockId):BlockNode
setRootBlock(block: BlockNode):BlockNode
on: EventEmitter['on'];
off: EventEmitter['off'];
once: EventEmitter['once'];
preloadPage
registerHotKey
clone(options: Partial = {}): Editor
registerAction(action: ActionType)
dispatchAction(action: Action)
getDomByBlockId(blockId: BlockId): HTMLDivElement | undefined
importData(blockData: ImportBlockData)
exportData(blockId: BlockId)
## property
readonly
rootBlockId
spaceId
loaded
dom2BlockIdMap
blockId2DomMap
dom2RenderNodeMap
container
## event
change: () => void,
load: () => void, // 类似于window的load事件
'block-load': (blockId: BlockId) => void,
'block-create': (block: BlockNode) => void,
'block-remove': (block: BlockNode) => void,

# 用法
定义新block
    const ImageBlock:BlockType={
        type:'image',
        //别名
        View:Image as React.ComponentType,
        destroy: () => {},
        html2Block,
        block2Html
    };

创建一个block
    const   textBlock=editor.createBlock('text');
加到末尾
    pageBlock.append(textBlock);
加到开始
    pageBlock.perpend(textBlock);
加到某个block后
    imageBlock.after(textBlock);
加到某个block前
    imageBlock.before(textBlock);
删除block
    textBlock.remove();
移动block
    blockA.append(blockB);
加载block
    editor.loadBlock（blockId ）;
React组件内使用block
    const block = useBlock(blockId);
    useBlock会去加载block，加载完成之后React组件会重新渲染。
渲染一个Block
    <RenderBlock blockId={id} />;
通  过blockId找到对应BlockType的View进行渲染。