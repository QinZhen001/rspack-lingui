# Rsbuild lingui project

在Rsbuild中集成lingui相关库

https://lingui.dev/tutorials/react



## rsbuild-plugin-node-polyfill

[builtinMappingResolved](https://github.com/rspack-contrib/rsbuild-plugin-node-polyfill/blob/b6bb073f21777bd211230d842e9d46b748a67924/src/libs.ts)





## 从 Babel 到 SWC

| 方面                       | LinguiJS 传统方案 (Babel)      | LinguiJS 现代方案 (SWC)                                   |
| :------------------------- | :----------------------------- | :-------------------------------------------------------- |
| **核心编译插件**           | `babel-plugin-lingui-macro`    | `@lingui/swc-plugin`                                      |
| **是否需 `@lingui/macro`** | **需要**                       | **需要** (提供宏的类型定义等开发时支持)                   |
| **典型配置**               | `.babelrc`或 `babel.config.js` | `.swcrc`或 `next.config.js`(对于 Next.js)                 |
| **优势**                   | 稳定、兼容性好                 | **编译速度更快** (得益于 Rust 和 SWC 的高性能)            |
| **现状**                   | 依然可用和支持                 | **新兴推荐方式**，特别适合新项目和使用 SWC 编译器的工具链 |

在 LinguiJS 传统的使用方式中，`@lingui/macro`需要与 `babel-plugin-lingui-macro`配合工作。`@lingui/macro`提供了那些友好的宏（如 `<Trans>`、`t`），而 Babel 插件则在编译阶段负责将这些宏转换并优化为实际的函数调用

LinguiJS 5.x 版本引入了 **`@lingui/swc-plugin`**。这是一个基于 SWC (Speedy Web Compiler) 的插件，它用 Rust 编写，旨在提供更快的编译速度。**这个 SWC 插件实现了原来 Babel 插件的功能**，即处理 `@lingui/macro`提供的宏

`@lingui/macro`在 LinguiJS 5.x 中**并没有被完全弃用**，但它的“搭档”和配置方式发生了变化。





## **useLingui**

使用方式：

```ts
import { useLingui } from "@lingui/react/macro";

const { i18n, t } = useLingui();
// 让后就可以用 t`xxx`写法了
```

底层源码

```ts
/**
 *
 * Macro version of useLingui replaces _ function with `t` macro function which is bound to i18n passed from React.Context
 *
 * Returned `t` macro function has all the same signatures as global `t`
 *
 * @example
 * ```
 * const { t } = useLingui();
 * const message = t`Text`;
 * ```
 *
 * @example
 * ```
 * const { i18n, t } = useLingui();
 * const locale = i18n.locale;
 * const message = t({
 *   id: "msg.hello",
 *   comment: "Greetings at the homepage",
 *   message: `Hello ${name}`,
 * });
 * ```
 */
export function useLingui(): Omit<I18nContext, "_"> & {
  t: typeof _t
}

```





## @lingui/macro

https://www.npmjs.com/package/@lingui/macro

这个不是必须的

可以被 "@lingui/react/macro" 代替 



## @lingui/swc-plugin

https://lingui.dev/ref/swc-plugin

https://www.npmjs.com/package/@lingui/swc-plugin

You still need to install `@lingui/macro` for typings support:

```shell
npm install @lingui/macro
# or
yarn add @lingui/macro
```

简单来说，**`@lingui/swc-plugin`是编译时的“引擎”**，负责转换；而 **`@lingui/macro`是开发时的“工具箱”和“说明书”**，提供了宏的具体定义和类型支持。

| 角色         | `@lingui/macro`                                              | `@lingui/swc-plugin`                                         |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **核心职责** | 提供宏的**源代码定义** (如 `t`, `Trans`, `plural`)           | 在编译时**识别并转换**这些宏                                 |
| **工作阶段** | 开发时 (编写代码时)                                          | 编译时 (构建项目时)                                          |
| **主要功能** | 1. 提供宏的 JavaScript 实现 2. 提供 TypeScript 类型定义 3. 提供语法 API 让开发者使用 | 1. 将宏转换为标准的 LinguiJS 函数调用 2. 进行代码拆分和优化 3. 提取消息以供翻译 |
| **为何需要** | 没有它，编译器无法理解你代码中的 `t`或 `<Trans>`是什么，会报未定义错误。 | 没有它，宏就无法被正确转换为运行时代码，消息也无法被提取，国际化功能会失效。 |
| **类比**     | 就像是**乐高积木的零件**                                     | 就像是**按照图纸组装乐高的手**                               |

1. 开发阶段（你写代码时）**：当你使用 import { t } from '@lingui/macro'  并在代码中写下 t\`Hello\`  或 `<Trans>Message</Trans>`时，你正在使用 `@lingui/macro`提供的**宏函数和组件。这些宏为你的国际化消息提供了强大且直观的编写方式，并带有完整的 TypeScript 类型支持，提升了开发体验和代码安全性。
2. 编译阶段（构建项目时）**：当你运行构建命令（如 `rspack build`）时，`@lingui/swc-plugin`这个 SWC 插件开始工作。它会扫描你的源代码，**寻找所有来自 `@lingui/macro`的宏用法**，然后将它们编译、转换为等价的、浏览器或 Node.js 可以执行的普通 JavaScript 代码（例如转换成 `i18n._(message)`这样的函数调用）

```
但是其实 import { t } from '@lingui/macro'
可以被 import { useLingui } from "@lingui/react/macro";
去替代
```

