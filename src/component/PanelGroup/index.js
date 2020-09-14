import React from "react";
import ReactDOM from "react-dom";
import Sortable from 'react-sortablejs'  //拖拽

/********************************************************************************
** 作者： 
** 修改人：  修改时间：
** 描述：核心容器布局组件
 
*********************************************************************************/
//https://github.com/DanFessler/react-panelgroup
//核心 组件
class PanelGroup extends React.Component {
  // Load initial panel configuration from props //从道具加载初始面板配置
  constructor() {
    super(...arguments);
    this.state = this.loadPanels(this.props);
  }

  // reload panel configuration if props update 
  //如果道具更新，则重新加载面板配置
  componentWillReceiveProps(nextProps) {
    var nextPanels = nextProps.panelWidths;//始终为空数组

    // Only update from props if we're supplying the props in the first place  
    //仅当我们首先提供道具时才从道具更新
    if (nextPanels.length) {
      // if the panel array is a different size we know to update 
      //如果面板数组的大小不同，我们知道要更新
      if (this.state.panels.length !== nextPanels.length) {
        this.setState(this.loadPanels(nextProps));
      } else {
        // otherwise we need to iterate to spot any difference
        //否则我们需要迭代以发现任何差异
        for (var i = 0; i < nextPanels.length; i++) {
          if (
            this.state.panels[i].size !== nextPanels[i].size ||
            this.state.panels[i].minSize !== nextPanels[i].minSize ||
            this.state.panels[i].resize !== nextPanels[i].resize
          ) {
            this.setState(this.loadPanels(nextProps));
            break;
          }
        }
      }
    }
  }

  // load provided props into state
  //将提供的道具载入状态
  loadPanels = props => {
    var panels = [];

    //循环此panel包含的1级子组件
    if (props.children) {
      // Default values if none were provided
      //如果没有提供默认值
      var defaultSize = 256;//"auto";
      var defaultMinSize = 6;//48
      var defaultResize = "dynamic";//原来：stretch xlj

      var stretchIncluded = false;
      var children = React.Children.toArray(props.children);//主要处理自己的孩子
      for (var i = 0; i < children.length; i++) {
        //定义panelWidths的情况下 ===》目前我不采用此种方式
        if (i < props.panelWidths.length && props.panelWidths[i]) {
          var widthObj = {
            size:
              props.panelWidths[i].size !== undefined
                ? props.panelWidths[i].size
                : defaultSize,
            minSize:
              props.panelWidths[i].minSize !== undefined
                ? props.panelWidths[i].minSize
                : defaultMinSize,
            resize: props.panelWidths[i].resize
              ? props.panelWidths[i].resize
              : props.panelWidths[i].size ? "dynamic" : defaultResize,
            snap:
              props.panelWidths[i].snap !== undefined
                ? props.panelWidths[i].snap
                : []
          };
          panels.push(widthObj);
        } else {
          // default values if no props are given 如果没有提供道具，则为默认值
          panels.push({
            size: children[i].props.layoutSize || defaultSize,//xlj add
            resize: defaultResize,
            minSize: defaultMinSize,
            id: children[i].props.ID,//xlj add [下面已经处理了key]
            snap: []
          });
        }

        // if none of the panels included was stretchy, make the last one stretchy
        //如果所包含的面板均未拉伸，则使最后一个拉伸
        if (panels[i].resize === "stretch") stretchIncluded = true;
        if (!stretchIncluded && i === children.length - 1)
          panels[i].resize = "stretch";
      }
    }
    return {
      panels: panels
    };
  };

  // Pass internal state out if there's a callback for it
  // Useful for saving panel configuration
  //如果有回调，则将内部状态传递出去
  //对于保存面板配置很有用
  onUpdate = panels => {
    if (this.props.onUpdate) {
      this.props.onUpdate(panels.slice());
    }
  };

  // For styling, track which direction to apply sizing to
  //要进行样式设置，请跟踪将尺寸调整应用于哪个方向
  getSizeDirection = caps => {
    if (caps) return this.props.direction === "column" ? "Height" : "Width";
    else return this.props.direction === "column" ? "height" : "width";
  };

