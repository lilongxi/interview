/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-26 15:35:33
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-26 15:40:14
 * @FilePath: /interview-coding/basic-knowledge/react/renderer/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

function createTextElement(text: string) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type: string, props: any, ...children: any) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
}

function render(element: any, container: any) {
  let dom;

  if (element.type === "TEXT_ELEMENT") {
    dom = document.createTextNode("");
  } else {
    dom = document.createElement(element.type);
  }
  const isProperty = (key: string) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    })
if (element.props.children) {
  element.props.children.forEach((child: any) => {
    render(child, dom);
  });

  container.appendChild(dom);
}
}

// const element = createElement(
//   "div",
//   { id: "foo" },
//   createElement("a", null, "bar"),
//   createElement("b", null, "baz")
// )