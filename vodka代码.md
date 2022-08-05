



# vodka代码

```
//src/api/render.ts
config({hideToolbar:true})

//src/assets/toolbar/toobar-icon.svg
toolbar 样式图标设计

src/editor/controller/mouse/mousehandler1.ts
appView
 644 tableMenu.setComponentVisible(true);
 getIsMoveOnLink  651
 772
 handleMouseMoveOnParagraph_(e: any, editBarManager: any, isInTable: any, location: any) {
    const selection = window.vodkaapp.currentModelState_.getSelectionModel().getSelection();
    // 有选中内容则不触发滑动到段落上设置ParagraphRange
    if (selection.getSelectedRanges().length) return;
    // 只有inline类型的location才可以使用location操作
    if (
      location &&
      location.getType() === office_text_protocol_Location.Type.INLINE &&
      this.setParagraphRange_(location, editBarManager)
    ) {
      isInTable
        ? this.setPluginComponentPosInTableCell_(e, editBarManager, location)
        : this.setPluginComponentPos_(location, editBarManager);
    }
  }
  
  editBarManager.getComponentVisible() 868
```

  location.getType()

appView

  editBarManager.setComponentVisible(false);





createAbsoluteElementAtEntity

//  src/editor/controller/mouse/PointerState.ts

```
PointerState.Type   34
PointerState.Type = {
  NONE: 0,
  DRAGGING: 1,
  MOUSE_SELECTING: 2,
  DOUBLECLICK_MOUSE_SELECTING: 3,
  TRIPLECLICK_MOUSE_SELECTING: 4,
  MOUSE_DOWN_ON_SELECTION: 5,
  TOUCHING: 6
};
```



import { EditType } from '@editor/model/edits1/EditType';

import { EditBarInLineManager } from '@editor/features/editBar/EditBarInLineManager';

```
class EditBarInLineManager extends BaseFramePluginManager {
  declare baseDispose: any;
  declare createComponent: any;
  declare componentParentDom_: any;
  declare dom_: any;
  declare eventHandler_: any;
  declare componentProviders_: any;
  declare component_?: any;
  declare switchHeight: number;
  declare isVisible_: boolean;
  declare currentParagraph_?: any;
  declare hintedParagraphs_: any[];
  declare HINT_COLOR: any;
  declare hintOverlay_?: any;
  declare modelState_: any;
  declare static instance_: EditBarInLineManager;
  declare static getInstance: () => EditBarInLineManager;
  declare static type: any;
  declare static ClassName: any;
  declare $appView: any;
  
  
  126
   handleSelectionChange_(e?: any) {
    if (!office_doclist_util.canDoAnyOperationToFrameComponents() || e.isFromCollaborator) return;

    if (e.target.getSelectionModel().getSelection().getSelectedRanges().length) {
      // 有选区，隐藏小球
      EditBarInLineManager.getInstance().setComponentVisible(false);
    }
  }
  左侧=的bar
  
  230
  handleHover
```





src/editor/controller/texteventtarget/TextEventTargetFocusManager.ts

```
 this.updateStateFromBrowser(newState);
 const newState =
      userAgent.IE && !userAgent.isVersionOrHigher('10.0') && this.isWindowFocused()
        ? FocusState.CHROME
        : FocusState.NOTHING;
    this.updateStateFromBrowser(newState);
```



//src/editor/controller/contextmenu/contextmenu.ts

```
contextmenu.registerDefaultMenu = function (menuManager: any) {
  menuManager.defineMenu(
    MenuId.MENU_ROOT,
    [
      menuManager.inlineMenu(MenuId.VOICE_CORRECTIONS),
      null,
      menuManager.inlineMenu(MenuId.SPELLCHECK),
      null,
      menuManager.inlineMenu(MenuId.AFTER_SPELLCHECK),
      null,
      menuManager.inlineMenu(MenuId.CLIPBOARD),
      null,
      menuManager.inlineMenu(MenuId.REFERENCE),
      null,
      menuManager.inlineMenu(MenuId.AFTER_REFERENCE),
      null,
      menuManager.inlineMenu(MenuId.LINK),
      null,
      menuManager.inlineMenu(MenuId.AFTER_LINK)
    ],
    undefined,
    new DiagnosticsDataBuilder().setEntryPoint(EntryPoint.CONTEXT_MENU).build()
  );
```



