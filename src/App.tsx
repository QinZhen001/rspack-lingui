import { Trans } from "@lingui/react";
import { useLingui } from "@lingui/react/macro";

// https://github.com/rspack-contrib/rsbuild-plugin-node-polyfill
// 当使用 @lingui/macro 的时候，浏览器会用一些原生的node模块，需要安装 @rsbuild/plugin-node-polyfill 注入·
// import { t } from "@lingui/macro";
// 直接使用 import { useLingui } from "@lingui/react/macro"; 即可

import "./App.css";
import { useState } from "react";

// TODO: 测试一下 t 和 变量 

//  <Trans id="Hello 111" message="Hello 111 asd {name1}" values={{ name1 }} />
// message 只有第一次会生成在默认语言中 后续就不会更改了 其实不填 message属性也可以

const App = () => {
  const { i18n, t } = useLingui();
  const [name1, setName1] = useState("jack");
  const [name2, setName2] = useState("john");

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div className="item">测试useLingui</div>
      <p>
        {i18n._(`test`)}
      </p>
      <div className="item">测试Trans</div>
      <div>
        <Trans id="No records"/>
      </div>
      <div className="item">@lingui/macro</div>
      <div>{t`Message Inbox`}</div>
      <div className="item">测试带变量的Trans</div>
      <div>
        <Trans id="Hello 111" message="Hello 111 asd {name1}" values={{ name1 }} />
        <br />
        <Trans
          id="Hello 222"
          values={{ name1, name2 }}
        />
      </div>
    </div>
  );
};

export default App;