  // Render component
  render() {
    // if (this.state.panels.length == 0) {
    //   return null;//xlj
    // }
    var style = {
      container: {
        width: "100%",
        height: "100%",
        ["min" + this.getSizeDirection(true)]: this.getPanelGroupMinSize(
          this.props.spacing
        ),
        display: "flex",
        flexDirection: this.props.direction,
        flexGrow: 1,
      },
      panel: {
        flexGrow: 0,
        display: "flex"
      }
    };

    // lets build up a new children array with added resize borders
    //让我们建立一个带有可resize的新子数组
    var initialChildren = React.Children.toArray(this.props.children);//每个panel包含的组件
    var newChildren = [];//示例：数组组件渲染方法，不用map
    var stretchIncluded = false;

    for (var i = 0; i < initialChildren.length; i++) {
      // setting up the style for this panel.  Should probably be handled
      // in the child component, but this was easier for now
      //设置此面板的样式。应该应该处理在子组件中，但是现在更容易了
      var panelStyle = {
        [this.getSizeDirection()]: this.state.panels[i].size,//column" ? "Height" : "Width"=354
        [this.props.direction === "row" ? "height" : "width"]: "100%",
        ["min" + this.getSizeDirection(true)]:
          this.state.panels[i].resize === "stretch"
            ? 0
            : this.state.panels[i].size,

        flexGrow: this.state.panels[i].resize === "stretch" ? 1 : 0,
        flexShrink: this.state.panels[i].resize === "stretch" ? 1 : 0,
        // display: "flex",  ztt去掉  若不去掉echart显示不出来
        overflow: "hidden",
        position: "relative",

      };

      // patch in the background color if it was supplied as a prop
      //如果是作为道具提供的，则以背景色打补丁
      Object.assign(panelStyle, { backgroundColor: this.props.panelColor });

      // give position info to children
      //向孩子们提供位置信息
      var metadata = {
        isFirst: i === 0 ? true : false,
        isLast: i === initialChildren.length - 1 ? true : false,
        resize: this.state.panels[i].resize,

        // window resize handler if this panel is stretchy
        //窗口调整大小处理程序（如果此面板是拉伸的）
        onWindowResize:
          this.state.panels[i].resize === "stretch" ? this.setPanelSize : null
      };

      // if none of the panels included was stretchy, make the last one stretchy
      //如果所包含的面板均未拉伸，则使最后一个拉伸
      if (this.state.panels[i].resize === "stretch") stretchIncluded = true;//最后一个设置为：自动拉伸[填满]
      if (!stretchIncluded && metadata.isLast) metadata.resize = "stretch";

      // push children with added metadata
      //首先：创建Panel,每个Panel包含 真正的子组件      使用添加的元数据推送子级
      newChildren.push(
        <Panel style={panelStyle} key={"panel" + i} panelID={i} {...metadata} data-index={`${this.props['data-index']}-${i}`}>
          {initialChildren[i]}
        </Panel>
      );

      // add a handle between panels [panel之间增加Divider]
      //在面板之间创建Divider组件
      if (i < initialChildren.length - 1) {
        newChildren.push(
          <Divider
            borderColor={this.props.borderColor}
            key={"divider" + i}
            panelID={i}
            handleResize={this.handleResize}
            dividerWidth={this.props.spacing}
            direction={this.props.direction}
            showHandles={this.props.showHandles}
          />
        );
      }
    }
    let { key, ref, options } = this.props
    return (

      <Sortable

        key={key}
        ref={ref}
        options={options}
        style={style.container}
      >
        {/* <div className={`panelGroup ${this.props.className}`} style={style.container}> */}
        {newChildren}
        {/* </div> */}
      </Sortable>
      //   <div className={`panelGroup ${this.props.className}`} style={style.container}>
      //   {newChildren}

      // </div>

      //  <Sortable
      //         key={key}
      //         ref={ref}
      //         options={options}
      //      >
      //        <div className={`panelGroup ${this.props.className}`} style={style.container}>
      //         {newChildren}
      //       </div>
      //       </Sortable>
    );
  }