runHook

```
 handleEditableChange = () => {
    this.runHook('editableChange', { editable: isEditable() });
  };
```



类型判断:

```
ENTITY_TYPE
```



Hover 分割线bar

```
renderQuickBar
如果鼠标hover在实体的时候，需要渲染quickBar，实现此方法即可
renderQuickBar(container: HTMLDivElement) {
    ReactDOM.render(
      <Provider store={store}>
        <Bar entityId={this.getEntityId()} />
      </Provider>,
      container
    );
  }
```



```
import SFCQuickBar from '@features/vodka-plugin/components/SFCQuickBar';
```

```
export class Bar extends React.Component<Props, IBarState> {
  public state: IBarState = {
    visible: true
  };
  
  Bar.state.visible
```

添加新插件：

```
src/plugin-features/index.ts
```

如何排除的，看样式，或许可以区分type

```
 // 排除 link 和 inlineCode
  return ![start, end].some(index => {
    return editor.getStyle('link', index)?.link || editor.getStyle('text', index)?.inlineCode;
  });
```



- 获取鼠标hover和选中状态

```typescript
相关
mouse focus selection 
editor

比如在输入空格实现markdown时，需要检测光标所在段落的内容是否符合markdown的规则
这样获取光标处的textStyle、某个段落的样式等都可以基于上述基础API + 其他API 完成。
// good
 const cursorIndex = editor.getCharIndexAtCursor();
 const paragraphRange = editor.getParagraphRange(cursorIndex);
 const text = editor.sliceText(paragraphRange.start, paragraphRange.end);
 
 import { getAppView, getModel } from './common';
 import { ContainerView } from '@editor/view/base/ContainerView';
//src/api/editor/model/entity.ts
getEntityId() {
    return this.entityId;
  }
  /**
   * 如果鼠标hover在实体的时候，需要渲染quickBar，实现此方法即可
   * @param container quickBar内容渲染的容器
   */
  renderQuickBar?(container: HTMLDivElement, updatePosition: (width: number) => void): void;
  
  /** 是否是块状应用 （独占一行） */
  getIsBlockEntity() {
    return this.display === 'block';
  }
  
export function generateEntityId() {
  return IdUtil.generateId(IdPrefix.VODKA);
}
export function getEntityIdAt(index: number): string | undefined {
  const entityIds = Object.keys(
    vodkaapp.currentModelState_.model_.getEntityMapForRange(index, index)
  );
  return entityIds[0];
}

//type问题src/editor/controller/mouse/mousehandler1.ts
 beforeContextMenu(e: any) {
    // 若当前位置是图片，选中该图片, 若是附件，则选中附件
    const location = CoordinateUtil.findCursorLocationForClientCoordinate({
      appView: this.getAppView(),
      clientCoordinate: e
    });
    if (location.getType() !== office_text_protocol_Location.Type.INLINE) return;
    const locationIndex = location.getSpacerIndex(),
      selectableEntity = EmbeddedEntityUtil.getSelectableEntityForLocation(
        this.modelState_.getModel(),
        location
      );
    if (
      !this.isTypeBySelectableEntity_(selectableEntity, EmbeddedObject.Type.IMAGE) &&
      !this.isTypeBySelectableEntity_(selectableEntity, EmbeddedObject.Type.ATTACHMENT)
    )
      return; // 若该实体没被选中，则选中该实体
   
    const selectedRanges = this.modelState_.getSelectionModel().getSelection().getSelectedRanges();
    let isEntitySelected = false;

    for (let i = 0, selectedRange: any; (selectedRange = selectedRanges[i]); i++) {
      if (locationIndex <= selectedRange.end && locationIndex >= selectedRange.start) {
        isEntitySelected = true;
        break;
      }
    }
	if (!isEntitySelected) {
      const newSelection = Selection.fromLocationAndRanges(location, [
        new Range(locationIndex, locationIndex)
      ]);
      this.modelState_.applySelection(newSelection, false, true); // 若在视野外，移入视野
    }
  }
   
```



