## 如何使用

### 安装

```bash
npm i fr-generator
```

### 代码演示

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import Generator from 'fr-generator';

const defaultValue = {
  schema: {
    type: 'object',
    properties: {
      inputName: {
        title: '简单输入框',
        type: 'string',
      },
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

const Demo = () => {
  return (
    <div style={{ height: '80vh' }}>
      <Generator defaultValue={defaultValue} />
    </div>
  );
};

export default Demo;
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认表单 schema | `object` | `DEFAULT_SCHEMA` |
| transformer | schema 双向转换 | `object` | `{ fromFormRender, toFormRender }` |
| extraButtons | 操作栏按钮 | `array` | `extraButton[]` |
| settings | 左右侧栏配置 | `array` | [`defaultSettings`](https://github.com/alibaba/form-render/blob/master/tools/schema-generator/src/Settings/index.js#L513) |
| commonSettings | 通用配置 | `object` | [`defaultCommonSettings`](https://github.com/alibaba/form-render/blob/master/tools/schema-generator/src/Settings/index.js#L2) |
| globalSettings | 全局配置 | `object` | [`defaultGlobalSettings`](https://github.com/alibaba/form-render/blob/master/tools/schema-generator/src/Settings/index.js#L513) |
| widgets | 自定义组件 | `object` | `{}` |

#### extraButton

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| text | 按钮文案 | `string` |
| onClick | 按钮点击回调函数 | `(event) => void` |

支持 antd 按钮组件的所有其他属性 https://ant.design/components/button-cn/#API

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onChange | 表单 data 变化回调 | 表单的 data |
| onSchemaChange | 表单 schema 变化回调 | 导出的 schema |

### Methods

| 事件名 | 说明 | 入参 |
| --- | --- | --- |
| getValue | 获取导出的 schema 值 | - |
| setValue | 从外部强制修改 schema | `schema` |
| copyValue | 将现有 schema 拷贝到剪贴板 | - |

## 案例演示

https://x-render.gitee.io/tools/generator#%E6%A1%88%E4%BE%8B%E6%BC%94%E7%A4%BA

## 常见问题

**1、如何控制编辑器高度**

给组件外层要包裹的 div 设置高度即可，否则为默认值 min-height: 30vh
