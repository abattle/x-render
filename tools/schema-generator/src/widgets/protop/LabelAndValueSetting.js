import React, { useEffect, useState } from 'react';
import { Select,Input  ,Button} from 'antd';
import { createWidget } from 'form-render';
import { getArray } from 'form-render/src/utils';
import {
  SortableContainer,
  SortableHandle,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import {uuid} from '../../utils'
import './style.less'
import dragIcon from './icon/drag-icons.svg'
import deepClone from 'clone';
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
//拖动元素
const SortableElements = SortableElement(({item, subscript,delOption,optionChange }) => {

  return (
    <div className="drag-checkbox" key={`${subscript}`}>
      <div
        className="drag-icon"
        style={{ backgroundImage: `url(${dragIcon})` }}
      ></div>
      <div className="drag-input">
        <Input
          value={item.label}
          onChange={e => {
            let newdata  ={
              label:e.target.value,
              value:item.value
            }
            optionChange(subscript,newdata)
          }}
          style={{ marginRight: '8px' }}
        />
        <Input
          value={item.value}
          onChange={e => {
            let newdata  ={
              label:item.label,
              value:e.target.value
            }
            optionChange(subscript,newdata)
          }}
        />
      </div>
      <div
        className="drag-drop"
        onClick={() => delOption(subscript)}
      >
        —
      </div>
    </div>
  );
});
//拖动容器组件
const SortableContainers = SortableContainer(({ data=[],delOption,optionChange }) => {
  return (
    <div>
      {data.map((item, index) => {
        return (
          <SortableElements
            key={`${index}`}
            item={item}
            delOption={delOption}
            optionChange={optionChange}
            subscript={index}
            index={index}
            data={data}
          />
        );
      })}
    </div>
  );
});


const labSetting = (p)=>{
  let {value} = p
  const [update,setUpdate] = useState()
  //拖动回调
  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newData = arrayMove(value,oldIndex, newIndex)
    p.onChange(newData)
  };
  //添加选项
  const addOption = ()=>{
    const  newOption = {
      label:`选项${value.length+1}`,
      value:uuid()
    }
    value=value.concat([newOption])
    p.onChange(value)
  }
  //删除
  const delOption = (index)=>{
    let newData = [];
    value.map((item,i)=>{
      if(i!=index){
        newData.push(item)
      }
    })
    p.onChange(newData)
  }
  //选项标签或值改变
  const optionChange = (index,obj)=>{
    let newData = []
    value.map((item,i)=>{
      if(i==index){
        newData.push(obj)
      }else{
        newData.push(item)
      }
    })
    p.onChange(newData)
  }
 useEffect(()=>{
   console.log("value改变了")
   setUpdate(uuid())
 },[value])
  return <div>
    <SortableContainers
      distance={10}
      data={value}
      delOption={delOption}
      optionChange={optionChange}
      onSortEnd={onSortEnd}
    />
    <Button
      type="link"
      onClick={() => addOption(value,p)}
    >
      添加选项
    </Button>
  </div>
}

export  default  createWidget(mapProps)(labSetting)
