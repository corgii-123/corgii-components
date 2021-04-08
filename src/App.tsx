import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Icon from './components/Icon/Icon'
import Transition from './components/Transition/Transition'

library.add(fas)
function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <Icon icon="coffee" theme="primary" size="lg" />
      <header className="App-header">
        <Menu onSelect={(i) => { console.log(i) }} mode="horizental">
          <MenuItem>
            Hello1
          </MenuItem>
          <MenuItem disabled>
            Hello2
          </MenuItem>
          <MenuItem>
            Hello3
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>sub1</MenuItem>
            <MenuItem>sub2</MenuItem>
            <MenuItem>sub3</MenuItem>
          </SubMenu>
          <MenuItem>
            Hello4
          </MenuItem>
        </Menu>
        <Button>Hello</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>Large Button</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Primary}>Small Button</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">Baidu Link</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Disabled Link</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Large} onClick={()=>{setShow(!show)}}>Toggle</Button>
        <Transition in={show} animation="corgii-left" timeout={300} wrapper>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </Transition>
      </header>
    </div>
  );
}

export default App;