  componentWillUnmount() {     //卸载组件前执行的钩子函数 xlj add
    this.handleResize = null;  //清除dom上绑定的事件
    //  clearInterval(this.timer);      //清除定时器
  }


  // Entry point for resizing panels.
  // We clone the panel array and perform operations on it so we can
  // setState after the recursive operations are finished
  //调整面板大小的入口点。
  //我们克隆面板数组并对其执行操作，因此我们可以
  //递归操作完成后的setState
  handleResize = (i, delta) => {
    var tempPanels = this.state.panels.slice();
    var returnDelta = this.resizePanel(
      i,
      this.props.direction === "row" ? delta.x : delta.y,
      tempPanels
    );
    this.setState({ panels: tempPanels });
    this.onUpdate(tempPanels);
    return returnDelta;
  };

  // Recursive panel resizing so we can push other panels out of the way
  // if we've exceeded the target panel's extents
  //调整递归面板的大小，以便我们可以将其他面板推开
  //如果我们超出了目标面板的范围
  resizePanel = (panelIndex, delta, panels) => {
    // 1) first let's calculate and make sure all the sizes add up to be correct.
    //首先让我们计算并确保所有大小的总和都是正确的
    let masterSize = 0;
    for (let iti = 0; iti < panels.length; iti += 1) {
      masterSize += panels[iti].size;
    }
    let boundingRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    let boundingSize =
      (this.props.direction == "column"
        ? boundingRect.height
        : boundingRect.width) -
      this.props.spacing * (this.props.children.length - 1);
    if (masterSize != boundingSize) {
      //xlj del  //////console.log(panels[0], panels[1]);
      ///xlj del  //////console.log("ERROR! SIZES DON'T MATCH!: ", masterSize, boundingSize);
      // 2) Rectify the situation by adding all the unacounted for space to the first panel
      panels[panelIndex].size += boundingSize - masterSize;
    }

    var minsize;
    var maxsize;

    // track the progressive delta so we can report back how much this panel
    // actually moved after all the adjustments have been made
    //跟踪渐进增量，以便我们可以报告此面板的数量
    //在进行所有调整后实际上已移动
    var resultDelta = delta;

    // make the changes and deal with the consequences later 【改变尺寸】
    //进行更改并稍后处理后果
    panels[panelIndex].size += delta;
    panels[panelIndex + 1].size -= delta;

    // Min and max for LEFT panel
    // LEFT面板的最小值和最大值
    minsize = this.getPanelMinSize(panelIndex, panels);
    maxsize = this.getPanelMaxSize(panelIndex, panels);

    // if we made the left panel too small
    //如果我们使左侧面板太小
    if (panels[panelIndex].size < minsize) {
      let delta = minsize - panels[panelIndex].size;

      if (panelIndex === 0)
        resultDelta = this.resizePanel(panelIndex, delta, panels);
      else resultDelta = this.resizePanel(panelIndex - 1, -delta, panels);
    }

    // if we made the left panel too big
    //如果我们使左侧面板太大
    if (maxsize !== 0 && panels[panelIndex].size > maxsize) {
      let delta = panels[panelIndex].size - maxsize;

      if (panelIndex === 0)
        resultDelta = this.resizePanel(panelIndex, -delta, panels);
      else resultDelta = this.resizePanel(panelIndex - 1, delta, panels);
    }

    // Min and max for RIGHT panel
    //右侧面板的最小值和最大值
    minsize = this.getPanelMinSize(panelIndex + 1, panels);
    maxsize = this.getPanelMaxSize(panelIndex + 1, panels);

    // if we made the right panel too small
    //如果我们使右侧面板太小
    if (panels[panelIndex + 1].size < minsize) {
      let delta = minsize - panels[panelIndex + 1].size;

      if (panelIndex + 1 === panels.length - 1)
        resultDelta = this.resizePanel(panelIndex, -delta, panels);
      else resultDelta = this.resizePanel(panelIndex + 1, delta, panels);
    }

    // if we made the right panel too big
    //如果我们使右侧面板太大
    if (maxsize !== 0 && panels[panelIndex + 1].size > maxsize) {
      let delta = panels[panelIndex + 1].size - maxsize;

      if (panelIndex + 1 === panels.length - 1)
        resultDelta = this.resizePanel(panelIndex, delta, panels);
      else resultDelta = this.resizePanel(panelIndex + 1, -delta, panels);
    }

    // Iterate through left panel's snap positions
    //遍历左侧面板的捕捉位置
    for (let i = 0; i < panels[panelIndex].snap.length; i++) {
      if (Math.abs(panels[panelIndex].snap[i] - panels[panelIndex].size) < 20) {
        let delta = panels[panelIndex].snap[i] - panels[panelIndex].size;

        if (
          delta !== 0 &&
          panels[panelIndex].size + delta >=
          this.getPanelMinSize(panelIndex, panels) &&
          panels[panelIndex + 1].size - delta >=
          this.getPanelMinSize(panelIndex + 1, panels)
        )
          resultDelta = this.resizePanel(panelIndex, delta, panels);
      }
    }

    // Iterate through right panel's snap positions
    //遍历右侧面板的捕捉位置
    for (let i = 0; i < panels[panelIndex + 1].snap.length; i++) {
      if (
        Math.abs(panels[panelIndex + 1].snap[i] - panels[panelIndex + 1].size) <
        20
      ) {
        let delta =
          panels[panelIndex + 1].snap[i] - panels[panelIndex + 1].size;

        if (
          delta !== 0 &&
          panels[panelIndex].size + delta >=
          this.getPanelMinSize(panelIndex, panels) &&
          panels[panelIndex + 1].size - delta >=
          this.getPanelMinSize(panelIndex + 1, panels)
        )
          resultDelta = this.resizePanel(panelIndex, -delta, panels);
      }
    }

    // return how much this panel actually resized
    //返回此面板实际调整的大小
    return resultDelta;
  };