- 获取toolbar控制权

```typescript
相关 toolbar 
view
layout quickbar  entityId

//src/editor/features/attachment/embeddedentityattachmentrender.ts
    this.setQuickBarVisible_ = this.setQuickBarVisible.bind(this);
    this.isBarHovered = false;

setQuickBarVisible(visible: any) {
    this.reactComponent_ &&
      this.reactComponent_['setQuickBarVisible'] &&
      this.reactComponent_['setQuickBarVisible'](visible);
  }
通过classname，看那个选中
  selectHandler_() {
    this.getElement()?.classList.add('attachment-box__selected', 'entity-container--selected');
  }


  onBarHoverChange(isBarHovered: boolean) {
    this.isBarHovered = isBarHovered;
    if (isBarHovered) {
      this.getElement()?.classList.add('entity-container--bar-hover');
    } else {
      this.getElement()?.classList.remove('entity-container--bar-hover');
    }
  }

 isSelected_() {
    const selection = this.modelState_.getSelectionModel().getSelection();
    const spaceIndex = editor.getEntityIndexById(this.entityId_);
    const selectedRange = selection.getCursorSelectedRange();
    return (
      selectedRange &&
      spaceIndex >= selectedRange.getStart() &&
      spaceIndex <= selectedRange.getEnd()
    );
  }

  isSelectedOnly_() {
    const modelState_ = this.context_.getModelState();
    const selection = modelState_.getSelectionModel().getSelection();
    const entity = EmbeddedEntityUtil.getEmbeddedEntity(modelState_.getModel(), selection);
    return entity && entity.getId() === this.entityId_;
  }

  disposeInternal() {
    this.eventHandler_.unlisten(
      this.modelState_,
      EventType.SELECTION_CHANGE,
      this.handleSelectionChange_
    );
    const entityList = AttachmentHelper.getEntityListByAttachmentId(this.attachmentId_);
    this.removeSelectHandler_();
    this.selectedOnly = false;
    if (this.reactComponent_) {
      this.reactComponent_.isAlive = false;
      this.reactComponent_['updateStates']({ selectedOnly: false, quickBarIsVisible: false });
      this.reactComponent_.componentWillUnmount();
      this.reactComponent_['unmountComponentAtNode'](this.getParentDom());

      if (entityList && entityList.length === 1) {
        this.reactComponent_['disposeUpload'](this.attachmentId_);
      }
    }

    this.reactComponent_ = null;
    AttachmentHelper.setAttachmentIdEntityIdMap(this.attachmentId_, this.entityId_);
    super.disposeInternal();
  }

//src/editor/features/codeblock/CodeBlockManager.ts
 handleSelectionChange_(e?: any) {
    const selectedCodeBlockEntity = this.getSelectedCodeBlock(this.selectionModel_.getSelection());
    const that = this;

    if (!selectedCodeBlockEntity) {
      this.forEach(function (renderer: any) {
        renderer.setSelected(false); // 说明此代码块已被删除，设置其quickBar为false

        if (!that.getModel().getEntity(renderer.getEntityId())) {
          renderer.setQuickBarVisible(false);
          that.clearRenderer(renderer);
        }
      });
    }
  }
  //src/editor/features/codeblock/EmbeddedCodeBlockRenderer.ts
   setQuickBarVisible(visible: any) {
    this.reactComponent_ &&
      this.reactComponent_['setQuickBarVisible'] &&
      this.reactComponent_['setQuickBarVisible'](visible);
  }

//src/editor/features/customEmbeddedObject/CustomEmbeddedObjectRenderer.ts
  handleSelectionChange = () => {
    if (this.element_ && this.entityContainer) {
      const className = `entity-container--selected`;
      if (this.isSelected()) {
        this.entityContainer.classList.add(className);
        if (this.isSelectedOnly()) {
          this.selectedOnly = true;
          this.renderQuickBarIfNeeded();
        }
      } else {
        this.entityContainer.classList.remove(className);
        this.selectedOnly = false;
        this.delayDestroyQuickBarIfNeeded();
      }
    }
  };

canShowQuickBar() {
    return (
      !isMobile && !editor.isInFullScreen() && !editor.isInRevisions() && !editor.isInTranslation()
    );
  }

handleMouseEnter = () => {
    // this.getInstance()?.onMouseEnter?.(event);
    this.hasHovered = true;
    // this.renderQuickBarIfNeeded(event.target as HTMLDivElement);
    this.renderQuickBarIfNeeded();
  };
  handleMouseLeave = () => {
    // this.getInstance()?.onMouseLeave?.(event);
    this.hasHovered = false;
    this.delayDestroyQuickBarIfNeeded();
  };

 isSelectedOnly() {
    const model = this.modelState_.getModel();
    const selection = this.modelState_.getSelectionModel().getSelection();
    const entity = EmbeddedEntityUtil.getEmbeddedEntity(model, selection);
    return !!(entity && entity.getId() === this.entityId_);
  }

//src/editor/features/discussion/toc/HtmlAutogenRegionRenderer.ts

// // toc交互由click转为hover出quickbar
  // isCursorInView_() {
  //   const modelState = this.viewContext_.getModelState();
  //   const cursorSpacerIndex = modelState.getSelectionModel().getCursorSpacerIndex();
  //   const startIndex = this.viewContext_.getSpacerIdTracker().getIndex(this.getId());
  //   const endIndex = modelState
  //     .getModel()
  //     .getSpacers()
  //     .indexOf(Spacers.Marker.AUTOGEN_END, startIndex);
  //   return cursorSpacerIndex > startIndex && cursorSpacerIndex < endIndex;
  // }

//src/editor/features/discussion/toc/TocQuickBar.tsx
 this.containerElement_.addEventListener('mouseenter', () => {
      this.isEntityHovered = true;
      this.changeBarStatusIfNeed();
    });
this.containerElement_.addEventListener('mouseleave', () => {
      this.isEntityHovered = false;
      this.changeBarStatusIfNeed();
    });
isCursorInView_() {
    const modelState = this.viewContext_.getModelState();
    const cursorSpacerIndex = modelState.getSelectionModel().getCursorSpacerIndex();
    const startIndex = this.viewContext_.getSpacerIdTracker().getIndex(this.id_);
    const endIndex = modelState
      .getModel()
      .getSpacers()
      .indexOf(Spacers.Marker.AUTOGEN_END, startIndex);
    return cursorSpacerIndex > startIndex && cursorSpacerIndex < endIndex;
  }
  changeBarStatusIfNeed() {
    
    //src/editor/features/embedded/EmbeddedObjectIframeRenderer.tsx
    this.quickBarElement.element.addEventListener('mouseenter', () => {
      this.isBarHovered = true;
      this.getElement()?.classList.add(barHoverCls);
      this.changeBarStatusIfNeed();
    });
    this.quickBarElement.element.addEventListener('mouseleave', () => {
      this.isBarHovered = false;
      this.getElement()?.classList.remove(barHoverCls);
      this.changeBarStatusIfNeed();
    });
    changeBarStatusIfNeed
    
    //src/editor/features/image/ImageBarHelper.tsx
     this.isBarHovered = false;
    this.barVisible = false;
    this.isEntityHovered = false;
    this.containerElement_.addEventListener('mouseenter', () => {
      this.isEntityHovered = true;
      this.changeBarStatusIfNeed();
    });
    this.context_ = context;
    this.modelState_ = this.context_.modelState_.modelState_ || this.context_.modelState_;
    this.containerElement_.addEventListener('mouseleave', () => {
      this.isEntityHovered = false;
      this.changeBarStatusIfNeed();
    });
    
     // 拖拽期间隐藏imageBar
    this.eventHandler_.listen(
      window,
      EmbeddedObjectDragManager.EventType.DRAG_START,
      this.handleDragStart
    );
    this.eventHandler_.listen(
      window,
      EmbeddedObjectDragManager.EventType.DRAG_END,
      this.handleDragEnd
    );
    this.imageQuickBarAttr = {
      imageQuickBarWidth: 0
    };
    
    //isSelect输出的entity
    InlineEntity {propertyNames_: PropertyNames, immutable_: false, type_: 'inline', id_: 'vodka.7ndslmmpgxas', embeddedObject_: office_text_protocol_Image}
    
    ImageBar 有selected 状态
    
    //src/editor/features/imageBar/ImageBarManager.ts
    const info = this.getEmbeddedExtInfo_();
    const chartType = info.type;

    switch (chartType) {
      case office_text_protocol_Image.FLOWCHART:
        var realUrl = this.getFlowchartUrl_(); /
        
        const modelState = window.vodkaapp.uiContext_.getModelState();
    const location = this.embeddedLocation_; // var info = this.getEmbeddedExtInfo_();

    const locationType = location.getType();

    if (locationType == office_text_protocol_Location.Type.INLINE) {
      
      //对bar修改的远程命令 可能
       TableBarManager.getInstance().setComponentVisible(false);
```

