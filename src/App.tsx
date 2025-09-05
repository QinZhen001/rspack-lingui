import './App.css';
import { t } from "@lingui/macro";

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div>{t`OK`}</div>
      <div>{t`No records`}</div>
    </div>
  );
};

export default App;
