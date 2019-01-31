import React, { Component } from 'react';

export default (DecoratedComponent, styles) => {
  class StylesComponent extends Component {
    componentWillMount () {
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss())
      }
    }

    render () {
      return <DecoratedComponent {...this.props} />
    }
  }

  // 把组件附加的属性赋给包装以后的组件（StylesComponent)
  // 使得组件DecoratedComponent上的静态方法能完全复制到StylesComponent组件
  // 如果不拷贝静态方法，则服务端渲染是调用的loadDate方法会失败，导致首屏数据渲染失败
  Object.keys(DecoratedComponent).forEach(
    k => (StylesComponent[k] = DecoratedComponent[k])
  );

  return StylesComponent;
}