文档内部简易toolbar管理器

```tsx
//src/editor/features/editBar/EditBarInLineManager.ts
 setComponentVisible(isVisible: any) {
    // 普通段落中的锚链接和表格快捷菜单互斥
    const paragraphRange = ParagraphRangeUtil.getCurrentParagraphRange();
    const tableMenuVisible = TableMenuStates.getTableMenuVisible();

    if (
      isVisible &&
      paragraphRange &&
      paragraphRange.start &&
      tableMenuVisible &&
      !TableUtil.isSpacerInTable(
        this.getModelState_().getModel().getSpacers(),
        paragraphRange.start
      )
    ) {
      return;
    } // 直接连通react component，故优化的部分交给react

```



**进展**

改if条件可以控制什么时候显示bar  主要是barVisible

`this.selected` 选中

`this.isEntityHovered` hover

```
  changeBarStatusIfNeed() {
    if ((this.selected || this.isEntityHovered || this.isBarHovered) && inClientDocument(this.containerElement_)) {
      this.createBar();
      this.barVisible = true;
    } else {
      this.barVisible = false;
      setTimeout(() => {
        !this.barVisible && this.disposeBar();
      }, 100);
    }
  }
  
    changeBarStatusIfNeed() {
    if ((this.isEntityHovered || this.isBarHovered) && inClientDocument(this.containerElement_)) {
      this.createBar();
      this.barVisible = true;
    } else {
      this.barVisible = false;
      setTimeout(() => {
        !this.barVisible && this.disposeBar();
      }, 100);
    }
  }
```



