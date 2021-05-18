import React from 'react';
import { Select } from 'antd';
import { createWidget } from '../../createWidget';
import { getArray } from '../../utils';
const { Option } = Select;

const mapProps = ({ schema, style, options: _options }) => {
  let options;
  // 如果已经有外部注入的options了，内部的schema就会被忽略
  if (_options && Array.isArray(_options)) {
    options = _options;
  } else {
    const { enum: enums, enumNames } = schema || {};
    options = getArray(enums).map((item, idx) => {
      let label = enumNames && Array.isArray(enumNames) ? enumNames[idx] : item;
      const isHtml = typeof label === 'string' && label[0] === '<';
      if (isHtml) {
        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
      }
      return { label, value: item };
    });
  }

  return {
    options,
    style: { width: '100%', ...style },
  };
};

const SignSelect =(p)=>{
  let {schema} = p
  let {renderData} =schema
  // console.log(p);
  return <div>
    <Select defaultValue={schema.default} style={{width: "100%"}} onChange={p.onChange}>
      {
        renderData.map((item,index)=>{
          return <Option value={item.value} key={`${index}`}>{item.label}</Option>
        })
      }
    </Select>
  </div>
}
export default createWidget(mapProps)(SignSelect);