  // Utility function for getting min pixel size of panel
  //实用功能，用于获取面板的最小像素大小
  getPanelMinSize = (panelIndex, panels) => {
    if (panels[panelIndex].resize === "fixed") {
      if (!panels[panelIndex].fixedSize) {
        panels[panelIndex].fixedSize = panels[panelIndex].size;
      }
      return panels[panelIndex].fixedSize;
    }
    return panels[panelIndex].minSize;
  };

  // Utility function for getting max pixel size of panel
  //实用功能，用于获取面板的最大像素大小
  getPanelMaxSize = (panelIndex, panels) => {
    if (panels[panelIndex].resize === "fixed") {
      if (!panels[panelIndex].fixedSize) {
        panels[panelIndex].fixedSize = panels[panelIndex].size;
      }
      return panels[panelIndex].fixedSize;
    }
    return 0;
  };

  // Utility function for getting min pixel size of the entire panel group
  //实用功能，用于获取整个面板组的最小像素大小
  getPanelGroupMinSize = spacing => {
    var size = 0;
    for (var i = 0; i < this.state.panels.length; i++) {
      size += this.getPanelMinSize(i, this.state.panels);
    }
    return size + (this.state.panels.length - 1) * spacing;
  };

  // Hard-set a panel's size
  // Used to recalculate a stretchy panel when the window is resized
  //硬设置面板的大小
  //用于调整窗口大小时重新计算可拉伸面板
  setPanelSize = (panelIndex, size, callback) => {
    size = this.props.direction === "column" ? size.y : size.x;
    if (size !== this.state.panels[panelIndex].size) {
      var tempPanels = this.state.panels;
      //make sure we can actually resize this panel this small
      //确保我们可以实际调整此面板的大小
      if (size < tempPanels[panelIndex].minSize) {
        let diff = tempPanels[panelIndex].minSize - size;
        tempPanels[panelIndex].size = tempPanels[panelIndex].minSize;

        // 1) Find all of the dynamic panels that we can resize and
        // decrease them until the difference is gone
        // 1）找到所有我们可以调整大小的动态面板，
        //减少它们直到差异消失
        for (let i = 0; i < tempPanels.length; i = i + 1) {
          if (i != panelIndex && tempPanels[i].resize === "dynamic") {
            let available = tempPanels[i].size - tempPanels[i].minSize;
            let cut = Math.min(diff, available);
            tempPanels[i].size = tempPanels[i].size - cut;
            // if the difference is gone then we are done!
            //如果差异消失了，那么我们就完成了！
            diff = diff - cut;
            if (diff == 0) {
              break;
            }
          }
        }
      } else {
        tempPanels[panelIndex].size = size;
      }
      this.setState({ panels: tempPanels });

      if (panelIndex > 0) {
        this.handleResize(panelIndex - 1, { x: 0, y: 0 });
      } else if (this.state.panels.length > 2) {
        this.handleResize(panelIndex + 1, { x: 0, y: 0 });
      }

      if (callback) {
        callback();
      }
    }
  };
}