插件HOOK

```
onMouseMove: (event: MouseMoveEvent) => void;
  onMouseEnter: (event: MouseEnterEvent) => void;
  onMouseLeave: (event: MouseLeaveEvent) => void;
  onMouseDown: (
   onClick: 
```





插件 一加载，listen mouse行为，获取选中的或者hover的entity，判断类型等



图片 entityType

```
srcDefined_: true
src_: "/image/api/convert/loadimage?id=742826331626330989fcABJXhpWoCk72oefEIOSemww"
subType_: 0
type_: 0
uploadFailDefined_: true
uploadFail_: false
widthDefined_: true
width_: 382.5
```

```
srcDefined_: true
src_: null
subType_: 0
type_: 0
uploadFailDefined_: true
uploadFail_: false
widthDefined_: true
width_: 405.00285020584823
[[Prototype]]: EmbeddedObject
```

readApp

```
meta: "{}"
propertyNames_: PropertyNames {nonInheritablePropertyNames_: Array(15), inheritablePropertyNames_: Array(0), companionInheritPropertyNames_: Array(0), nonCompanionPropertyNames_: Array(15), allPropertyNames_: Array(15), …}
subType: "readApp"
supportFind: ƒ ()
type_: 8
update: ƒ (propertyMap, opt_strategy)
widthDefined_: false
width_: 0
[[Prototype]]: EmbeddedObject
```

Event:

```
isInLink: false
isInParagraph: true
isInTable: false
location: InlineLocation
afterPreviousSpacer_: false
shiftedByInserts_: false
spacerIndex_: 389
type_: 0
[[Prototype]]: office_text_protocol_Location
```

table

```
appView: VodkaViewImpl {eventTargetListeners_: ListenerMap, actualEventTarget_: VodkaViewImpl, dom_: _class, rightToLeft_: null, context_: Context, …}
clientEvent: BrowserEvent {type: 'click', target: div.vodka-lineview, currentTarget: div#vodka-appview-editor.vodka-appview-editor, propagationStopped_: false, defaultPrevented: false, …}
cursorCoordiante: Coordinate {x: 438, y: 4331}
isInLink: false
isInParagraph: true
isInTable: true
location: InlineLocation
afterPreviousSpacer_: false
shiftedByInserts_: false
spacerIndex_: 1079
type_: 0
```

img

```
appView: VodkaViewImpl {eventTargetListeners_: ListenerMap, actualEventTarget_: VodkaViewImpl, dom_: _class, rightToLeft_: null, context_: Context, …}
clientEvent: BrowserEvent {type: 'click', target: div#vodka-zoom-outer.vodka-zoom-outer, currentTarget: div#vodka-appview-editor.vodka-appview-editor, propagationStopped_: false, defaultPrevented: false, …}
cursorCoordiante: Coordinate {x: 492, y: 5495}
isInLink: false
isInParagraph: false
isInTable: false
location: InlineLocation
afterPreviousSpacer_: false
shiftedByInserts_: false
spacerIndex_: 1155
type_: 0
```

readapp

```
ppView: VodkaViewImpl {eventTargetListeners_: ListenerMap, actualEventTarget_: VodkaViewImpl, dom_: _class, rightToLeft_: null, context_: Context, …}
clientEvent: BrowserEvent {type: 'click', target: div.vodka-plugin-read-app.vodka-block-entity-with-custom-overlay.disable-editor-click-h5-bottombar.…, currentTarget: div#vodka-appview-editor.vodka-appview-editor, propagationStopped_: false, defaultPrevented: false, …}
cursorCoordiante: Coordinate {x: 756, y: 4124}
isInLink: false
isInParagraph: true
isInTable: false
location: InlineLocation
afterPreviousSpacer_: false
shiftedByInserts_: false
spacerIndex_: 1071
type_: 0
```







## 插件化设计

修改的代码写在插件里

基于编辑器提供的扩展点和API来实现功能

暂时起名：ToolbarPlugin

基于插件机制开发功能，不再接触编辑器的底层概念（operation。mutation。commands ...）

//plugin-core 文件夹里写

基于插件机制实现行内代码

### API和实现

### 定义插件

```tsx
import { editor, leftToolbar, Plugin } from '@src/api';
import type { PluginCreator } from '@src/api';

import { type, Latex } from './entity';
import intl from '@src/internationalization/intl';

const { EditorState } = editor;

const LatexPlugin: PluginCreator = options => {
  const plugin: Plugin = {
    pluginName: 'latex',
    onInit: () => {
      
    }
  };
  return plugin;
};

export default LatexPlugin;
```



### 注册插件

```
editor.applyPlugin(LatexPlugin)
```



### 执行钩子

```
handleBrowserCopy_(e) {
    vodkaapp.pluginManager_.runHook('beforeCopy', e.getBrowserEvent());
    if (e.getBrowserEvent().defaultPrevented) {
      return;
    }
    logger.copy.log('BrowserAppClipboard', 'handleBrowserCopy_');
    if (
      !window.vodkaapp.store.getDocInfoState().canCopy &&
      !window.vodkaapp.getDocumentInfo().isEditable()
    ) {
      logger.copy.log('BrowserAppClipboard', 'handleBrowserCopy_ disabled');
      ToastBridge.toastInstance.toast(
        'showEditorToast',
        'error',
        intl.t('复制失败，复制功能已禁用')
      );
      return;
    }

    this.dispatchClipboardEvent_(BrowserAppClipboard.Action_.COPY, new AppClipboard.CopyEvent());

    vodkaapp.pluginManager_.runHook('copy', e.getBrowserEvent());
  }
```