PanelGroup.defaultProps = {
  spacing: 1,
  direction: "row",
  panelWidths: []
};

//===========组件2、Panel =================>
class Panel extends React.Component {
  // Find the resizeObject if it has one
  componentDidMount() {
    if (this.props.resize === "stretch") {
      this.refs.resizeObject.addEventListener("load", () =>
        this.onResizeObjectLoad()
      );
      this.refs.resizeObject.data = "about:blank";
      this.onNextFrame(this.calculateStretchWidth);
    }
  }

  // Attach resize event listener to resizeObject
  //将resize事件侦听器附加到resizeObject
  onResizeObjectLoad = () => {
    this.refs.resizeObject.contentDocument.defaultView.addEventListener(
      "resize",
      () => this.calculateStretchWidth()
    );
  };

  // Utility function to wait for next render before executing a function
  //实用函数在执行功能之前等待下一次渲染
  onNextFrame = callback => {
    setTimeout(function () {
      window.requestAnimationFrame(callback);
    }, 0);
  };

  // Recalculate the stretchy panel if it's container has been resized
  //如果容器的大小已调整，则重新计算可拉伸面板
  calculateStretchWidth = () => {
    if (this.props.onWindowResize !== null) {
      //ztt去掉
      // var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

      // this.props.onWindowResize(
      //   this.props.panelID,
      //   { x: rect.width, y: rect.height }

      //   // recalcalculate again if the width is below minimum
      //   // Kinda hacky, but for large resizes like fullscreen/Restore
      //   // it can't solve it in one pass.
      //   // function() {this.onNextFrame(this.calculateStretchWidth)}.bind(this)
      //   //如果宽度小于最小值，则重新计算
      //   // Kinda hacky，但适用于大尺寸的尺寸，例如全屏/还原
      //   //它无法一次解决。
      // );
    }
  };

  // Render component
  render() {
    var style = {
      resizeObject: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0
      }
    };

    // only attach resize object if panel is stretchy.  Others dont need it
    //如果面板是拉伸的，则仅附加调整大小的对象。其他人不需要它
    const resizeObject =
      this.props.resize === "stretch" ? (
        <object
          style={style.resizeObject}
          ref="resizeObject"
          type="text/html"
        />
      ) : null;

    return (
      <div className="panelWrapper" style={this.props.style} data-index={this.props['data-index']}>
        {resizeObject}
        {this.props.children}
      </div>
    );
  }
}