interface FixToolbarIprops {

  selected: boolean;

  hovered: boolean;

}

selected:{

​	isValid：boolean，

​	moduleType:ent

}



- ### 



````
 static Type = {
    IMAGE: 0,
    TABLE: 1,
    DRAWING: 5,
    GADGET: 3,
    ATWHO: 4,
    //@人组件
    IFRAME: 2,
    // iframe 插件，鸠占鹊巢占用了以前 drawing 的 code，以为以前 drawing 也没用
    ATTACHMENT: 6,
    // 附件
    CODE_BLOCK: 7,
    CUSTOM: 8
  };
```

```
subType_ 图片的类型，默认0，即普通图片，1 表示流程图 2 思维导图
 * origin_ 图片的源信息，当 subType 为 1 或者 2 时，不为空
```

```
type：8
	subtype：“diviverLine”|"readApp"
```

```

- 附件 type：6   attachmentViewType_:1    InlineEntity
- 视频 type：6		attachmentViewType_: 2   InlineEntity

修改文件：src/features/vodka-plugin/components/Attachment/Attachment.tsx
src/editor/features/attachment/embeddedentityattachmentrender.ts


-代码块 type：7     (entityType == EmbeddedObject.Type.CODE_BLOCK）可以直接判断   InlineEntity
和附件的相似
改的文件：src/features/vodka-plugin/components/CodeBlock/CodeBlock.tsx
src/editor/features/codeblock/EmbeddedCodeBlockRenderer.ts




-分割线 type：8 subType: "dividerLine"   InlineEntity
-已读统计 type：8 subType: "readApp"   InlineEntity
-kim群卡 type:8 subType:"insertKimGroup"
-latex公式 type:8 subType:"latex"


段落   e.isInparagraph:true  entity2:null

- team数据-统计图表 type_: 2 subType_: "team-plugin-team-chart"  问题 点击里面 不能捕获event
和图片类似
//src/editor/features/embedded/EmbeddedObjectIframeRenderer.tsx


- 图片： type：0   subType:0
- 流程图  type_: 0 subType_: 1
- 思维导图  type_: 0 subType_: 2




目录  目前不知道怎么区分  entity2 null  
超链接 目前不知道怎么区分  entity2 null  

附件
//src/editor/features/attachment/embeddedentityattachmentrender.ts   quickbar 控制文件
EmbeddedEntityAttachmentRenderer
type:6 getAttachmentType
embeddedObject.getAttachmentViewType() 
Attachment.VIEW_TYPES.PREVIEW
 public static VIEW_TYPES = {
    CARD: 1,
    PREVIEW: 2
  };
  quickBarIsVisible
```

//src/features/vodka-plugin/components/Attachment/Attachment.tsx  
 {(quickBarIsVisible || selectedOnly || quickBarHasMouse) && showToolbar && 
 
 //src/editor/features/attachment/embeddedentityattachmentrender.ts
 我在  先
 
 src/features/vodka-plugin/components/Attachment/Attachment.tsx
 我也在   后
 

附件问题：
	设置了选中，显示bar，但是一移开就会消失，判断是onAttachmentMouseLeave 和取消selectOnly判断render组件的问题





- hover显示，选中不显示：

  --块状应用：

​		--图文应用|目录|超链接？|	



```
 const entityId = editor.getEntityIdAt(spacerIndex_);
      console.log(location.type_);
      if (entityId == null) {
        return;
      }
      console.log('entityId', entityId);
      const entity = window.vodkaapp.modelStateWrapper_.getModel().getEntity(entityId);
      console.log(`MoveEvent-quickbar-entity2-}`, entity);

      const entityObject = entity?.getEmbeddedObject();
      const entityType = entityObject.getType();
      if (entityType === EmbeddedObject.Type.IMAGE) {
        const imageBarHelper = vodkaapp.appView_?.getEntityRenderer?.(entityId)?.imageBarHelper;
        imageBarHelper.changeBarStatusIfNeed();
      }
```

页面调试可用

  getEntity() {
    return window.vodkaapp.modelStateWrapper_.getModel().getEntity(this.entityId_);
  }