//====组件3、Divider==========================>
class Divider extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      dragging: false,
      initPos: { x: null, y: null }
    };
  }

  // Add/remove event listeners based on drag state
  //根据拖动状态添加/删除事件监听器
  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    }
  }

  // Start drag state and set initial position
  //开始拖动状态并设置初始位置
  onMouseDown = e => {
    // only left mouse button
    if (e.button !== 0) return;

    this.setState({
      dragging: true,
      initPos: {
        x: e.pageX,
        y: e.pageY
      }
    });

    e.stopPropagation();
    e.preventDefault();
  };

  // End drag state
  //结束拖动状态
  onMouseUp = e => {
    this.setState({ dragging: false });
    e.stopPropagation();
    e.preventDefault();
  };

  // Call resize handler if we're dragging
  //如果要拖动，请调用调整大小处理程序
  onMouseMove = e => {
    if (!this.state.dragging) return;

    let initDelta = {
      x: e.pageX - this.state.initPos.x,
      y: e.pageY - this.state.initPos.y
    };

    let flowMask = {
      x: this.props.direction === "row" ? 1 : 0,
      y: this.props.direction === "column" ? 1 : 0
    };

    let flowDelta = initDelta.x * flowMask.x + initDelta.y * flowMask.y;

    // Resize the panels
    //调整面板大小
    var resultDelta = this.handleResize(this.props.panelID, initDelta);

    // if the divider moved, reset the initPos
    //如果分隔线已移动，请重置initPos
    if (resultDelta + flowDelta !== 0) {
      // Did we move the expected amount? (snapping will result in a larger delta)
      //我们是否移动了预期金额？（捕捉将导致较大的增量）
      let expectedDelta = resultDelta === flowDelta;

      this.setState({
        initPos: {
          // if we moved more than expected, add the difference to the Position
          //如果移动幅度超出预期，则将差异添加到排名中
          x: e.pageX + (expectedDelta ? 0 : resultDelta * flowMask.x),
          y: e.pageY + (expectedDelta ? 0 : resultDelta * flowMask.y)
        }
      });
    }

    e.stopPropagation();
    e.preventDefault();
  };

  // Handle resizing 【父panel的resize】
  //处理大小调整
  handleResize = (i, delta) => {
    //////console.log("handleResize")
    return this.props.handleResize(i, delta);
  };

  // Utility functions for handle size provided how much bleed
  // we want outside of the actual divider div
  //句柄大小的实用程序功能提供了多少出血
  //我们想要超出实际除法器div
  getHandleWidth = () => {
    return this.props.dividerWidth + this.props.handleBleed * 2;
  };
  getHandleOffset = () => {
    return this.props.dividerWidth / 2 - this.getHandleWidth() / 2;
  };

  // Render component
  render() {
    var style = {
      divider: {
        width:
          this.props.direction === "row" ? this.props.dividerWidth : "auto",
        minWidth:
          this.props.direction === "row" ? this.props.dividerWidth : "auto",
        maxWidth:
          this.props.direction === "row" ? this.props.dividerWidth : "auto",
        height:
          this.props.direction === "column" ? this.props.dividerWidth : "auto",
        minHeight:
          this.props.direction === "column" ? this.props.dividerWidth : "auto",
        maxHeight:
          this.props.direction === "column" ? this.props.dividerWidth : "auto",
        flexGrow: 0,
        position: "relative"
      },
      handle: {
        position: "absolute",
        width: this.props.direction === "row" ? this.getHandleWidth() : "100%",
        height:
          this.props.direction === "column" ? this.getHandleWidth() : "100%",
        left: this.props.direction === "row" ? this.getHandleOffset() : 0,
        top: this.props.direction === "column" ? this.getHandleOffset() : 0,
        backgroundColor: this.props.showHandles
          ? "rgba(0,128,255,0.25)"
          : "auto",
        cursor: this.props.direction === "row" ? "col-resize" : "row-resize",
        zIndex: 100
      }
    };
    Object.assign(style.divider, { backgroundColor: this.props.borderColor });

    // Add custom class if dragging
    //如果拖动则添加自定义类
    var className = "divider";
    if (this.state.dragging) {
      className += " dragging";
    }

    return (
      <div
        className={className}
        style={style.divider}
        onMouseDown={this.onMouseDown}
      >
        <div style={style.handle} />
      </div>
    );
  }
}

Divider.defaultProps = {
  dividerWidth: 1,
  handleBleed: 4,
  borderColor: 'black',

};

export default PanelGroup;
// import React, { Component } from 'react';

// class PanelGroup extends Component {
//     render() {
//         return (
//             <h1>test</h1>
//         );
//     }
// }

// export default PanelGroup;